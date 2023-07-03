import * as React from 'react'
import Svg, { Circle, G, Ellipse } from 'react-native-svg'
import { z, aetherSchema, AetherProps } from 'aetherspace/schemas'

/* --- Schema ---------------------------------------------------------------------------------- */

const ReactIconProps = aetherSchema('ReactIconProps', {
  size: z.number().default(24).describe('Icon dimensions, maps to both width and height'),
  fill: z.string().color().default('#61dafb').describe('Icon fill color'),
})

/* --- <ReactIcon/> ---------------------------------------------------------------------------- */

const ReactIcon = (props: AetherProps<typeof ReactIconProps>) => {
  // Props
  const { size, ...svgProps } = ReactIconProps.applyDefaults(props)
  const { fill } = svgProps
  // Render
  return (
    <Svg viewBox="-11.5 -10.23174 23 20.46348" width={size} height={size} {...svgProps}>
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
