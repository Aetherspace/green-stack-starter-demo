import glob from 'glob'
import fs from 'fs'
import type { ALLOWED_METHODS } from '../../schemas/createDataBridge'
export * from '../../utils/stringUtils'

/* --- Types ----------------------------------------------------------------------------------- */

type HINTED_METHODS = ALLOWED_METHODS | HintedKeys

/** --- excludeDirs() -------------------------------------------------------------------------- */
/** -i- Filter function to exclude folders and directories */
export const excludeDirs = (pth: string) => pth.split('/').pop()?.includes('.')

/** --- excludeModules() ----------------------------------------------------------------------- */
/** -i- Filter function to exclude node_modules folders */
export const excludeModules = (pth: string) => !pth.includes('node_modules')

/** --- normalizeName() ------------------------------------------------------------------------ */
/** -i- Make sure only lowercase and uppercase letters are left in a given string */
export const normalizeName = (str: string) => str.replace(/[^a-zA-Z]/g, '')

/** --- matchMethods() ------------------------------------------------------------------------- */
/** -i- Checks that a certain method (like `'GET'`, `'POST'`, ...) is included in list of method names */
export const matchMethods = (methods: HINTED_METHODS[], method: HINTED_METHODS) => {
    return methods.includes(method)
}

/** --- createDivider() ------------------------------------------------------------------------ */
/** -i- Creates a code divider that's always 100 chars wide */
export const createDivider = (title: string, isDocDivider = false) => {
    const baseTemplate = isDocDivider ? `/** --- ${title}  */` : `/* --- ${title}  */`
    const remainingSpace = 100 - baseTemplate.length - 1
    const remainingDashes = '-'.repeat(remainingSpace)
    return baseTemplate.replace(`${title}  */`, `${title} ${remainingDashes} */`)
}

/** --- includesOption() ----------------------------------------------------------------------- */
/** -i- HoC to prefill a list of options that are checked against in the actual filter method
 * @example ```
 *  const includesGet = includesOption(['GET', 'POST'])
 *  // => Creates filter method
 *  const result = ['GET', 'POST', 'PUT'].filter(includesGet)
 *  // => ['GET', 'POST']
 * ``` */
export const includesOption = (options: string[]) => {
    return (opt: string) => options.some((option) => opt.includes(option))
}

/** --- createAutocompleteSource() ------------------------------------------------------------- */
/** -i- HoC that creates an autocomplete source fn that filters multi-choice cli options based on input */
export const createAutocompleteSource = (options: string[]) => {
    return (answersSoFar: any$Todo, input = '') => {
        const filteredBridges = options.filter((option) => option.includes(input))
        return Promise.resolve(filteredBridges)
    }
}

/** --- validateNonEmptyNoSpaces() ------------------------------------------------------------- */
/** -i- Validates that a string is not empty and does not contain spaces, returns error message if it does */
export const validateNonEmptyNoSpaces = (input: string) => {
    if (!input) return 'Please enter a non-empty value'
    if (input.includes(' ')) return 'Please enter a value without spaces'
    return true
}

