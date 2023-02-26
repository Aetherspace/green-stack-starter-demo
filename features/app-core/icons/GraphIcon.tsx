import * as React from 'react'
import Svg, { Path } from 'react-native-svg'
import { aetherSchema } from 'aetherspace/schemas'
import { z } from 'zod'

/* --- Schema ---------------------------------------------------------------------------------- */

const GraphIconProps = aetherSchema('GraphIconProps', {
  width: z.number().optional().default(24).describe('Icon width'),
  height: z.number().optional().default(24).describe('Icon height'),
  // fill: z.string().color().optional().default('#e10098').describe('Icon fill color'),
  fill: z.string().optional().default('#e10098').describe('Icon fill color'),
})

/* --- <GraphIcon/> ----------------------------------------------------------------------------- */

const GraphIcon = (props: z.infer<typeof GraphIconProps>) => {
  // Props
  const svgProps = GraphIconProps.parse(props)
  // Render
  return (
    <Svg viewBox="0 0 134 134" {...svgProps}>
      <Path
        d="M-.43 12.534h22.901v1.187H-.43z"
        transform="rotate(-59.999 45.918 54.695) scale(4.16667)"
      />
      <Path d="M4.545 21.162h22.902v1.187H4.545z" transform="scale(4.16667)" />
      <Path
        d="M10.43 18.008h1.187v13.227H10.43z"
        transform="rotate(-59.999 45.93 102.593) scale(4.16667)"
      />
      <Path
        d="M20.381.771h1.187v13.227h-1.187z"
        transform="rotate(-59.999 87.393 30.767) scale(4.16667)"
      />
      <Path
        d="M4.412 6.787h13.227v1.187H4.412z"
        transform="rotate(-30.001 45.942 30.752) scale(4.16667)"
      />
      <Path
        d="M20.389 1.677h1.187v22.901h-1.187z"
        transform="rotate(-30.001 87.423 54.7) scale(4.16667)"
      />
      <Path
        d="M5.454 9.386h1.187v13.228H5.454zM25.36 9.386h1.187v13.228H25.36z"
        transform="scale(4.16667)"
      />
      <Path
        d="M15.222 24.097h11.504v1.037H15.222z"
        transform="rotate(-30.001 87.389 102.564) scale(4.16667)"
      />
      <Path
        d="M28.12 23a2.504 2.504 0 0 1-2.167 1.253 2.513 2.513 0 0 1-2.5-2.5c0-1.371 1.129-2.5 2.5-2.5a2.5 2.5 0 0 1 1.252.336A2.512 2.512 0 0 1 28.12 23M8.2 11.5a2.504 2.504 0 0 1-2.167 1.253 2.513 2.513 0 0 1-2.5-2.5c0-1.371 1.129-2.5 2.5-2.5a2.5 2.5 0 0 1 1.252.336A2.512 2.512 0 0 1 8.2 11.5M3.88 23a2.5 2.5 0 0 1-.336-1.252c0-1.371 1.129-2.5 2.5-2.5s2.5 1.129 2.5 2.5c0 .893-.479 1.721-1.253 2.167A2.512 2.512 0 0 1 3.88 23M23.8 11.5a2.5 2.5 0 0 1-.336-1.252c0-1.371 1.129-2.5 2.5-2.5s2.5 1.129 2.5 2.5c0 .893-.479 1.721-1.253 2.167A2.512 2.512 0 0 1 23.8 11.5M16 30a2.513 2.513 0 0 1-2.5-2.5c0-1.371 1.129-2.5 2.5-2.5s2.5 1.129 2.5 2.5v.007A2.504 2.504 0 0 1 16.007 30H16M16 6.991a2.513 2.513 0 0 1-2.5-2.5c0-1.371 1.129-2.5 2.5-2.5s2.5 1.129 2.5 2.5v.007a2.504 2.504 0 0 1-2.493 2.493H16"
        transform="scale(4.16667)"
      />
    </Svg>
  )
}

/* --- Docs ------------------------------------------------------------------------------------ */

export const getDocumentationProps = GraphIconProps.introspect()

/* --- Exports --------------------------------------------------------------------------------- */

export default GraphIcon
