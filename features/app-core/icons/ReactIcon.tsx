import * as React from 'react'
import Svg, { Circle, G, Ellipse } from 'react-native-svg'
import { ats, Infer } from 'aetherspace/schemas'

/* --- Schema ---------------------------------------------------------------------------------- */

const PropSchema = ats.schema('ReactIconProps', {
  width: ats.number().optional().default(24, 'Icon width'),
  height: ats.number().optional().default(24, 'Icon height'),
  fill: ats.color().optional().default('#61dafb', 'Icon fill color'),
})

/* --- <ReactIcon/> ---------------------------------------------------------------------------- */

const ReactIcon = ({ fill = '#61dafb', ...props }: Infer<typeof PropSchema>) => (
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

/* --- Documentation --------------------------------------------------------------------------- */

export const getDocumentationProps = PropSchema

/* --- Exports --------------------------------------------------------------------------------- */

export default ReactIcon
