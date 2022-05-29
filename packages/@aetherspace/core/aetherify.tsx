import React, { forwardRef, ComponentType } from 'react'
import { useAetherStyles } from '../hooks'

/* --- Types ----------------------------------------------------------------------------------- */

type AetherPropsType = {
  tw?: string | (string | null | undefined | false | 0)[]
  twID?: string
}

/* --- aetherify() ----------------------------------------------------------------------------- */
// -i- Wraps with useAetherStyles(), which will add server-side media query support to avoid layout shift on web
// -i- Inspired by https://github.com/nandorojo/moti/blob/master/packages/core/src/motify.tsx
const aetherify = <
  Style,
  Props extends { style?: Style },
  Ref,
  ExtraProps
  // Animate = ViewStyle | ImageStyle | TextStyle
>(
  Component: ComponentType<Props>
) => {
  // Use higher order component to attach aether style support
  const withAetherStyles = () => {
    // Turn into component with aether style support
    const Aetherified = forwardRef<Ref, Props & ExtraProps & AetherPropsType & { children?: React.ReactNode }>(
      function Aether({ tw, twID, style, ...props }, ref) {
        // -i- useAetherStyles() will add server-side media query support to avoid layout shift on web
        const bindStyles = useAetherStyles({ tw, twID, style: style as any, ...props }) // @ts-ignore
        return <Component {...props} {...(bindStyles as any)} ref={ref as any} />
      }
    )
    // Apply updated display name
    Aetherified.displayName = `Aether.${Component.displayName || Component.name || 'NoName'}`
    // Return aetherified component
    return Aetherified
  }
  // Return function wrapper
  return withAetherStyles
}

/* --- Exports --------------------------------------------------------------------------------- */

export default aetherify
