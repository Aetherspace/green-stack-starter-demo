import React, { forwardRef, ComponentType } from 'react'
import * as HTML from '@expo/html-elements'
import { AetherView, AetherText, AetherPressable, AetherImage } from '../primitives'
// Types
import { TAetherStyleProps } from '../schemas/ats'
// Hooks
import { useAetherStyles } from '../hooks/useAetherStyles'

/** --- twStyled() ----------------------------------------------------------------------------- */
/** -i- Provide a styled-components-like syntax for defining tailwind styles on cross-platform components
 ** Warning: Only works with tailwind classes, not CSS syntax -!-
 ** Partly inspired by https://github.com/nandorojo/moti/blob/master/packages/core/src/motify.tsx */
const twStyled = <Style, Props extends { style?: Style }, Ref, ExtraProps>(
  Component: ComponentType<Props>
) => {
  // Use higher order component to attach aether style support
  const withAetherTailwindClasses = (twLiterals: TemplateStringsArray) => {
    // Prepare tailwind classes to pre-apply
    const twStylesToPreApply = twLiterals.join(' ')
    // Turn into component with aether style support
    const Aetherified = forwardRef<
      Ref,
      Props & ExtraProps & TAetherStyleProps & { children?: React.ReactNode }
    >(function Aether({ tw, twID, style, ...props }, ref) {
      // -i- useAetherStyles() will add server-side media query support to avoid layout shift on web
      const allTwClasses = [twStylesToPreApply, tw].flat()
      const bindStyles = useAetherStyles({ tw: allTwClasses, twID, style: style as any, ...props }) // @ts-ignore
      return <Component {...props} {...(bindStyles as any)} ref={ref as any} />
    })
    // Apply updated display name
    Aetherified.displayName = `Aether.${Component?.displayName || Component?.name || 'NoName'}`
    // Return aetherified component
    return Aetherified
  }
  // Return function wrapper
  return withAetherTailwindClasses
}

/* --- Static Primitives ----------------------------------------------------------------------- */

twStyled.View = twStyled(AetherView)
twStyled.Text = twStyled(AetherText)
twStyled.Pressable = twStyled(AetherPressable)
twStyled.Image = twStyled(AetherImage)

/* --- HTML Elements --------------------------------------------------------------------------- */
// -i- Superset of @expo/html-elements for SEO, aetherspace & web friendly alternative primitives
// -i- See https://github.com/expo/expo/tree/master/packages/html-elements#components
// -i- Renders as semantic HTML on web & server, but as Text / View / etc. on mobile
// -i- Bringing the power of tailwind 'tw' prefixes & media query support to web

twStyled.Article = twStyled(HTML.Article)
twStyled.Aside = twStyled(HTML.Aside)

twStyled.B = twStyled(HTML.B)
twStyled.BlockQuote = twStyled(HTML.BlockQuote)
twStyled.BR = twStyled(HTML.BR)

twStyled.Caption = twStyled(HTML.Caption)
twStyled.Code = twStyled(HTML.Code)

twStyled.Del = twStyled(HTML.Del)
twStyled.EM = twStyled(HTML.EM)
twStyled.Footer = twStyled(HTML.Footer)

twStyled.H1 = twStyled(HTML.H1)
twStyled.H2 = twStyled(HTML.H2)
twStyled.H3 = twStyled(HTML.H3)
twStyled.H4 = twStyled(HTML.H4)
twStyled.H5 = twStyled(HTML.H5)
twStyled.H6 = twStyled(HTML.H6)

twStyled.Header = twStyled(HTML.Header)
twStyled.HR = twStyled(HTML.HR)
twStyled.I = twStyled(HTML.I)

twStyled.Main = twStyled(HTML.Main)
twStyled.Mark = twStyled(HTML.Mark)
twStyled.Nav = twStyled(HTML.Nav)

twStyled.P = twStyled(HTML.P)
twStyled.Pre = twStyled(HTML.Pre)
twStyled.Q = twStyled(HTML.Q)
twStyled.S = twStyled(HTML.S)

twStyled.Section = twStyled(HTML.Section)
twStyled.Strong = twStyled(HTML.Strong)

twStyled.Table = twStyled(HTML.Table)
twStyled.TBody = twStyled(HTML.TBody)
twStyled.TD = twStyled(HTML.TD)
twStyled.TFoot = twStyled(HTML.TFoot)
twStyled.TH = twStyled(HTML.TH)
twStyled.THead = twStyled(HTML.THead)
twStyled.TR = twStyled(HTML.TR)

twStyled.Time = twStyled(HTML.Time)
twStyled.UL = twStyled(HTML.UL)
twStyled.LI = twStyled(HTML.LI)

/* --- Exports --------------------------------------------------------------------------------- */

export { twStyled }
export default twStyled
