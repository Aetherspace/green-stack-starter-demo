import glob from 'glob'
import fs from 'fs'
// Utils
import { getAssetKey } from '../utils/stringUtils'

/* --- collectAssets --------------------------------------------------------------------------- */

const collectAssets = () => {
  try {
    // General filter helpers
    const excludeJS = (pth) => ['.js', '.json'].every((ext) => !pth.includes(ext))
    const excludeDirs = (pth) => pth.split('/').pop().includes('.')
    // Get all asset file paths in the next app's public folder
    const assetPaths = glob
      .sync('../../apps/next/public/**/*')
      .filter(excludeJS)
      .filter(excludeDirs)
    // Map asset paths to asset keys and turn into barrel file body for 'assets.generated.ts'
    const assetRegistry = assetPaths.reduce((acc, assetPath) => {
      const requirePath = assetPath.replace('../../apps/', '../../apps/')
      const relSrcPath = assetPath.replace('apps/next/public', '')
      const assetKey = getAssetKey(relSrcPath)
      const exportLine = `export const ${assetKey} = require('${requirePath}');`
      return `${acc}${exportLine}\n`
    }, '// -i- Auto generated with "yarn collect-assets"\n')
    // Write barrel file to 'packages/@registries/assets.generated.ts'
    fs.writeFileSync('../../packages/@registries/assets.generated.ts', assetRegistry)
    console.log(
      '-i- Successfully created asset registries at:',
      '\n✅ packages/@registries/assets.generated.ts'
    )
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}

/* --- init ------------------------------------------------------------------------------------ */

collectAssets()
