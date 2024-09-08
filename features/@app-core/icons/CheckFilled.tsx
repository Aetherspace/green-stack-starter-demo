import Svg, { Path } from 'react-native-svg'
import { cssInterop } from 'nativewind'
import { z, iconProps, IconProps } from '../schemas/IconProps'

/* --- Types ----------------------------------------------------------------------------------- */

export const CheckFilledProps = iconProps('CheckFilled', {
    color: z.string().default('#333333'),
})

export type CheckFilledProps = IconProps<typeof CheckFilledProps>

/* --- <CheckFilled/> -------------------------------------------------------------------------- */

export const CheckFilledBase = (rawProps: CheckFilledProps) => {
    // Props
    const props = CheckFilledProps.applyDefaults(rawProps)
    const color = CheckFilledProps.getIconColor(props)
    // Render
    return (
        <Svg width={props.size} height={props.size} fill="none" viewBox="0 0 24 24" {...props}>
            <Path
                fill={color}
                fillRule="evenodd"
                d="M1.293 12.033a1 1 0 0 1 1.414 0l6.13 6.13a1 1 0 1 1-1.414 1.414l-6.13-6.13a1 1 0 0 1 0-1.414Z"
                clipRule="evenodd"
            />
            <Path
                fill={color}
                fillRule="evenodd"
                d="M22.707 4.293a1 1 0 0 1 0 1.414l-13.87 13.87a1 1 0 0 1-1.414-1.414l13.87-13.87a1 1 0 0 1 1.414 0Z"
                clipRule="evenodd"
            />
        </Svg>
    )
}

/* --- Exports --------------------------------------------------------------------------------- */

export const CheckFilled = cssInterop(CheckFilledBase, {
    className: {
        target: 'style',
    },
})
