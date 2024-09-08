import type { SvgProps } from 'react-native-svg'
import { z, schema } from '@green-stack/schemas'

/* --- Schemas --------------------------------------------------------------------------------- */

const IconPropsBase = schema('IconProps', {
    size: z.number().optional(),
    fill: z.string().optional(),
    color: z.string().optional(),
    stroke: z.string().optional(),
    className: z.string().optional(),
})

/** --- iconProps() ---------------------------------------------------------------------------- */
/** -i- Builds the iconProps schema and attaches a util to extract the color from className */
export const iconProps = <S extends z.ZodRawShape>(iconName: string, override?: S) => {
    // Schema
    const IconProps = IconPropsBase.extendSchema(
        iconName,
        override || {}
    ) as z.ZodObject<typeof IconPropsBase['shape'] & S>
    // Utils
    const getIconColor = (props: SvgProps & z.infer<typeof IconPropsBase>): string => {
        const defaults = IconProps.applyDefaults(props as any$Todo)
        if (props.fill) return props.fill
        if (props.color) return props.color // @ts-ignore
        if (props.style?.color) return props.style.color // @ts-ignore
        if (Array.isArray(props.styles) && props.styles?.[0]?.color) return props.styles[0].color
        return defaults.fill || defaults.color || ''
    }
    // Return
    return Object.assign(IconProps, { getIconColor })
}

/* --- Types ----------------------------------------------------------------------------------- */

export const IconProps = iconProps('IconProps')

export type IconProps<
    Z extends { '_input': any$Unknown } = typeof IconProps,
    T = Z['_input']
> = SvgProps & T

/* --- Exports --------------------------------------------------------------------------------- */

export { z }
