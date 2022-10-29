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

const useAetherStyles = <
  C extends JSXElementConstructor<any>,
  P extends StylePropsType<C> = StylePropsType<C>
>(
  props: P
) => {
  // Props
  const { style, tw } = props

  // Normalisation of ways to define the tw prop
  const twStrings = Array.isArray(tw) ? tw.filter(Boolean).join(' ') : tw

  // Context
  const {
    tailwind,
    isWeb,
    isServer,
    breakpoints = {},
    twPrefixes = [],
    mediaPrefixes = [],
  } = useAetherContext()

  // -- Styles --

  const [styles, mediaIds] = useMemo(() => {
    // Start off without breakpoints
    let breakpointIds = ''
    // Return nothing when no style related props were found
    if (!style && !twStrings) return [null, breakpointIds]
    // Return regular styles when no tailwind classes were passed
    if (!twStrings) return [style as unknown as ComponentProps<C>['style'], breakpointIds]
    // Determine tailwind classes
    const twClasses = twStrings!.split(' ').sort((a) => (a.includes(':') ? 1 : -1))
    // Check for serverside media queries?
    const usedClasses = twClasses.reduce((classes, twClass, i) => {
      // If there's no "{prefix/breakpoint}:tw-class" in the string, there's nothing to check further
      if (!twClass.includes(':')) return [classes, twClass].join(' ')
      // Split up into a) the prefix to check for & b) the tailwind class to apply
      const [twPrefix, className] = twClass.split(':')
      // Add a media query to the server-side style object?
      if (isWeb && mediaPrefixes.includes(twPrefix)) {
        const breakpointStyles = tailwind!`${className}` || {}
        const breakpointId = addMediaQuery(
          breakpoints[twPrefix as keyof BreakPointsType]!,
          breakpointStyles
        )
        breakpointIds = `${breakpointIds}${!breakpointIds ? '' : ' '}${breakpointId}`
      }
      // If there's match in browser or mobile, add the tailwind class to the list of classes to apply on the front-end
      const didMatch = twPrefixes.includes(twPrefix)
      if (didMatch && !isServer) return [classes, className].join(' ')
      // Otherwise, keep the original string
      return classes
    }, '')
    // Memoize the tailwind style object (by returning it in this useMemo) so we don't recalculate them on every render
    const memoStyles = {
      // @ts-ignore
      ...tailwind`${usedClasses}`,
      ...style,
    } as unknown as ComponentProps<C>['style']
    // Return the styles
    return [memoStyles, breakpointIds] as [ComponentProps<C>['style'], string]
  }, [style, twStrings, twPrefixes.join()])

  // -- bindStyles --

  const bindStyles = { style: styles, ...(mediaIds ? { nativeID: mediaIds } : {}) }

  // -- Return --

  return bindStyles
}

/* --- Exports --------------------------------------------------------------------------------- */

export default useAetherStyles
