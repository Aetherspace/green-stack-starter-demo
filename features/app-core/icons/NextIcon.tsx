import * as React from 'react'
import Svg, { Defs, LinearGradient, Stop, Circle, Mask, Use, G, Path } from 'react-native-svg'
import { ats } from 'aetherspace/schemas'

/* --- Schema ---------------------------------------------------------------------------------- */

const propSchema = ats.schema('NextIconProps', {
  width: ats.number().optional().default(24, 24, 'Icon width'),
  height: ats.number().optional().default(24, 24, 'Icon height'),
  fill: ats.color().optional().default('#000000', '#000000', 'Icon fill color'),
})

/* --- <NextIcon/> ----------------------------------------------------------------------------- */

const NextIcon = ({ fill = '#000000', ...props }) => (
  <Svg width={24} height={24} viewBox="0 0 256 256" fill={fill} {...props}>
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

/* --- Documentation --------------------------------------------------------------------------- */

export const getDocumentationProps = propSchema

/* --- Exports --------------------------------------------------------------------------------- */

export default NextIcon
