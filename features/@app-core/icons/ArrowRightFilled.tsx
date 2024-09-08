import Svg, { Path } from 'react-native-svg'
import { cssInterop } from 'nativewind'
import { z, iconProps, IconProps } from '../schemas/IconProps'

/* --- Types ----------------------------------------------------------------------------------- */

export const ArrowRightFilledProps = iconProps('ArrowRightFilled', {
    color: z.string().default('#333333'),
})

export type ArrowRightFilledProps = IconProps<typeof ArrowRightFilledProps>

/* --- <ArrowRightFilled/> --------------------------------------------------------------------- */

const ArrowRightFilledBase = (rawProps: ArrowRightFilledProps) => {
    // Props
    const props = ArrowRightFilledProps.applyDefaults(rawProps)
    const color = ArrowRightFilledProps.getIconColor(rawProps)
    // Render
    return (
        <Svg width={props.size} height={props.size} fill="none" viewBox="0 0 24 24" {...props}>
            <Path
                d="M14 6L20 12L14 18"
                stroke={color}
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <Path
                d="M4 12H20"
                stroke={color}
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </Svg>
    )
}

/* --- Exports --------------------------------------------------------------------------------- */

export const ArrowRightFilled = cssInterop(ArrowRightFilledBase, {
    className: {
        target: 'style',
    },
})
