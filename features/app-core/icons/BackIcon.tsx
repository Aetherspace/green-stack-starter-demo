import * as React from 'react'
import Svg, { Path } from 'react-native-svg'
import { z, aetherSchema, AetherProps } from 'aetherspace/schemas'

/* --- Schema ---------------------------------------------------------------------------------- */

const BackIconProps = aetherSchema('BackIconProps', {
  size: z.number().default(24).describe('Icon dimensions, maps to both width and height'),
  fill: z.string().color().default('#000000').describe('Icon fill color'),
})

/* --- <BackIcon/> ----------------------------------------------------------------------------- */

const BackIcon = (props: AetherProps<typeof BackIconProps>) => {
  // Props
  const { size, ...svgProps } = BackIconProps.applyDefaults(props)
  // Render
  return (
    <Svg viewBox="0 0 24 24" width={size} height={size} {...svgProps}>
      <Path d="M16 4V20L8 12L16 4Z" />
    </Svg>
  )
}

/* --- Documentation --------------------------------------------------------------------------- */

export const getDocumentationProps = BackIconProps.introspect()

/* --- Exports --------------------------------------------------------------------------------- */

export default BackIcon
