import Svg, { Path } from 'react-native-svg'
import { cssInterop } from 'nativewind'
import { z, iconProps, IconProps } from '../schemas/IconProps'

/* --- Types ----------------------------------------------------------------------------------- */

export const RemoveFilledProps = iconProps('RemoveFilled', {
    color: z.string().default('#333333'),
})

export type RemoveFilledProps = IconProps<typeof RemoveFilledProps>

/* --- <RemoveFilled/> -------------------------------------------------------------------------- */

export const RemoveFilledBase = (rawProps: RemoveFilledProps) => {
    // Props
    const props = RemoveFilledProps.applyDefaults(rawProps)
    const color = RemoveFilledProps.getIconColor(props)
    // Render
    return (
        <Svg width={props.size} height={props.size} fill="none" viewBox="0 0 24 24" {...props}>
            <Path
                fill={color}
                fillRule="evenodd"
                d="M2 12C2 11.4477 2.44772 11 3 11H21C21.5523 11 22 11.4477 22 12C22 12.5523 21.5523 13 21 13H3C2.44772 13 2 12.5523 2 12Z"
                clipRule="evenodd"
            />
        </Svg>
    )
}

/* --- Exports --------------------------------------------------------------------------------- */

export const RemoveFilled = cssInterop(RemoveFilledBase, {
    className: {
        target: 'style',
    },
})
