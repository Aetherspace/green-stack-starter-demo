import glob from 'glob'
import fs from 'fs'
// Utils
import { getAssetKey } from 'aetherspace/utils/stringUtils'

/* --- collectAssets --------------------------------------------------------------------------- */

const collectAssets = () => {
  try {
    const excludeJS = (pth) => ['.js', '.json'].every((ext) => !pth.includes(ext))
    const excludeDirs = (pth) => pth.split('/').pop().includes('.')
    const assetPaths = glob.sync('../../apps/next/public/**/*').filter(excludeJS).filter(excludeDirs)
    const assetRegistry = assetPaths.reduce((acc, assetPath) => {
      const requirePath = assetPath.replace('../../apps/', '../../apps/')
      const relSrcPath = assetPath.replace('apps/next/public', '')
      const assetKey = getAssetKey(relSrcPath)
      const exportLine = `export const ${assetKey} = require('${requirePath}');`
      return `${acc}${exportLine}\n`
    }, '// -i- Auto generated with "yarn collect-assets"\n')
    fs.writeFileSync('../../features/app-core/assets.generated.ts', assetRegistry)
    console.log('-i- Successfully created asset registries at:\n', '✅ features/app-core/assets.generated.ts')
    process.exit(0)
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}

/* --- init ------------------------------------------------------------------------------------ */

collectAssets()
