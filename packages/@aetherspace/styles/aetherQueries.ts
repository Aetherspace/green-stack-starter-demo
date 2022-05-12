// Utils
import { camelToDash, createKey } from '../utils'

/* --- SSR Media Queries ----------------------------------------------------------------------- */
// -i- Loosely based on: https://gist.github.com/EyMaddis/35ae3b269e4658527a1f8e374bd434ac#file-lib_cssinjection-ts
const mediaQueries: { [id: string]: string } = {}
const AETHER_QUERIES = 'AetherQueries'

/* --- getUnit() ------------------------------------------------------------------------------- */

const getUnit = (classKey: string) => {
  let unit = ''
  if (['margin', 'padding'].some((cssKey) => classKey.includes(cssKey))) unit = 'px'
  return unit
}

/* --- addMediaQuery() ------------------------------------------------------------------------- */

export const addMediaQuery = (breakpoint: number, styles: Record<string, unknown>): string => {
  const styleId = `${breakpoint}-${createKey(styles)}` // @ts-ignore
  // Build CSS rules from style object
  const breakpointSelector = `@media only screen and (min-width: ${breakpoint}px)`
  const breakpointRules = Object.entries(styles).map(([cssProperty, styleVal]) => {
    return `${camelToDash(cssProperty)}: ${styleVal}${getUnit(cssProperty)} !important;`
  })
  const breakpointCSS = `${breakpointSelector} { [id~="${styleId}"] { ${breakpointRules.join(' ')} } }`
  // Save css to global styles object
  mediaQueries[styleId] = breakpointCSS
  // Return styleId to be included in `[id]` prop
  return styleId
}

/* --- getInjectableMediaQueries() ------------------------------------------------------------- */

export const getInjectableMediaQueries = () => ({
  id: AETHER_QUERIES,
  css: Object.values(mediaQueries).join('\n'),
})
