// -i- Mocked to avoid using next/router in Storybook
import React from 'react'
import { useMemo } from 'react'
import { action } from '@storybook/addon-actions'
import { AetherText, AetherView } from '../../packages/@aetherspace/primitives'
import { getEnvVar } from '../../packages/@aetherspace/utils'

/* --- useAetherNav() -------------------------------------------------------------------------- */

export const useAetherNav = () => {
    // Vars
    const APP_LINKS = useMemo(() => getEnvVar('APP_LINKS')?.split('|') || [], [])
    const [webDomain] = APP_LINKS.filter((link) => link.includes('://'))

    // -- Handlers --

    const navigate = action('Navigate')

    const getDestination = (path) => {
        // Convert to relative path?
        const internalDomainMatch = APP_LINKS.find((appUrl) => path.includes(appUrl))
        if (internalDomainMatch) return path.replace(`${internalDomainMatch}/`, '')
        // Remove leading slash?
        const hasLeadingSlash = path !== '/' && path[0] === '/'
        return hasLeadingSlash ? path.slice(1) : path
    }

    const openLink = (path, isBlank) => action(`Open link ${path}`)()

    // -- Return --

    return {
        navigate,
        webDomain,
        getDestination,
        openLink,
    }
}

/* --- <AetherLink/> --------------------------------------------------------------------------- */

export const AetherLink = (props) => {
    // Props
    const { children, href, to, routeName, style, tw, twID, asText, ...restProps } = props
    const bindStyles = { style, tw, twID, ...restProps }

    // Hooks
    const { openLink, getDestination } = useAetherNav()
    const destination = getDestination(href || to || routeName)

    // Vars
    const isBlank = props.target === '_blank' || props.isBlank
    const isText = asText || props.isText || typeof children === 'string'

    // -- Handler --

    const onLinkPress = () => openLink(destination, isBlank)

    // -- Render as Text --

    if (isText) {
        return (
            <AetherText {...restProps} {...bindStyles} onPress={onLinkPress}>
                {children}
            </AetherText>
        )
    }

    // -- Render as Web link --

    return (
        <a href={destination} target="_blank">
            <AetherView {...bindStyles}>{children}</AetherView>
        </a>
    )
}

/* --- Exports --------------------------------------------------------------------------------- */

export const Link = AetherLink
