import { useMemo, ComponentProps, JSXElementConstructor } from 'react'
// Schemas
import { TAetherStyleProps } from '../../schemas/ats'
// Context
import { BreakPointsType } from '../../context/AetherContextManager/aetherContext'
import { useAetherContext } from '../../context/AetherContextManager/useAetherContext'
// Styles
import { addMediaQuery } from '../../styles/aetherQueries'

/* --- Types ----------------------------------------------------------------------------------- */

export type StylePropsType<C extends JSXElementConstructor<any>> = TAetherStyleProps & {
  style?: ComponentProps<C>['style']
  id?: string
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
  const { style } = props
  const tw = props.tw || props.className || props.class

  // Normalisation of ways to define the tw prop
  const twStrings = Array.isArray(tw) ? tw.filter(Boolean).join(' ') : tw

  // Context
  const {
    tailwind,
    isWeb,
    isNextJS,
    isStorybook,
    isServer,
    breakpoints = {},
    twPrefixes = [],
    mediaPrefixes = [],
  } = useAetherContext()

  // -- Styles --

  const prefixKey = twPrefixes.join()
  const [styles, mediaIds] = useMemo(() => {
    // Start off without breakpoints
    let breakpointIds = ''
    // Return nothing when no style related props were found
    if (!style && !twStrings) return [undefined, breakpointIds]
    // Return regular styles when no tailwind classes were passed
    if (!twStrings) return [style as unknown as ComponentProps<C>['style'], breakpointIds]
    // Determine tailwind classes
    const twClasses = twStrings!.split(' ').sort((a) => (a.includes(':') ? 1 : -1))
    // Check for serverside media queries?
    const usedClasses = twClasses.reduce((classes, twClass) => {
      // If there's no "{prefix/breakpoint}:tw-class" in the string, there's nothing to check further
      if (!twClass.includes(':')) return [classes, twClass].join(' ')
      // Split up into a) the prefix to check for & b) the tailwind class to apply
      const [twPrefix, className] = twClass.split(':')
      // Add a media query to the server-side style object?
      const shouldAddMediaQuery = isWeb && mediaPrefixes.includes(twPrefix)
      if (shouldAddMediaQuery) {
        const breakpointStyles = tailwind!`${className}` || {}
        const breakpointId = addMediaQuery(
          breakpoints[twPrefix as keyof BreakPointsType]!,
          breakpointStyles
        )
        breakpointIds = `${breakpointIds}${!breakpointIds ? '' : ' '}${breakpointId}`
      }
      // If we're not solving with Media Queries, add the tailwind class to the list of classes to apply on the front-end
      const didMatchPrefix = twPrefixes.includes(twPrefix)
      if (didMatchPrefix && (!isServer || isStorybook)) return [classes, className].join(' ')
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [style, twStrings, prefixKey])

  // -- bindStyles --

  const bindStyles = { style: styles, ...(mediaIds ? { id: mediaIds } : {}) }

  // -- Return --

  return bindStyles
}

/* --- Exports --------------------------------------------------------------------------------- */

export default useAetherStyles
