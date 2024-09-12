import glob from 'glob'
import fs from 'fs'
import { excludeDirs } from './helpers/scriptUtils'
import { parseGlobalCSS } from '../utils/styleUtils'

/* --- Constants ------------------------------------------------------------------------------- */

const genMsg = `// -i- Auto generated with "npx turbo run @green-stack/core#build:theme-colors"\n`

/* --- build-theme-colors ---------------------------------------------------------------------- */

const buildThemeColors = () => {
    try {
        // Get all the global.css files in the workspace
        const nextGlobalCssPaths = glob.sync('../../apps/next/global.css').filter(excludeDirs)
        const featureGlobalCssPaths = glob.sync('../../packages/**/global.css').filter(excludeDirs)
        const packageGlobalCssPaths = glob.sync('../../packages/**/global.css').filter(excludeDirs)
        const allGlobalCssPaths = [...nextGlobalCssPaths, ...featureGlobalCssPaths, ...packageGlobalCssPaths]

        // Combine all the global.css files into a single string
        const globalCss = allGlobalCssPaths.reduce((acc, cssPath) => {
            const cssContent = fs.readFileSync(cssPath, 'utf8')
            return `${acc}\n${cssContent}`
        }, '')

        // Parse the global.css file to extract theme colors
        const themeColors = parseGlobalCSS(globalCss)

        // Write the theme colors to a file
        const themeColorsPath = '../../packages/@registries/themeColors.generated.ts'
        const themeColorsRegistry = `${genMsg}export const themeColors = ${JSON.stringify(themeColors, null, 4)} as const\n`
        fs.writeFileSync(themeColorsPath, themeColorsRegistry)

        // Log success message
        console.log('-----------------------------------------------------------------')
        console.log('-i- Successfully created themeColors.generated.ts')
        console.log('-----------------------------------------------------------------')

    } catch (err) {
        console.log(err)
        console.error(err)
        process.exit(1)
    }
}

/* --- init ------------------------------------------------------------------------------------ */

buildThemeColors()
