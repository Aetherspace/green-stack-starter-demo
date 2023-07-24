import glob from 'glob'
import fs from 'fs'
// Utils
import { findTargetString, dashToCamel } from '../utils/stringUtils'

/* --- Template -------------------------------------------------------------------------------- */

let iconRegistry = `// -i- Auto generated with 'yarn ats collect-icons'
{{iconRegistryImports}}

/* --- Exports --------------------------------------------------------------------------------- */

export const REGISTERED_ICONS = {
    {{iconRegistryExports}}
} as const // prettier-ignore
`

/* --- collect-resolvers ----------------------------------------------------------------------- */

const collectResolvers = () => {
  try {
    // Get all resolver file paths in the next app's api folder
    const featureIconRegistries = glob.sync('../../features/**/icons/registry.tsx')
    const packageIconRegistries = glob.sync('../../packages/**/icons/registry.tsx')
    const allIconRegistries = [...featureIconRegistries, ...packageIconRegistries]

    // Collect all icon registry export parts
    const iconRegistryImports = [] as string[]
    const iconRegistryExports = [] as string[]
    allIconRegistries.forEach((iconRegistryPath) => {
      const importPath = iconRegistryPath.replace('.tsx', '')
      const importType = iconRegistryPath.includes('features') ? 'features' : 'packages'
      const importWorkspace = findTargetString(importPath, `${importType}/$target$/icons/registry`)
      const importAlias = `${dashToCamel(importWorkspace!).replace('@', '')}Icons`
      iconRegistryImports.push(`import { iconRegistry as ${importAlias} } from '${importPath}'`)
      iconRegistryExports.push(`...${importAlias},`)
    })

    // Write iconRegistry file to 'packages/@registries/icons.generated.ts'
    iconRegistry = iconRegistry.replace('{{iconRegistryImports}}', iconRegistryImports.join('\n'))
    iconRegistry = iconRegistry.replace('{{iconRegistryExports}}', iconRegistryExports.join('\n    ')) // prettier-ignore
    fs.writeFileSync('../../packages/@registries/icons.generated.ts', iconRegistry)

    // Log success
    console.log('-----------------------------------------------------------------')
    console.log('-i- Successfully created icon registry at:')
    console.log('-----------------------------------------------------------------')
    console.log(' ✅ packages/@registries/icons.generated.ts')
  } catch (err) {
    console.log(err)
    console.error(err)
    process.exit(1)
  }
}

/* --- init ------------------------------------------------------------------------------------ */

collectResolvers()