/** --- parseWorkspaces() ---------------------------------------------------------------------- */
/** -i- Figure out all info about all workspaces and return mapped linking info for use in scripts */
export const parseWorkspaces = (folderLevel = '../../') => {
    // Get all workspace package.json paths
    const packageConfigPaths = glob.sync(`${folderLevel}packages/**/package.json`).filter(excludeModules) // prettier-ignore
    const featureConfigPaths = glob.sync(`${folderLevel}features/**/package.json`).filter(excludeModules) // prettier-ignore
    const packageJSONPaths = [...packageConfigPaths, ...featureConfigPaths]
  
    // Map to keep track of all workspace package configs, filled in next step
    const workspaceConfigs = {} as Record<string, any>
  
    // Build a map of workspace imports as { [workspacePath]: workspacePackage, ... }
    const workspaceImports = packageJSONPaths.reduce((acc, wsPath) => {
        const packageJSON = JSON.parse(fs.readFileSync(wsPath, 'utf8'))
        const workspaceMatcher = wsPath.replace(`${folderLevel}`, '').replace('/package.json', '')
        workspaceConfigs[workspaceMatcher] = packageJSON
        return { ...acc, [workspaceMatcher]: packageJSON.name }
    }, {}) as Record<string, string>
  
    // Reverse that map to get a map of workspace packages as { [workspacePackage]: workspacePath, ... }
    const workspacePathsMap = Object.entries(workspaceImports).reduce((acc, [wsPath, pkgName]) => {
        return { ...acc, [pkgName]: wsPath }
    }, {}) as Record<string, string>
  
    // Other info we might need (sorted by preferred transpilation order > packages first, then features)
    const sortByOrder = (a: string, b: string) => (a.includes('packages') && !b.includes('packages') ? -1 : 1) // prettier-ignore
    const workspacePaths = Object.keys(workspaceImports).sort(sortByOrder)
    const workspacePackages = workspacePaths.map((path) => workspaceImports[path])
  
    // Return all the info we've gathered
    return {
        /** -i- A mapped object of { [workspacePath]: package.json config, ... } */
        workspaceConfigs,
        /** -i- A mapped object of { [workspacePath]: workspace package name, ... } */
        workspaceImports,
        /** -i- A mapped object of { [workspacePackage]: workspace path, ... } */
        workspacePathsMap,
        /** -i- An array of all workspace paths, e.g. ["packages/@green-stack-core", ...]  */
        workspacePaths,
        /** -i- An array of all workspace package names, e.g. ["@green-stack/core", ...] */
        workspacePackages,
    }
}

/** --- getWorkspaceOptions() ------------------------------------------------------------------ */
/** -i- List all the available workspaces for generators to use (map of options to workspace paths)
 * @example ```
 *  const workspaceOptions = getWorkspaceOptions()
 *  // => {
 *  //  "features/@app-core  --  importable from: '@app/core'":
 *  //      'features/@app-core',
 *  //  ...
 *  // }   
 * ``` */
export const getWorkspaceOptions = (folderLevel = '../../') => {
    const { workspaceImports } = parseWorkspaces(folderLevel)
    return Object.keys(workspaceImports).reduce((options, workspacePath) => {
        const workspaceName = workspaceImports[workspacePath]
        const workspaceOption = `${workspacePath}  --  importable from: '${workspaceName}'`
        // Skip listing the helper workspaces
        if (['green-stack', 'registries'].some(helper => workspaceName.includes(helper))) {
            return options
        }
        // Add the workspace option
        return { ...options, [workspaceOption]: workspacePath }
    }, {}) as Record<string, string>
}

/** --- getAvailableSchemas() ------------------------------------------------------------------ */
/** -i- List all the available schemas in the codebase that generators can use */
export const getAvailableSchemas = (folderLevel = '../../') => {
    // Get workspace imports
    const { workspaceImports } = parseWorkspaces(folderLevel)
  
    // Get paths of all schemas
    const packageSchemaPaths = glob.sync(`${folderLevel}packages/**/schemas/[A-Z]*.ts`).filter(excludeModules) // prettier-ignore
    const featureSchemaPaths = glob.sync(`${folderLevel}features/**/schemas/[A-Z]*.ts`).filter(excludeModules) // prettier-ignore
    const allSchemaPaths = [...packageSchemaPaths, ...featureSchemaPaths].filter((pth) => {
        return !['createSchema', '.bridge', '.resolver', '.enum'].some((excluded) => pth.includes(excluded))
    })
  
    // Map to build list of available resolvers to integrate with
    const availableSchemas = allSchemaPaths.reduce((acc, schemaPath) => {
        // Figure out the schema name and contents
        const schemaName = schemaPath.split('/').pop()!.replace('.ts', '')
        const workspacePath = schemaPath.split('/schemas/')?.[0]?.replace(`${folderLevel}`, '')
        const workspaceName = workspaceImports[workspacePath]
        const fileContents = fs.readFileSync(schemaPath, 'utf8')

        // Stop if the schema is not exported of not found due to name not matching
        const isNamedExport = fileContents.includes(`export const ${schemaName}`)
        const isDefaultExport = fileContents.includes(`export default ${schemaName}`)
        if (!isNamedExport && !isDefaultExport) return acc

        // Build the option to display in the CLI
        const schemaOption = `${workspaceName} - ${schemaName}`
  
        // Add the schema to the list of available schemas
        return {
            ...acc,
            [schemaOption]: {
                schemaPath: schemaPath?.replace(`${folderLevel}`, ''),
                schemaName,
                workspacePath,
                workspaceName,
                isNamedExport,
                isDefaultExport,
            },
        }
    }, {}) as Record<
        string,
        {
            schemaPath: string
            schemaName: string
            workspacePath: string
            workspaceName: string
            isNamedExport: boolean
            isDefaultExport: boolean
        }
    >
    return availableSchemas
}

