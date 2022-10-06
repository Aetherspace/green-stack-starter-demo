import * as React from 'react'
import Svg, { Circle, G, Ellipse } from 'react-native-svg'
import { ats } from 'aetherspace/schemas'

/* --- Schema ---------------------------------------------------------------------------------- */

const propSchema = ats.schema('GraphIconProps', {
  width: ats.number().optional().default(24, 24, 'Icon width'),
  height: ats.number().optional().default(24, 24, 'Icon height'),
  fill: ats.color().optional().default('#61dafb', '#000000', 'Icon fill color'),
})

/* --- <GraphIcon/> ---------------------------------------------------------------------------- */

const GraphIcon = ({ fill = '#61dafb', ...props }) => (
  <Svg width={24} height={24} viewBox="-11.5 -10.23174 23 20.46348" fill={fill} {...props}>
    <Circle r={2.05} />
    {/* @ts-ignore */}
    <G stroke={fill} fill="none">
      <Ellipse rx={11} ry={4.2} />
      <Ellipse rx={11} ry={4.2} transform="rotate(60)" />
      <Ellipse rx={11} ry={4.2} transform="rotate(120)" />
    </G>
  </Svg>
)

/* --- Exports --------------------------------------------------------------------------------- */

export default Object.assign(GraphIcon, { propSchema })
