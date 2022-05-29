// https://docs.expo.dev/versions/latest/react-native/view/
// https://necolas.github.io/react-native-web/docs/view/
import React, { ComponentProps, forwardRef } from 'react'
import { View } from 'react-native'
// Hooks
import { useAetherStyles } from '../../hooks/useAetherStyles'

/* --- Types ----------------------------------------------------------------------------------- */

interface AetherViewType extends ComponentProps<typeof View> {
  style?: ComponentProps<typeof View>['style']
  tw?: string | (string | null | undefined | false | 0)[]
  twID?: string
}

/* --- <AetherView/> --------------------------------------------------------------------------- */

const AetherView = forwardRef<View, AetherViewType>((props, ref) => {
  // Styles
  const bindStyles = useAetherStyles<typeof View>(props)
  // Render
  return <View {...props} ref={ref} {...bindStyles} />
})

/* --- Exports --------------------------------------------------------------------------------- */

export default Object.assign(AetherView, {
  TYPE: undefined as unknown as AetherViewType,
})
