// https://docs.expo.dev/versions/latest/react-native/view/
// https://necolas.github.io/react-native-web/docs/view/
import React from 'react'
import { View, ViewProps, StyleProp, ViewStyle } from 'react-native'
// Hooks
import { useAetherStyles } from '../../hooks'

/* --- Types ----------------------------------------------------------------------------------- */

interface AetherViewType extends ViewProps {
  style?: StyleProp<ViewStyle>
  tw?: string | (string | null | undefined | false | 0)[]
  twID?: string
  children?: any | any[]
}

/* --- <AetherView/> --------------------------------------------------------------------------- */

const AetherView = (props: AetherViewType) => {
  // Styles
  const bindStyles = useAetherStyles<AetherViewType, typeof View, ViewStyle>(props)
  // Render
  return <View {...bindStyles} />
}

/* --- Exports --------------------------------------------------------------------------------- */

export default Object.assign(AetherView, {
  TYPE: undefined as unknown as AetherViewType,
})
