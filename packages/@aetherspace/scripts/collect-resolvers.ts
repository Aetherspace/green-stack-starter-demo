import glob from 'glob'
import fs from 'fs'
// Utils
import { findTargetString } from '../utils/stringUtils'
import { excludeDirs, parseWorkspaces } from './helpers/scriptUtils'

/* --- collect-resolvers ---------------------------------------------------------------------- */

const collectResolvers = () => {
  try {
    // Get all resolver file paths in the next app's api folder
    const featureAPIRoutes = glob.sync('../../features/**/routes/api/**/route.ts').filter(excludeDirs) // prettier-ignore
    const packageAPIRoutes = glob.sync('../../packages/**/routes/api/**/*.ts').filter(excludeDirs) // prettier-ignore
    const allAPIRoutes = [...featureAPIRoutes, ...packageAPIRoutes]

    // Figure out import paths from each workspace
    const { workspaceImports } = parseWorkspaces()

    // Filter out the next.js api paths that don't work with aether schemas
    const resolverRegistry = allAPIRoutes.reduce((acc, resolverPath) => {
      // Figure out the workspace import
      const [packageParts, routeParts] = resolverPath.split('/routes') as [string, string]
      const workspaceMatcher = packageParts.replace('../../', '')
      const workspacePackageName = workspaceImports[workspaceMatcher]
      const importPath = `${workspacePackageName}/routes${routeParts.replace('.ts', '')}`
      // Skip files that don't export an aetherResolver
      const pathContents = fs.readFileSync(resolverPath, 'utf8')
      const exportsAetherResolver = pathContents.includes('makeGraphQLResolver')
      const isCommented = pathContents.includes('// export const graphResolver')
      const exportsGraphQLResolver = pathContents.includes('export const graphResolver') && !isCommented // prettier-ignore
      if (!exportsAetherResolver || !exportsGraphQLResolver) return acc
      // Find the resolver name
      const lines = pathContents.split('\n')
      const graphResolverLine = lines.find((line) => {
        return line.includes('export const graphResolver = makeGraphQLResolver')
      })
      const resolverName = findTargetString(graphResolverLine!, 'makeGraphQLResolver($target$)')
      if (!resolverName) return acc
      // Create export line for the resolver
      const exportLine = `export { graphResolver as ${resolverName} } from '${importPath}'`
      // Add the resolver to the registry
      return `${acc}${exportLine}\n`
    }, '// -i- Auto generated with "yarn collect-resolvers" -- /packages/@aetherspace/scripts/collect-resolvers.ts\n') // prettier-ignore
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
