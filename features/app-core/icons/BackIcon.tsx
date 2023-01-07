import * as React from 'react'
import Svg, { Path } from 'react-native-svg'
import { aetherSchema } from 'aetherspace/schemas'
import { z } from 'zod'

/* --- Schema ---------------------------------------------------------------------------------- */

const BackIconProps = aetherSchema('BackIconProps', {
  width: z.number().default(24).optional().describe('Icon width'),
  height: z.number().default(24).optional().describe('Icon height'),
  fill: z.string().default('#000000').optional().describe('Icon fill color'),
})

/* --- <BackIcon/> ----------------------------------------------------------------------------- */

const BackIcon = (props: z.infer<typeof BackIconProps>) => {
  // Props
  const svgProps = BackIconProps.parse(props)
  // Render
  return (
    <Svg viewBox="0 0 24 24" {...svgProps}>
      <Path d="M16 4V20L8 12L16 4Z" />
    </Svg>
  )
}

/* --- Documentation --------------------------------------------------------------------------- */

export const getDocumentationProps = BackIconProps.introspect()

/* --- Exports --------------------------------------------------------------------------------- */

export default BackIcon
