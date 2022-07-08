import * as React from 'react'
import Svg, { Path } from 'react-native-svg'
import { ats } from 'aetherspace/schemas'

/* --- Schema ---------------------------------------------------------------------------------- */

const propSchema = ats.schema('BackIconProps', {
  width: ats.number().optional().default(24, 24, 'Icon width'),
  height: ats.number().optional().default(24, 24, 'Icon height'),
  fill: ats.color().optional().default('#FFFFFF', '#000000', 'Icon fill color'),
})

/* --- <BackIcon/> ----------------------------------------------------------------------------- */

const BackIcon = (props) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="#FFFFFF" xmlns="http://www.w3.org/2000/svg" {...props}>
    <Path d="M16 4V20L8 12L16 4Z" />
  </Svg>
)

/* --- Exports --------------------------------------------------------------------------------- */

export default Object.assign(BackIcon, { propSchema })
