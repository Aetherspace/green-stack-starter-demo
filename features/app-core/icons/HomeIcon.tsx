import * as React from 'react'
import Svg, { Path } from 'react-native-svg'
import { ats, Infer } from 'aetherspace/schemas'

/* --- Schema ---------------------------------------------------------------------------------- */

const PropSchema = ats.schema('HomeIconProps', {
  width: ats.number().optional().default(24, 'Icon width'),
  height: ats.number().optional().default(24, 'Icon height'),
  fill: ats.color().optional().default('#FFFFFF', 'Icon fill color', '#000000'),
})

/* --- <HomeIcon/> ----------------------------------------------------------------------------- */

const HomeIcon = (props: Infer<typeof PropSchema>) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="#FFFFFF" {...props}>
    <Path d="M19 8.89L12 3 5 8.89V21c0 .55.45 1 1 1h12c.55 0 1-.45 1-1V8.89z" clipRule="evenodd" />
    <Path d="M16 2.5v3.87l3 2.52V2.5c0-.28-.22-.5-.5-.5h-2c-.28 0-.5.22-.5.5z" clipRule="evenodd" />
    <Path
      d="M11.356 2.235a1 1 0 011.288 0l9.5 8a1 1 0 01-1.288 1.53L12 4.307l-8.856 7.458a1 1 0 11-1.288-1.53l9.5-8z"
      clipRule="evenodd"
    />
  </Svg>
)

/* --- Documentation --------------------------------------------------------------------------- */

export const getDocumentationProps = PropSchema

/* --- Exports --------------------------------------------------------------------------------- */

export default HomeIcon
