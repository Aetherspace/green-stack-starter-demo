import * as React from 'react'
import Svg, { Path } from 'react-native-svg'
import { aetherSchema } from 'aetherspace/schemas'
import { z } from 'zod'

/* --- Schema ---------------------------------------------------------------------------------- */

const HomeIconProps = aetherSchema('HomeIconProps', {
  width: z.number().default(24).optional().describe('Icon width'),
  height: z.number().default(24).optional().describe('Icon height'),
  fill: z.string().default('#000000').optional().describe('Icon fill color'),
})

/* --- <HomeIcon/> ----------------------------------------------------------------------------- */

const HomeIcon = (props: z.infer<typeof HomeIconProps>) => {
  // Props
  const svgProps = HomeIconProps.parse(props)
  // Render
  return (
    <Svg viewBox="0 0 24 24" {...svgProps}>
      <Path
        d="M19 8.89L12 3 5 8.89V21c0 .55.45 1 1 1h12c.55 0 1-.45 1-1V8.89z"
        clipRule="evenodd"
      />
      <Path
        d="M16 2.5v3.87l3 2.52V2.5c0-.28-.22-.5-.5-.5h-2c-.28 0-.5.22-.5.5z"
        clipRule="evenodd"
      />
      <Path
        d="M11.356 2.235a1 1 0 011.288 0l9.5 8a1 1 0 01-1.288 1.53L12 4.307l-8.856 7.458a1 1 0 11-1.288-1.53l9.5-8z"
        clipRule="evenodd"
      />
    </Svg>
  )
}

/* --- Documentation --------------------------------------------------------------------------- */

export const getDocumentationProps = HomeIconProps.introspect()

/* --- Exports --------------------------------------------------------------------------------- */

export default HomeIcon
