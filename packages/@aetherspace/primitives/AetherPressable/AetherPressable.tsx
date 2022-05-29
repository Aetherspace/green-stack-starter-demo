// https://docs.expo.dev/versions/latest/react-native/pressable/
// https://necolas.github.io/react-native-web/docs/pressable/
import React, { ComponentProps, forwardRef } from 'react'
import { View, Pressable } from 'react-native'
// Hooks
import { useAetherStyles } from '../../hooks'

/* --- Types ----------------------------------------------------------------------------------- */

interface AetherPressableType extends ComponentProps<typeof Pressable> {
  style?: ComponentProps<typeof Pressable>['style']
  tw?: string | (string | null | undefined | false | 0)[]
  twID?: string
}

/* --- <AetherPressable/> ---------------------------------------------------------------------- */

const AetherPressable = forwardRef<View, AetherPressableType>((props, ref) => {
  // Styles
  const bindStyles = useAetherStyles<typeof Pressable>(props)
  // Render
  return <Pressable {...props} ref={ref} {...bindStyles} />
})

/* --- Exports --------------------------------------------------------------------------------- */

export default Object.assign(AetherPressable, {
  TYPE: undefined as unknown as AetherPressableType,
})
