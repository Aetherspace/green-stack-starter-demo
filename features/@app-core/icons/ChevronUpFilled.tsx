import Svg, { Path } from 'react-native-svg'
import { cssInterop } from 'nativewind'
import { z, iconProps, IconProps } from '../schemas/IconProps'

/* --- Types ----------------------------------------------------------------------------------- */

export const ChevronUpFilledProps = iconProps('ChevronUpFilled', {
    color: z.string().default('#333333'),
})

export type ChevronUpFilledProps = IconProps<typeof ChevronUpFilledProps>

/* --- <ChevronUpFilled/> -------------------------------------------------------------------- */

const ChevronUpFilledBase = (rawProps: ChevronUpFilledProps) => {
    // Props
    const props = ChevronUpFilledProps.applyDefaults(rawProps)
    const color = ChevronUpFilledProps.getIconColor(props)
    // Render
    return (
        <Svg width={props.size} height={props.size} fill="none" viewBox="0 0 24 24" {...props}>
            <Path
                fill={color}
                fillRule="evenodd"
                d="M3.293 16.707a1 1 0 0 0 1.414 0L12 9.414l7.293 7.293a1 1 0 0 0 1.414-1.414l-8-8a1 1 0 0 0-1.414 0l-8 8a1 1 0 0 0 0 1.414Z"
                clipRule="evenodd"
            />
        </Svg>
    )
}

/* --- Exports --------------------------------------------------------------------------------- */

export const ChevronUpFilled = cssInterop(ChevronUpFilledBase, {
    className: {
        target: 'style',
    },
})
