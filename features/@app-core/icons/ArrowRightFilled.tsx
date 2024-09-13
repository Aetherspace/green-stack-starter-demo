import { Svg, Path, z, iconProps, IconProps, getThemeColor } from '@green-stack/svg'

/* --- Types ----------------------------------------------------------------------------------- */

export const ArrowRightFilledProps = iconProps('ArrowRightFilled', {
    color: z.string().default(getThemeColor('--primary')),
})

export type ArrowRightFilledProps = IconProps<typeof ArrowRightFilledProps>

/* --- <ArrowRightFilled/> --------------------------------------------------------------------- */

export const ArrowRightFilled = (rawProps: ArrowRightFilledProps) => {
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
