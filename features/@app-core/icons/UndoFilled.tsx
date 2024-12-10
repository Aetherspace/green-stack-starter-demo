import { Svg, Path, z, iconProps, IconProps, getThemeColor } from '@green-stack/svg'

/* --- Types ----------------------------------------------------------------------------------- */

export const UndoFilledProps = iconProps('UndoFilled', {
    color: z.string().default(getThemeColor('--primary')),
})

export type UndoFilledProps = IconProps<typeof UndoFilledProps>

/* --- <UndoFilled/> -------------------------------------------------------------------------- */

export const UndoFilled = (rawProps: UndoFilledProps) => {
    // Props
    const props = UndoFilledProps.applyDefaults(rawProps)
    const color = UndoFilledProps.getIconColor(props)
    // Render
    return (
        <Svg width={props.size} height={props.size} fill="none" viewBox="0 0 24 24" {...props}>
            <Path
                fill={color}
                fillRule="evenodd"
                d="M15.59 4.85C14.48 4.29 13.24 4 12 4C8.46 4 6.17 6.23 3.82 9.57C3.5 10.02 2.88 10.13 2.43 9.81C1.98 9.49 1.87 8.87 2.19 8.42C4.53 5.09 7.34 2 12 2C13.55 2 15.11 2.37 16.49 3.07C19.89 4.78 22 8.2 22 12C22 17.51 17.51 22 12 22C8.2 22 4.78 19.89 3.07 16.49C2.82 16 3.02 15.4 3.51 15.15C4 14.9 4.6 15.1 4.85 15.59C6.22 18.31 8.96 20 12 20C16.41 20 20 16.41 20 12C20 8.96 18.31 6.22 15.59 4.85Z"
                clipRule="evenodd"
            />
            <Path
                fill={color}
                fillRule="evenodd"
                d="M3 3C3.55 3 4 3.45 4 4V8H8C8.55 8 9 8.45 9 9C9 9.55 8.55 10 8 10H3C2.45 10 2 9.55 2 9V4C2 3.45 2.45 3 3 3Z"
                clipRule="evenodd"
            />
        </Svg>
    )
}
