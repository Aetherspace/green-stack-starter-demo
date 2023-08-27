// -i- Based on / inspired by
// - https://docs.expo.dev/versions/latest/react-native/pressable/
// - https://necolas.github.io/react-native-web/docs/pressable/
import React, { ComponentProps, forwardRef } from 'react'
import { View, Pressable } from 'react-native'
// Types
import { TAetherStyleProps, HitSlopProp, createStyleDocs } from '../../schemas/ats'
// Schemas
import { z, aetherSchema } from '../../schemas'
// Hooks
import { useAetherStyles } from '../../hooks'

/* --- Types ----------------------------------------------------------------------------------- */

type AetherPressableType = ComponentProps<typeof Pressable> &
  TAetherStyleProps & {
    style?: ComponentProps<typeof Pressable>['style']
  }

/* --- <AetherPressable/> ---------------------------------------------------------------------- */

const AetherPressable = forwardRef<View, AetherPressableType>((props, ref) => {
  // Styles
  const bindStyles = useAetherStyles<typeof Pressable>(props)
  // Render
  return <Pressable {...props} ref={ref} {...bindStyles} />
})

AetherPressable.displayName = 'AetherPressable'

/* --- Docs ------------------------------------------------------------------------------------ */

const d = {
  tw: createStyleDocs('', { styleOverrider: 'style' }),
  style: `https://reactnative.dev/docs/view-style-props`,
  delayLongPress: `Duration (in milliseconds) from onPressIn before onLongPress is called.`,
  disabled: `Whether the press behavior is disabled.`,
  pressRetentionOffset: `Additional distance outside of this view in which a touch is considered a press before onPressOut is triggered. Expects a Rect config like with HitSlop or number.`,
}

export const AetherPressableProps = aetherSchema('AetherPressableProps', {
  // - Aetherspace & Styling -
  tw: z.string().optional().eg('w-[120px] h-[30px] bg-blue-500 rounded-md').describe(d.tw),
  style: z.object({}).optional().describe(d.style),
  // - Frequently Used -
  delayLongPress: z.number().default(500).describe(d.delayLongPress),
  disabled: z.boolean().default(false).describe(d.disabled),
  hitSlop: HitSlopProp,
  pressRetentionOffset: z.number().default(20).describe(d.pressRetentionOffset),
})

export const getDocumentationProps = AetherPressableProps.introspect()

/* --- Exports --------------------------------------------------------------------------------- */

export default Object.assign(AetherPressable, {
  TYPE: undefined as unknown as AetherPressableType,
})
