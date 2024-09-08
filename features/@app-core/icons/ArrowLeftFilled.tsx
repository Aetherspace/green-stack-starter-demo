import Svg, { Path } from 'react-native-svg'
import { cssInterop } from 'nativewind'
import { z, iconProps, IconProps } from '../schemas/IconProps'

/* --- Types ----------------------------------------------------------------------------------- */

export const ArrowLeftFilledProps = iconProps('ArrowLeftFilled', {
  color: z.string().default('#333333'),
})

export type ArrowLeftFilledProps = IconProps<typeof ArrowLeftFilledProps>

/* --- <ArrowLeftFilled/> ---------------------------------------------------------------------- */

const ArrowLeftFilledBase = (rawProps: ArrowLeftFilledProps) => {
    // Props
    const props = ArrowLeftFilledProps.applyDefaults(rawProps)
    const color = ArrowLeftFilledProps.getIconColor(props)
    // Render
    return (
        <Svg width={props.size} height={props.size} fill="none" viewBox="0 0 24 24" {...props}>
            <Path
                d="M10 6L4 12L10 18"
                stroke={color}
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <Path
                d="M20 12H4"
                stroke={color}
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </Svg>
    )
}

/* --- Exports --------------------------------------------------------------------------------- */

export const ArrowLeftFilled = cssInterop(ArrowLeftFilledBase, {
    className: {
        target: 'style',
    },
})
