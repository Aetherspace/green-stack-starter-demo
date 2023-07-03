import glob from 'glob'
import fs from 'fs'

/** --- excludeDirs() -------------------------------------------------------------------------- */
/** -i- Filter function to exclude folders and directories */
export const excludeDirs = (pth) => pth.split('/').pop().includes('.')

/** --- excludeModules() ----------------------------------------------------------------------- */
/** -i- Filter function to exclude node_modules folders */
export const excludeModules = (pth) => !pth.includes('node_modules')

/** --- listWorkspaceImports() ----------------------------------------------------------------- */
/** -i- Figure out import paths from each workspace */
export const listWorkspaceImports = (folderLevel = '../../') => {
  const packageConfigPaths = glob.sync(`${folderLevel}packages/**/package.json`).filter(excludeModules) // prettier-ignore
  const featureConfigPaths = glob.sync(`${folderLevel}features/**/package.json`).filter(excludeModules) // prettier-ignore
  const packageJSONPaths = [...packageConfigPaths, ...featureConfigPaths]
  const workspaceImports = packageJSONPaths.reduce((acc, pth) => {
    const packageJSON = JSON.parse(fs.readFileSync(pth, 'utf8'))
    const workspaceMatcher = pth.replace(`${folderLevel}`, '').replace('/package.json', '')
    return { ...acc, [workspaceMatcher]: packageJSON.name }
  }, {}) as Record<string, string>
  return workspaceImports
}
