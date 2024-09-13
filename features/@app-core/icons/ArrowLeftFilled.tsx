import { Svg, Path, z, iconProps, IconProps, getThemeColor } from '@green-stack/svg'

/* --- Types ----------------------------------------------------------------------------------- */

export const ArrowLeftFilledProps = iconProps('ArrowLeftFilled', {
    color: z.string().default(getThemeColor('--primary')),
})

export type ArrowLeftFilledProps = IconProps<typeof ArrowLeftFilledProps>

/* --- <ArrowLeftFilled/> ---------------------------------------------------------------------- */

export const ArrowLeftFilled = (rawProps: ArrowLeftFilledProps) => {
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