/** --- getAvailableDataBridges() -------------------------------------------------------------- */
/** -i- List all the available data bridges for generators to use */
export const getAvailableDataBridges = (
    folderLevel = '../../',
    filterType?: 'query' | 'mutation',
    allowNonGraphql = false,
) => {
    // Get workspace imports
    const { workspaceImports } = parseWorkspaces(folderLevel)

    // Get paths of all Data Bridges
    const packageBridgePaths = glob.sync(`${folderLevel}packages/**/resolvers/**.bridge.ts`).filter(excludeModules) // prettier-ignore
    const featureBridgePaths = glob.sync(`${folderLevel}features/**/resolvers/**.bridge.ts`).filter(excludeModules) // prettier-ignore
    const allDataBridgePaths = [...packageBridgePaths, ...featureBridgePaths].filter((pth) => !pth.includes('createDataBridge')) // prettier-ignore

    // Map to build list of available resolvers to integrate with
    const availableDataBridges = allDataBridgePaths.reduce((acc, bridgePath) => {
        // Figure out the bridge name and contents
        const bridgeName = bridgePath.split('/').pop()!.replace('.bridge.ts', 'Bridge')
        const workspacePath = bridgePath.split('/resolvers/')[0]?.replace(`${folderLevel}`, '')
        const workspaceName = workspaceImports[workspacePath]
        const fileContents = fs.readFileSync(bridgePath, 'utf8')

        // Stop if the bridge is not exported of not found due to name not matching
        const isNamedExport = fileContents.includes(`export const ${bridgeName}`)
        const isDefaultExport = fileContents.includes(`export default ${bridgeName}`)
        if (!isNamedExport && !isDefaultExport) return acc

        // Figure out the resolver name
        const isCallingCreateDataBridge = fileContents.includes('createDataBridge(')
        const resolverName = fileContents.match(/resolverName: '(\w+)'/)?.[1]
        if (!isCallingCreateDataBridge || !resolverName) return acc

        // Filter out queries or mutations?
        const allowedMethodsLine = fileContents.match(/allowedMethods: \[(.+)\]/)?.[1]
        const hasGraphResolver = allowedMethodsLine?.includes('GRAPHQL')
        if (!allowNonGraphql && !hasGraphResolver) return acc
        const resolverTypeLine = fileContents.match(/resolverType: '(\w+)'/)?.[1]
        if (filterType && resolverTypeLine !== filterType) return acc

        // Build the option to display in the CLI
        const dataBridgeOption = `${workspaceName} >>> ${resolverName}()`

        // Add the bridge to the list of available bridges
        return {
            ...acc,
            [dataBridgeOption]: {
                bridgePath: bridgePath?.replace(`${folderLevel}`, ''),
                bridgeName,
                workspacePath: workspacePath?.replace(`${folderLevel}`, ''),
                workspaceName,
                resolverName,
                isNamedExport,
                isDefaultExport,
            },
        }
    }, {}) as Record<
        string,
        {
            bridgePath: string
            bridgeName: string
            workspacePath: string
            workspaceName: string
            isNamedExport: boolean
            isDefaultExport: boolean
            resolverName: string
        }
    >
    return availableDataBridges
}
