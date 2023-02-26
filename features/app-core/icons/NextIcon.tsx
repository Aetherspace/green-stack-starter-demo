import * as React from 'react'
import Svg, { Defs, LinearGradient, Stop, Circle, Mask, Use, G, Path } from 'react-native-svg'
import { aetherSchema } from 'aetherspace/schemas'
import { z } from 'zod'

/* --- Schema ---------------------------------------------------------------------------------- */

const NextIconProps = aetherSchema('NextIconProps', {
  width: z.number().optional().default(24).describe('Icon width'),
  height: z.number().optional().default(24).describe('Icon height'),
  // fill: z.string().color().optional().default('#000000').describe('Icon fill color'),
  fill: z.string().optional().default('#000000').describe('Icon fill color'),
})

/* --- <NextIcon/> ----------------------------------------------------------------------------- */

const NextIcon = (props: z.infer<typeof NextIconProps>) => {
  // Props
  const svgProps = NextIconProps.parse(props)
  // Render
  return (
    <Svg viewBox="0 0 256 256" {...svgProps}>
      <Defs>
        {/* @ts-ignore */}
        <LinearGradient x1="55.633%" y1="56.385%" x2="83.228%" y2="96.08%" id="c">
          <Stop stopColor="#FFF" offset="0%" />
          <Stop stopColor="#FFF" stopOpacity={0} offset="100%" />
        </LinearGradient>
        {/* @ts-ignore */}
        <LinearGradient x1="50%" y1="0%" x2="49.953%" y2="73.438%" id="d">
          <Stop stopColor="#FFF" offset="0%" />
          <Stop stopColor="#FFF" stopOpacity={0} offset="100%" />
        </LinearGradient>
        <Circle id="a" cx={128} cy={128} r={128} />
      </Defs>
      {/* @ts-ignore */}
      <Mask id="b" fill="#fff">
        <Use xlinkHref="#a" />
      </Mask>
      {/* @ts-ignore */}
      <G mask="url(#b)">
        <Circle cx={128} cy={128} r={128} />
        <Path
          d="M212.634 224.028 98.335 76.8H76.8v102.357h17.228V98.68L199.11 234.446a128.433 128.433 0 0 0 13.524-10.418Z"
          fill="url(#c)"
        />
        <Path fill="url(#d)" d="M163.556 76.8h17.067v102.4h-17.067z" />
      </G>
    </Svg>
  )
}

/* --- Documentation --------------------------------------------------------------------------- */

export const getDocumentationProps = NextIconProps.introspect()

/* --- Exports --------------------------------------------------------------------------------- */

export default NextIcon
