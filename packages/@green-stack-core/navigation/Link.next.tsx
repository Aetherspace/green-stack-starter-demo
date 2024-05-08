import NextLink from 'next/link'
import type { ComponentProps } from 'react'
import type { UniversalLinkProps } from './Link.types'
import { parseNativeWindStyles } from '../styles/parseNativeWindStyles'

/* --- <Link/> --------------------------------------------------------------------------------- */

export const Link = (props: UniversalLinkProps) => {
    // Props
    const {
        children,
        href,
        className,
        style,
        replace,
        onPress,
        target,
        scroll,
        shallow,
        passHref,
        prefetch,
        locale,
        as,
    } = props

    // -- Nativewind --

    const { nativeWindStyles, nativeWindClassName, restStyle } = parseNativeWindStyles(style)
    const finalStyle = { ...nativeWindStyles, ...restStyle } as React.CSSProperties

    // -- Render --

    return (
        <NextLink
            href={href}
            className={[className, nativeWindClassName].filter(Boolean).join(' ')}
            style={finalStyle as unknown as ComponentProps<typeof NextLink>['style']}
            onClick={onPress}
            target={target}
            replace={replace}
            scroll={scroll}
            shallow={shallow}
            passHref={passHref}
            prefetch={prefetch}
            locale={locale}
            as={as}
        >
            {children}
        </NextLink>
    )
}
