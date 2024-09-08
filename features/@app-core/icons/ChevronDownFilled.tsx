import Svg, { Path } from 'react-native-svg'
import { cssInterop } from 'nativewind'
import { z, iconProps, IconProps } from '../schemas/IconProps'

/* --- Types ----------------------------------------------------------------------------------- */

export const ChevronDownFilledProps = iconProps('ChevronDownFilled', {
    color: z.string().default('#333333'),
})

export type ChevronDownFilledProps = IconProps<typeof ChevronDownFilledProps>

/* --- <ChevronDownFilled/> -------------------------------------------------------------------- */

const ChevronDownFilledBase = (rawProps: ChevronDownFilledProps) => {
    // Props
    const props = ChevronDownFilledProps.applyDefaults(rawProps)
    const color = ChevronDownFilledProps.getIconColor(props)
    // Render
    return (
        <Svg width={props.size} height={props.size} fill="none" viewBox="0 0 24 24" {...props}>
            <Path
                fill={color}
                fillRule="evenodd"
                d="M3.293 7.293a1 1 0 0 1 1.414 0L12 14.586l7.293-7.293a1 1 0 1 1 1.414 1.414l-8 8a1 1 0 0 1-1.414 0l-8-8a1 1 0 0 1 0-1.414Z"
                clipRule="evenodd"
            />
        </Svg>
    )
}

/* --- Exports --------------------------------------------------------------------------------- */

export const ChevronDownFilled = cssInterop(ChevronDownFilledBase, {
    className: {
        target: 'style',
    },
})
