import * as RNSVG from 'react-native-svg'
import { cssInterop } from 'nativewind'
import { extractCssVar, getThemeColor } from '@green-stack/utils/styleUtils'
import { z, schema } from '../schemas'

/* --- Nativewind Support ---------------------------------------------------------------------- */

export const Svg = cssInterop(RNSVG.Svg, {
    className: {
        target: 'style',
        nativeStyleToProp: { width: true, height: true }
    },
})

// @ts-ignore
export const Path = cssInterop(RNSVG.Path, {
    className: {
        target: 'style',
        nativeStyleToProp: { fill: true, color: true, stroke: true }
    }
})

export const Circle = cssInterop(RNSVG.Circle, {})

export const Ellipse = cssInterop(RNSVG.Ellipse, {})

export const Line = cssInterop(RNSVG.Line, {})

export const Rect = cssInterop(RNSVG.Rect, {})

export const Text = cssInterop(RNSVG.Text, {})

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
        const extractColor = () => {
            if (props.fill) return props.fill
            if (props.color) return props.color // @ts-ignore
            if (props.style?.color) return props.style.color // @ts-ignore
            if (Array.isArray(props.styles) && props.styles?.[0]?.color) return props.styles[0].color
        }
        const color = extractColor()
        if (color.includes('--')) {
            const cssVar = extractCssVar(color)
            if (cssVar) return getThemeColor(cssVar)
        }
        return defaults.fill || defaults.color || ''
    }
    // Return
    return Object.assign(IconProps, { getIconColor })
}

/* --- Types ----------------------------------------------------------------------------------- */

export type SvgProps = RNSVG.SvgProps

export const IconProps = iconProps('IconProps')

export type IconProps<
    Z extends { '_input': any$Unknown } = typeof IconProps,
    T = Z['_input']
> = SvgProps & T

/* --- Re-exports ------------------------------------------------------------------------------ */

export { z }
