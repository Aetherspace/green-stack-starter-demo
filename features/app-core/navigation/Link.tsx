import { Link as ExpoLink } from 'expo-router'
import type { UniversalLinkProps } from './Link.types'
import { parseNativeWindStyles } from '../utils/parseNativeWindStyles'

/* --- <Link/> --------------------------------------------------------------------------------- */

export const Link = (props: UniversalLinkProps) => {
    // Props
    const {
        children,
        href,
        style,
        replace,
        onPress,
        target,
        asChild,
        push,
        testID,
        nativeID,
        allowFontScaling,
        numberOfLines,
        maxFontSizeMultiplier
    } = props

    // -- Nativewind --

    const { nativeWindStyles, restStyle } = parseNativeWindStyles(style)
    const finalStyle = { ...nativeWindStyles, ...restStyle }

    // -- Render --

    return (
        <ExpoLink
            href={href}
            style={finalStyle}
            onPress={onPress}
            target={target}
            asChild={asChild}
            replace={replace}
            push={push}
            testID={testID}
            nativeID={nativeID}
            allowFontScaling={allowFontScaling}
            numberOfLines={numberOfLines}
            maxFontSizeMultiplier={maxFontSizeMultiplier}
        >
            {children}
        </ExpoLink>
    )
}

