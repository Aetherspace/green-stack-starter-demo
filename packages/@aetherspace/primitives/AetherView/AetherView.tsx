// -i- Based on / inspired by:
// - https://docs.expo.dev/versions/latest/react-native/view/
// - https://necolas.github.io/react-native-web/docs/view/
import React, { ComponentProps, forwardRef } from 'react'
import { View } from 'react-native'
// Types
import {
  AccessibilityProps,
  HitSlopProp,
  TAetherStyleProps,
  createStyleDocs,
} from '../../schemas/ats'
// Schemas
import { z, aetherSchema } from '../../schemas'
// Hooks
import { useAetherStyles } from '../../hooks/useAetherStyles'

/* --- Types ----------------------------------------------------------------------------------- */

type AetherViewType = ComponentProps<typeof View> &
  TAetherStyleProps & {
    style?: ComponentProps<typeof View>['style']
  }

/* --- <AetherView/> --------------------------------------------------------------------------- */

const AetherView = forwardRef<View, AetherViewType>((props, ref) => {
  // Styles
  const bindStyles = useAetherStyles<typeof View>(props)
  // Render
  return <View {...props} ref={ref} {...bindStyles} />
})

AetherView.displayName = 'AetherView'

/* --- Docs ------------------------------------------------------------------------------------ */

const d = {
  tw: createStyleDocs('', { styleOverrider: 'style' }),
  style: `https://reactnative.dev/docs/view-style-props`,
  accessibilityValue: `Represents the current value of a component. It can be a textual description of a component's value, or for range-based components, such as sliders and progress bars, it contains range information (minimum, current, and maximum).`,
  hitSlop: `This defines how far a touch event can start away from the view. Typical interface guidelines recommend touch targets that are at least 30 - 40 points/density-independent pixels.`,
  pointerEvents: `Controls whether the View can be the target of touch events.`,
  removeClippedSubviews: `This is a reserved performance property exposed by RCTView and is useful for scrolling content when there are many subviews, most of which are offscreen. For this property to be effective, it must be applied to a view that contains many subviews that extend outside its bound. The subviews must also have overflow: hidden, as should the containing view (or one of its superviews).`,
  testID: `Used to locate this view in end-to-end tests.`,
}

export const AetherViewProps = AccessibilityProps.extendSchema('AetherViewProps', {
  // - Aetherspace & Styling -
  tw: z.string().eg('bg-gray-200 w-[100px] h-[100px]').describe(d.tw),
  style: z.object({}).optional().describe(d.style),
  // - Frequently Used -
  hitSlop: HitSlopProp,
  pointerEvents: z.enum(['auto', 'none', 'box-none', 'box-only', ]).optional().describe(d.pointerEvents), // prettier-ignore
  accessibilityValue: aetherSchema('AccessibilityValue', {
    min: z.number().optional(),
    max: z.number().optional(),
  }).optional().describe(d.accessibilityValue), // prettier-ignore
  testID: z.string().optional().describe(d.testID),
  // - Optional Config -
  removeClippedSubviews: z.boolean().optional().describe(d.removeClippedSubviews), // prettier-ignore
})

export const getDocumentationProps = AetherViewProps.introspect()

/* --- Exports --------------------------------------------------------------------------------- */

export default Object.assign(AetherView, {
  TYPE: undefined as unknown as AetherViewType,
})
