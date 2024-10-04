import { colorScheme, useColorScheme } from 'nativewind'
import { themeColors as THEME_COLORS } from '@app/registries/themeColors.generated'
import { ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/* --- Types ----------------------------------------------------------------------------------- */

export type THEME_COLOR_KEYS = keyof typeof THEME_COLORS['light']

/** --- cn() ----------------------------------------------------------------------------------- */
/** -i- Combines an array of classNames but filters out falsy array elements */
export const cn = (...classNames: ClassValue[]) => twMerge(clsx(...classNames))

/** --- extractCssVar() ------------------------------------------------------------------------ */
/** -i- Extracts the css variable name from any string if present */
export const extractCssVar = (str: string) => {
    const match = str.match(/var\(--[\w-]+\)/)?.[0]
    return match ? match.replace('var(', '').replace(')', '') : ''
}

/** --- getThemeColor() ------------------------------------------------------------------------ */
/** -i- Retrieves the nativewind theme color for the global.css variable provided */
export const getThemeColor = <V extends THEME_COLOR_KEYS>(
    colorVar: V,
    theme: 'light' | 'dark' = colorScheme.get() || 'light',
) => {
    return THEME_COLORS[theme][colorVar]
}

/** --- useThemeColor() ------------------------------------------------------------------------ */
/** -i- Retrieves the nativewind theme color for the global.css variable provided */
export const useThemeColor = <V extends THEME_COLOR_KEYS>(colorVar: V) => {
    const scheme = useColorScheme()
    return getThemeColor(colorVar, scheme.colorScheme)
}

/** --- parseGlobalCSS() ----------------------------------------------------------------------- */
/** -i- Parses the contents of the global.css file to extract light & dark mode colors if present
 ** Won't detect unless `--css-variables` defined within `:root` and `.dark:root` */
export const parseGlobalCSS = (globalCSS: string) => {
    // Define the theme object
    const themeColors = {
        light: {} as Record<string, string>,
        dark: {} as Record<string, string>,
    }

    // Helper function to process individual theme sections
    const processSection = (sectionText: string, themeKey: 'light' | 'dark') => {
        const lines = sectionText.split('\n').filter(line => line.trim().startsWith('--'))
        lines.forEach(line => {
            let key = line.match(/--[\w-]+/)?.[0] // Extract the variable name
            let value = line.match(/:\s*([^;]+)/)?.[1].trim() // Extract everything before the semicolon

            // Skip invalid lines
            if (!key || !value) return

            // Remove comments to get the clean value
            value = value.split('/*')[0].trim()

            // Check the type of color value and format appropriately
            if (value.match(/^\d+,\s*\d+%,\s*\d+%$/)) { // Check for hsl pattern without 'hsl' prefix
                value = `hsl(${value})`
            } else if (value.match(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/)) { // Check for hex pattern
                // value stays the same
            } else if (value.match(/^(rgb|rgba)\(/)) { // Check for rgb or rgba pattern
                // value stays the same
            }

            themeColors[themeKey][key] = value
        })
    }

    // Splitting the entire file into sections for light and dark modes
    const rootIndex = globalCSS.indexOf(':root {')
    const darkRootIndex = globalCSS.indexOf('.dark:root {')
    const rootSection = globalCSS.substring(rootIndex, darkRootIndex).replace(':root {', '')
    let darkRootSection = globalCSS.substring(darkRootIndex).replace('.dark:root {', '')
    const darkRootEnd = darkRootSection.indexOf('\n}', darkRootIndex)
    darkRootSection = darkRootSection.substring(0, darkRootEnd)

    // Process each section separately
    processSection(rootSection, 'light')
    processSection(darkRootSection, 'dark')

    // Return the theme colors object
    return themeColors
}
