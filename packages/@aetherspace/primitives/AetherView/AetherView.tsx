// -i- Based on / inspired by:
// - https://docs.expo.dev/versions/latest/react-native/view/
// - https://necolas.github.io/react-native-web/docs/view/
import React, { ComponentProps, forwardRef } from 'react'
import { View } from 'react-native'
// Schemas
import { TAetherStyleProps } from '../../schemas/ats'
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

/* --- Exports --------------------------------------------------------------------------------- */

export default Object.assign(AetherView, {
  TYPE: undefined as unknown as AetherViewType,
})
