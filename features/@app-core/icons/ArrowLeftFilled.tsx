import * as React from 'react'
import Svg, { Path } from 'react-native-svg'
import type { SvgProps } from 'react-native-svg'

/* --- Types ----------------------------------------------------------------------------------- */

type IconProps = SvgProps & { fill?: string; stroke?: string; size?: number }

/* --- <ArrowLeftFilled/> --------------------------------------------------------------------- */

export const ArrowLeftFilled = ({ size = 24, fill = '#333333', ...svgProps }: IconProps) => (
  <Svg width={size} height={size} fill="none" viewBox="0 0 24 24" {...svgProps}>
    <Path
      d="M10 6L4 12L10 18"
      stroke={fill}
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M20 12H4"
      stroke={fill}
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
)
