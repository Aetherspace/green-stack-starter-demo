import glob from 'glob'
import fs from 'fs'
// Utils
import { findTargetString } from '../utils/stringUtils'

/* --- collect-resolvers ---------------------------------------------------------------------- */

const collectResolvers = () => {
  try {
    // General filter helpers
    const excludeDirs = (pth) => pth.split('/').pop().includes('.')
    // Get all resolver file paths in the next app's api folder
    const nextAPIPaths = glob.sync('../../apps/next/**/api/**/*.ts').filter(excludeDirs)
    // Filter out the next.js api paths that don't work with aether schemas
    const resolverRegistry = nextAPIPaths.reduce((acc, resolverPath) => {
      const importPath = resolverPath.replace('.ts', '').replace('../../apps/', '../../apps/')
      // Skip files that don't export an aetherResolver
      const pathContents = fs.readFileSync(resolverPath, 'utf8')
      const usesAetherSchemas = pathContents.includes("'aetherspace/schemas'")
      const exportsAetherResolver = pathContents.includes('makeGraphQLResolver')
      const exportsGraphQLResolver = pathContents.includes('export const graphResolver')
      if (!usesAetherSchemas || !exportsAetherResolver || !exportsGraphQLResolver) return acc
      // Find the resolver name
      const loc = pathContents.split('\n')
      const graphResolverLine = loc.find((line) => {
        return line.includes('export const graphResolver = makeGraphQLResolver')
      })
      const resolverName = findTargetString(graphResolverLine!, 'makeGraphQLResolver($target$)')
      if (!resolverName) return acc
      // Create export line for the resolver
      const exportLine = `export { graphResolver as ${resolverName} } from '${importPath}'`
      // Add the resolver to the registry
      return `${acc}${exportLine}\n`
    }, '// -i- Auto generated with "yarn build-schema"\n')
    // Write barrel file to 'packages/@registries/resolvers.generated.ts'
    fs.writeFileSync('../../packages/@registries/resolvers.generated.ts', resolverRegistry)
    console.log(
      '-i- Successfully created resolver registry at:',
      '\n✅ packages/@registries/resolvers.generated.ts'
    )
  } catch (err) {
    console.log(err)
    console.error(err)
    process.exit(1)
  }
}

/* --- init ------------------------------------------------------------------------------------ */

collectResolvers()
