import type { ComponentProps } from 'react'
import type { KnownRoutes } from '@app/registries/routeManifest.generated'
import type { UniversalLinkProps } from './Link.types'
import NextLink from 'next/link'
import { parseNativeWindStyles } from '../styles/parseNativeWindStyles'

/* --- <Link/> --------------------------------------------------------------------------------- */

export const Link = <
    HREF extends KnownRoutes
>(props: UniversalLinkProps<HREF>) => {
    // Props
    const {
        children,
        href,
        params = {},
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

    // -- Inject params? --

    const finalHref = Object.keys(params).reduce((acc, key) => {
        // Inject into [param] in href?
        const isRouteParam = acc.includes(`[${key}]`)
        if (isRouteParam) return acc.replace(`[${key}]`, params[key])
        // Inject as query param instead?
        return `${acc}${acc.includes('?') ? '&' : '?'}${key}=${params[key]}`
    }, href)

    // -- Nativewind --

    const { nativeWindStyles, nativeWindClassName, restStyle } = parseNativeWindStyles(style)
    const finalStyle = { ...nativeWindStyles, ...restStyle } as React.CSSProperties

    // -- Render --

    return (
        <NextLink
            href={finalHref}
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
