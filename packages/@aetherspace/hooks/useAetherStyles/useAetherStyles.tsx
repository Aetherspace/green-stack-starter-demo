import { useMemo, ComponentProps, JSXElementConstructor } from 'react'
// Context
import { BreakPointsType } from '../../context/AetherContextManager'
import { useAetherContext } from '../../context/AetherContextManager/useAetherContext'
// Styles
import { addMediaQuery } from '../../styles'

/* --- Types ----------------------------------------------------------------------------------- */

type StylePropsType<C extends JSXElementConstructor<any>> = {
  style?: ComponentProps<C>['style']
  tw?: string | (string | null | undefined | false | 0)[]
  twID?: string
  nativeID?: string
  children?: any
}

/* --- useAetherStyles() ----------------------------------------------------------------------- */

const useAetherStyles = <C extends JSXElementConstructor<any>, P extends StylePropsType<C> = StylePropsType<C>>(
  props: P
) => {
  // Props
  const { style, tw } = props
  const twStrings = Array.isArray(tw) ? tw.filter(Boolean).join(' ') : tw

  // Context
  const { tailwind, isWeb, breakpoints = {}, twPrefixes = [], mediaPrefixes = [] } = useAetherContext()

  // -- Styles --

  const [styles, mediaIds] = useMemo(() => {
    let breakpointIds = ''
    // Return nothing when no style related props were set
    if (!style && !twStrings) return [null, breakpointIds]
    // Return regular styles when no tailwind classes were passed
    if (!twStrings) return [style as unknown as ComponentProps<C>['style'], breakpointIds]
    // Determine tailwind styles to be used
    const twClasses = twStrings!.split(' ').sort((a) => (a.includes(':') ? 1 : -1))
    const usedClasses = twClasses.reduce((classes, twClass, i) => {
      if (!twClass.includes(':')) return `${classes}${i === 0 ? '' : ' '}${twClass}`
      const [twPrefix, className] = twClass.split(':')
      if (isWeb && mediaPrefixes.includes(twPrefix)) {
        const breakpointStyles = tailwind!`${className}` || {}
        const breakpointId = addMediaQuery(breakpoints[twPrefix as keyof BreakPointsType]!, breakpointStyles)
        breakpointIds = `${breakpointIds}${!breakpointIds ? '' : ' '}${breakpointId}`
      }
      return twPrefixes.includes(twPrefix) ? `${classes}${i === 0 ? '' : ' '}${className}` : classes
    }, '')
    // @ts-ignore
    const memoStyles = { ...tailwind`${usedClasses}`, ...style } as unknown as ComponentProps<C>['style']
    return [memoStyles, breakpointIds] as [ComponentProps<C>['style'], string]
  }, [style, twStrings, twPrefixes.join()])

  // -- bindStyles --

  const bindStyles = { style: styles, ...(mediaIds ? { nativeID: mediaIds } : {}) }

  // -- Return --

  return bindStyles
}

/* --- Exports --------------------------------------------------------------------------------- */

export default useAetherStyles
