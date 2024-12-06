import fs from 'fs'
import { findTargetString } from '../utils/stringUtils'
import { excludeDirs, parseWorkspaces, globRel } from './helpers/scriptUtils'

/* --- Constants ------------------------------------------------------------------------------ */

const genMsg = `// -i- Auto generated with "npx turbo run @green-stack/core#collect:resolvers"\n`

/* --- collect-resolvers ---------------------------------------------------------------------- */

const collectResolvers = () => {
  try {
    // Get all resolver file paths in /features/ & /packages/ workspace api folders
    const featureAPIRoutes = globRel('../../features/**/routes/api/**/route.ts').filter(excludeDirs) // prettier-ignore
    const packageAPIRoutes = globRel('../../packages/**/routes/api/**/route.ts').filter(excludeDirs) // prettier-ignore
    const allAPIRoutes = [...featureAPIRoutes, ...packageAPIRoutes]

    // Figure out import paths from each workspace
    const { workspaceImports } = parseWorkspaces()

    // Filter out the next.js api paths that don't work with zod schemas
    const resolverRegistry = allAPIRoutes.reduce((acc, resolverPath) => {
      // Figure out the workspace import
      const [packageParts, routeParts] = resolverPath.split('/routes') as [string, string]
      const workspaceMatcher = packageParts.replace('../../', '')
      const workspacePackageName = workspaceImports[workspaceMatcher]
      const importPath = `${workspacePackageName}/routes${routeParts.replace('.ts', '')}`
      // Skip files that don't export a schema resolver
      const pathContents = fs.readFileSync(resolverPath, 'utf8')
      const exportsSchemaResolver = pathContents.includes('createGraphResolver')
      const isCommented = pathContents.includes('// export const graphResolver')
      const exportsGraphQLResolver = pathContents.includes('export const graphResolver') && !isCommented // prettier-ignore
      if (!exportsSchemaResolver || !exportsGraphQLResolver) return acc
      // Find the resolver name
      const lines = pathContents.split('\n')
      const graphResolverLine = lines.find((line) => {
        return line.includes('export const graphResolver = createGraphResolver')
      })
      const resolverName = findTargetString(graphResolverLine!, 'createGraphResolver($target$)')
      if (!resolverName) return acc
      // Create export line for the resolver
      const exportLine = `export { graphResolver as ${resolverName} } from '${importPath}'`
      // Add the resolver to the registry
      return `${acc}${exportLine}\n`
    }, genMsg) // prettier-ignore
    // Write barrel file to 'packages/@registries/resolvers.generated.ts'
    fs.writeFileSync('../../packages/@registries/resolvers.generated.ts', resolverRegistry)
    console.log('-----------------------------------------------------------------')
    console.log('-i- Successfully created resolver registry at:')
    console.log('-----------------------------------------------------------------')
    console.log(' ✅ packages/@registries/resolvers.generated.ts')
  } catch (err) {
    console.log(err)
    console.error(err)
    process.exit(1)
  }
}

/* --- init ------------------------------------------------------------------------------------ */

collectResolvers()
