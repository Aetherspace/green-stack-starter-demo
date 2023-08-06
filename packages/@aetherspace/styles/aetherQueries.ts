// Utils
import { camelToDash, createKey, isValidNumber } from '../utils'

/* --- SSR Media Queries ----------------------------------------------------------------------- */
// -i- Loosely based on: https://gist.github.com/EyMaddis/35ae3b269e4658527a1f8e374bd434ac#file-lib_cssinjection-ts
const mediaQueries: { [id: string]: string } = {}
const AETHER_QUERIES = 'AetherQueries'

/* --- Constants ------------------------------------------------------------------------------- */

const ALLOWED_UNITS = ['px', '%'] // Limited due to RN support
const PX_PROPERTIES = ['margin', 'padding', 'fontSize', 'lineHeight']
const PX_POSSIBLES = ['width', 'height', 'maxWidth', 'minWidth', 'maxHeight', 'minHeight']

/* --- getUnit() ------------------------------------------------------------------------------- */

const getUnit = (classKey: string, styleVal: any) => {
  // Check if the style value already has a unit
  const hasAllowedUnit = ALLOWED_UNITS.some((unit) => styleVal.includes?.(unit))
  if (hasAllowedUnit) return ''
  // Check if the value without a known allowed unit is a number
  if (!isValidNumber(styleVal)) return ''
  // Check if the property is a pixel property
  const shouldUsePx = PX_PROPERTIES.some((cssKey) => classKey.includes(cssKey))
  if (shouldUsePx) return 'px'
  // If a unit is known to be required but missing, use px
  const couldUsePx = PX_POSSIBLES.some((cssKey) => classKey.includes(cssKey))
  if (couldUsePx) return 'px'
  // Otherwise, no unit is required
  return ''
}

/* --- addMediaQuery() ------------------------------------------------------------------------- */

export const addMediaQuery = (breakpoint: number, styles: Record<string, unknown>): string => {
  // Create unique style ID (e.g. '320--123456789')
  const styleId = `${breakpoint}-${createKey(styles)}` // @ts-ignore
  // Build CSS rules from style object
  const breakpointSelector = `@media only screen and (min-width: ${breakpoint}px)`
  const breakpointRules = Object.entries(styles).map(([cssProperty, styleVal]) => {
    const cssKey = camelToDash(cssProperty) // e.g. minWidth -> min-width
    const cssVal = `${styleVal}${getUnit(cssProperty, styleVal)}` // e.g. 120px
    return `${cssKey}: ${cssVal} !important;`
  })
  const breakpointCSS = `${breakpointSelector} { [id~="${styleId}"] { ${breakpointRules.join(' ')} } }` // prettier-ignore
  // Save css to global styles object
  mediaQueries[styleId] = breakpointCSS
  // Return styleId to be included in native DOM `[id]` prop
  return styleId
}

/* --- getInjectableMediaQueries() ------------------------------------------------------------- */

export const getInjectableMediaQueries = () => ({
  id: AETHER_QUERIES,
  css: Object.values(mediaQueries).join('\n'),
})
