import glob from 'glob'
import fs from 'fs'

/** --- excludeDirs() -------------------------------------------------------------------------- */
/** -i- Filter function to exclude folders and directories */
export const excludeDirs = (pth) => pth.split('/').pop().includes('.')

/** --- excludeModules() ----------------------------------------------------------------------- */
/** -i- Filter function to exclude node_modules folders */
export const excludeModules = (pth) => !pth.includes('node_modules')

/** --- parseWorkspaces() ----------------------------------------------------------------------- */
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
