// -i- Based on / inspired by
// - https://docs.expo.dev/versions/latest/react-native/pressable/
// - https://necolas.github.io/react-native-web/docs/pressable/
import React, { ComponentProps, forwardRef } from 'react'
import { View, Pressable } from 'react-native'
// Schemas
import { TAetherStyleProps } from '../../schemas/ats'
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

/* --- Exports --------------------------------------------------------------------------------- */

export default Object.assign(AetherPressable, {
  TYPE: undefined as unknown as AetherPressableType,
})
