import * as React from 'react'
import Svg, { Circle, G, Ellipse } from 'react-native-svg'
import { aetherSchema } from 'aetherspace/schemas'
import { z } from 'zod'

/* --- Schema ---------------------------------------------------------------------------------- */

const ReactIconProps = aetherSchema('ReactIconProps', {
  width: z.number().optional().default(24).describe('Icon width'),
  height: z.number().optional().default(24).describe('Icon height'),
  // fill: z.string().color().optional().default('#61dafb').describe('Icon fill color'),
  fill: z.string().optional().default('#61dafb').describe('Icon fill color'),
})

/* --- <ReactIcon/> ---------------------------------------------------------------------------- */

const ReactIcon = (props: z.infer<typeof ReactIconProps>) => {
  // Props
  const svgProps = ReactIconProps.parse(props)
  const { fill } = svgProps
  // Render
  return (
    <Svg viewBox="-11.5 -10.23174 23 20.46348" {...svgProps}>
      <Circle r={2.05} />
      {/* @ts-ignore */}
      <G stroke={fill} fill="none">
        <Ellipse rx={11} ry={4.2} />
        <Ellipse rx={11} ry={4.2} transform="rotate(60)" />
        <Ellipse rx={11} ry={4.2} transform="rotate(120)" />
      </G>
    </Svg>
  )
}

/* --- Documentation --------------------------------------------------------------------------- */

export const getDocumentationProps = ReactIconProps.introspect()

/* --- Exports --------------------------------------------------------------------------------- */

export default ReactIcon
