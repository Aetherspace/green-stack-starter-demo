import glob from 'glob'
import fs from 'fs'
export * from '../../utils/stringUtils/stringUtils'

/** --- excludeDirs() -------------------------------------------------------------------------- */
/** -i- Filter function to exclude folders and directories */
export const excludeDirs = (pth) => pth.split('/').pop().includes('.')

/** --- excludeModules() ----------------------------------------------------------------------- */
/** -i- Filter function to exclude node_modules folders */
export const excludeModules = (pth) => !pth.includes('node_modules')

/** --- normalizeName() ------------------------------------------------------------------------ */
/** -i- Make sure only lowercase and uppercase letters are left in a given string */
export const normalizeName = (str: string) => str.replace(/[^a-zA-Z]/g, '')

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
  const sortByOrder = (a, b) => (a.includes('packages') && !b.includes('packages') ? -1 : 1)
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
    /** -i- An array of all workspace paths */
    workspacePaths,
    /** -i- An array of all workspace package names */
    workspacePackages,
  }
}

/** --- getWorkspaceOptions() ------------------------------------------------------------------ */
/** -i- List all the available workspaces for generators to use (map of options to workspace paths) */
export const getWorkspaceOptions = (folderLevel = '../../') => {
  const { workspaceImports } = parseWorkspaces(folderLevel)
  return Object.keys(workspaceImports).reduce((options, workspacePath) => {
    const workspaceName = workspaceImports[workspacePath]
    const workspaceOption = `${workspacePath}  --  importable from: '${workspaceName}'`
    // Skip listing the helper workspaces
    if (['config', 'aetherspace', 'registries'].includes(workspaceName)) return options
    // Add the workspace option
    return { ...options, [workspaceOption]: workspacePath }
  }, {}) as Record<string, string>
}

/** --- getAvailableSchemas() ------------------------------------------------------------------ */
/** -i- List all the available schemas for generators to use */
export const getAvailableSchemas = (folderLevel = '../../') => {
  // Get workspace imports
  const { workspaceImports } = parseWorkspaces(folderLevel)

  // Get paths of all schemas
  const packageSchemaPaths = glob.sync(`${folderLevel}packages/**/schemas/[A-Z]*.ts`).filter(excludeModules) // prettier-ignore
  const featureSchemaPaths = glob.sync(`${folderLevel}features/**/schemas/[A-Z]*.ts`).filter(excludeModules) // prettier-ignore
  const allSchemaPaths = [...packageSchemaPaths, ...featureSchemaPaths].filter((pth) => {
    return !['createSchema', 'DataBridge', 'Resolver', '.enum'].some((excluded) => pth.includes(excluded))
  }) // prettier-ignore

  // Map to build list of available resolvers to integrate with
  const availableSchemas = allSchemaPaths.reduce((acc, schemaPath) => {
    // Figure out the schema name and contents
    const schemaName = schemaPath.split('/').pop()!.replace('.ts', '')
    const workspacePath = schemaPath.split('/schemas/')[0]
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
        schemaPath,
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
  allowNonGraphql = false
) => {
  // Get workspace imports
  const { workspaceImports } = parseWorkspaces(folderLevel)

  // Get paths of all Data Bridges
  const packageBridgePaths = glob.sync(`${folderLevel}packages/**/schemas/**DataBridge.ts`).filter(excludeModules) // prettier-ignore
  const featureBridgePaths = glob.sync(`${folderLevel}features/**/schemas/**DataBridge.ts`).filter(excludeModules) // prettier-ignore
  const allDataBridgePaths = [...packageBridgePaths, ...featureBridgePaths].filter((pth) => !pth.includes('createDataBridge')) // prettier-ignore

  // Map to build list of available resolvers to integrate with
  const availableDataBridges = allDataBridgePaths.reduce((acc, bridgePath) => {
    // Figure out the bridge name and contents
    const bridgeName = bridgePath.split('/').pop()!.replace('.ts', '')
    const workspacePath = bridgePath.split('/schemas/')[0]
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
        bridgePath,
        bridgeName,
        workspacePath,
        workspaceName,
        isNamedExport,
        isDefaultExport,
        resolverName,
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

/* --- Other Helpers --------------------------------------------------------------------------- */

export const matchMethods = (methods: string[]) => (opt) => methods.includes(opt)

export const camelToDash = (str: string) => str.replace(/[\w]([A-Z])/g, (m) => `${m[0]}-${m[1]}`).toLowerCase() // prettier-ignore

export const includesOption = (strOpts: string[]) => (opt) => strOpts.join('').includes(opt)

export const createAutocompleteSource = (options: string[]) => {
  return (answersSoFar, input = '') => {
    const filteredBridges = options.filter((option) => option.includes(input))
    return Promise.resolve(filteredBridges)
  }
}

export const validateNonEmptyNoSpaces = (input: string) => {
  if (!input) return 'Please enter a non-empty value'
  if (input.includes(' ')) return 'Please enter a value without spaces'
  return true
}
