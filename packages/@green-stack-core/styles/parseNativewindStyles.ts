
/** --- parseNativewindStyles() ---------------------------------------------------------------- */
/** -i- Util to extract Nativewind's style and/or className from a styled() components style prop */
export const parseNativewindStyles = (style: any) => {
    return Object.entries(style || {}).reduce(
        (acc, [key, value]) => {
            // If the key is unsupported, ignore it
            if (['mask', 'childClassNames'].includes(key)) return acc
            // If the key is a number, it's a Nativewind style
            if (Number.isInteger(Number(key))) {
                const isCSS = !!(value as Record<string, unknown>)['$$css']
                if (isCSS) {
                    // If it's a CSS object, add as a Nativewind className
                    const { '$$css': _, ...classNameObjects } = value as Record<string, unknown>
                    const className = [acc.nativeWindClassName, ...Object.values(classNameObjects)].filter(Boolean).join(' ') // prettier-ignore
                    return { ...acc, nativeWindClassName: className }
                } else if (Array.isArray(value)) {
                    // If it's an array, we should merge the arrays
                    const flattenedStyles = value.reduce((acc, val) => ({ ...acc, ...val }), {})
                    return { ...acc, nativeWindStyles: { ...acc.nativeWindStyles, ...flattenedStyles } } // prettier-ignore
                } else {
                    // If it's a React-Native style object, check if we should merge arrays or objects
                    return { ...acc, nativeWindStyles: { ...acc.nativeWindStyles, ...(value as Record<string, unknown>) } } // prettier-ignore       
                }
            }
            // If the key is a string, it's a regular style
            return { ...acc, restStyle: { ...acc.restStyle, [key]: value } }
        },
        { nativeWindStyles: {}, nativeWindClassName: '', restStyle: {} }
    )
}
