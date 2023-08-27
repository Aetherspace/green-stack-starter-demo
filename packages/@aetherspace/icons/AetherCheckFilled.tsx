import * as React from 'react'
import Svg, { Path } from 'react-native-svg'
import type { SvgProps } from 'react-native-svg'

/* --- Types ----------------------------------------------------------------------------------- */

type IconProps = SvgProps & { fill?: string; stroke?: string; size?: number }

/* --- <CheckFilled/> -------------------------------------------------------------------------- */

export const AetherCheckFilled = ({ size = 24, fill = '#333333', ...svgProps }: IconProps) => (
  <Svg width={size} height={size} fill="none" viewBox="0 0 24 24" {...svgProps}>
    <Path
      fill={fill}
      fillRule="evenodd"
      d="M1.293 12.033a1 1 0 0 1 1.414 0l6.13 6.13a1 1 0 1 1-1.414 1.414l-6.13-6.13a1 1 0 0 1 0-1.414Z"
      clipRule="evenodd"
    />
    <Path
      fill={fill}
      fillRule="evenodd"
      d="M22.707 4.293a1 1 0 0 1 0 1.414l-13.87 13.87a1 1 0 0 1-1.414-1.414l13.87-13.87a1 1 0 0 1 1.414 0Z"
      clipRule="evenodd"
    />
  </Svg>
)
