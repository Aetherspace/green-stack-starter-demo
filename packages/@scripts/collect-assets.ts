import glob from 'glob'
import fs from 'fs'
// Utils
import { getAssetKey } from 'aetherspace/utils/stringUtils'

/* --- collectAssets --------------------------------------------------------------------------- */

const collectAssets = () => {
  try {
    const nextAppPaths = glob.sync('../../apps/*-next')
    nextAppPaths.forEach((nextAppPath) => {
      const excludeJS = (pth) => ['.js', '.json'].every((ext) => !pth.includes(ext))
      const excludeDirs = (pth) => pth.split('/').pop().includes('.')
      const assetPaths = glob.sync(`${nextAppPath}/public/**/*`).filter(excludeJS).filter(excludeDirs)
      const assetRegistry = assetPaths.reduce((acc, assetPath) => {
        const requirePath = assetPath.replace('../../apps/', '../')
        const relSrcPath = assetPath.replace(`${nextAppPath}/public`, '')
        const assetKey = getAssetKey(relSrcPath)
        const exportLine = `export const ${assetKey} = require('${requirePath}');`
        return `${acc}${exportLine}\n`
      }, '// -i- Auto generated with "yarn collect-assets"\n')
      const appPath = nextAppPath.replace('-next', '')
      fs.writeFileSync(`${appPath}/assets.generated.ts`, assetRegistry)
    })
    const appPaths = nextAppPaths.map((nextAppPath) => nextAppPath.replace('../../', '../'))
    const resultLogs = appPaths.map((appPath) => `✅ ${appPath.replace('-next', '')}/assets.ts`)
    console.log('-i- Successfully created asset registries at:\n', resultLogs.join('\n'))
    process.exit(0)
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}

/* --- init ------------------------------------------------------------------------------------ */

collectAssets()
