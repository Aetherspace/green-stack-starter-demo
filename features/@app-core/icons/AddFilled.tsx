import Svg, { Path } from 'react-native-svg'
import { cssInterop } from 'nativewind'
import { z, iconProps, IconProps } from '../schemas/IconProps'

/* --- Types ----------------------------------------------------------------------------------- */

export const AddFilledProps = iconProps('AddFilled', {
    color: z.string().default('#333333'),
})

export type AddFilledProps = IconProps<typeof AddFilledProps>

/* --- <AddFilled/> -------------------------------------------------------------------------- */

export const AddFilledBase = (rawProps: AddFilledProps) => {
    // Props
    const props = AddFilledProps.applyDefaults(rawProps)
    const color = AddFilledProps.getIconColor(props)
    // Render
    return (
        <Svg width={props.size} height={props.size} fill="none" viewBox="0 0 24 24" {...props}>
            <Path
                fill={color}
                fillRule="evenodd"
                d="M2 12C2 11.4477 2.44772 11 3 11H21C21.5523 11 22 11.4477 22 12C22 12.5523 21.5523 13 21 13H3C2.44772 13 2 12.5523 2 12Z"
                clipRule="evenodd"
            />
            <Path
                fill={color}
                fillRule="evenodd"
                d="M12 2C12.5523 2 13 2.44772 13 3V21C13 21.5523 12.5523 22 12 22C11.4477 22 11 21.5523 11 21V3C11 2.44772 11.4477 2 12 2Z"
                clipRule="evenodd"
            />
        </Svg>
    )
}

/* --- Exports --------------------------------------------------------------------------------- */

export const AddFilled = cssInterop(AddFilledBase, {
    className: {
        target: 'style',
    },
})
