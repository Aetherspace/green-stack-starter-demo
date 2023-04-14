// @ts-ignore
import React, { useMemo, forwardRef, ComponentProps } from 'react'
import { Platform, Text } from 'react-native'
import NextLink from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import * as Linking from 'expo-linking'
import * as WebBrowser from 'expo-web-browser'
// Primitives
import { AetherView, AetherText } from '../../primitives'
// Utils
import { getEnvVar } from '../../utils'

/* --- Types ----------------------------------------------------------------------------------- */

interface AetherLinkBaseType extends Partial<ComponentProps<typeof Text>> {
  style?: ComponentProps<typeof Text>['style']
  tw?: string | (string | null | undefined | false | 0)[]
  twID?: string
  class?: string | (string | null | undefined | false | 0)[]
  className?: string | (string | null | undefined | false | 0)[]
  asText?: boolean
  isText?: boolean
  isBlank?: boolean
  target?: string
  children?: any | any[] // TODO: Fix this
}

interface AetherLinkToType extends AetherLinkBaseType {
  to: string
  href?: never
  routeName?: never
}
interface AetherLinkHrefType extends AetherLinkBaseType {
  href: string
  to?: never
  routeName?: never
}
interface AetherLinkRouteType extends AetherLinkBaseType {
  routeName: string
  to?: never
  href?: never
}

type AetherLinkType = AetherLinkToType | AetherLinkHrefType | AetherLinkRouteType
type any$Todo = any

/* --- Helpers --------------------------------------------------------------------------------- */

const linkResetStyles = {
  textDecoration: 'none',
  color: 'inherit',
  cursor: 'pointer',
}

/* --- useAetherNav() -------------------------------------------------------------------------- */

export const useAetherNav = () => {
  // Hooks
  const router = useRouter()
  const pathname = usePathname()

  // Vars
  const APP_LINKS: string[] = useMemo(() => getEnvVar('APP_LINKS')?.split('|') || [], [])
  const [webDomain] = APP_LINKS.filter((link) => link.includes('://'))

  // -- Handlers --

  const getDestination = (path: string) => {
    // Convert to relative path?
    const internalDomainMatch = APP_LINKS.find((appUrl) => path.includes(appUrl))
    if (internalDomainMatch) return path.replace(`${internalDomainMatch}/`, '')
    // Remove leading slash?
    const hasLeadingSlash = path !== '/' && path[0] === '/'
    return hasLeadingSlash ? path.slice(1) : path
  }

  const openLink = (path: string, isBlank = false) => {
    const destination = getDestination(path)
    const isInternalLink = !destination.includes('://') && !destination.includes('api/')
    const isWeb = Platform.OS !== 'web'
    const webDestination = isInternalLink && isWeb ? `${webDomain}${destination}` : path
    const isBrowserEnv = Platform.OS === 'web' && typeof window !== 'undefined' && !!window.open
    const openURL = isBrowserEnv ? (url: string) => window.open(url, '_blank') : Linking.openURL
    if (isInternalLink && !isBlank) return router.push(destination)
    if (isBlank || isBrowserEnv) return openURL(webDestination) // "open in a new tab" or mobile browser
    WebBrowser.openBrowserAsync(webDestination) // Open external links in internal browser?
  }

  const goBack = () => router.back()

  // -- Return --

  return {
    pathname,
    webDomain,
    getDestination,
    openLink,
    goBack,
  }
}

/* --- <AetherLink/> --------------------------------------------------------------------------- */

const AetherLink = forwardRef<typeof Text | typeof Text, AetherLinkType>((props, ref) => {
  // Props
  const { children, href, to, routeName, style, tw, twID, asText, ...restProps } = props
  const bindStyles = { style, tw, twID, ...restProps }

  // Hooks
  const { openLink, getDestination } = useAetherNav()
  const destination = getDestination((href || to || routeName)!)

  // Vars
  const isBlank = props.target === '_blank' || props.isBlank
  const isText = asText || props.isText || typeof children === 'string'
  const isExternal = destination.includes('://') || destination.includes('api/')

  // -- Handler --

  const onLinkPress = () => openLink(destination, isBlank)

  // -- Render as Web link --

  if (isExternal) {
    return isText ? (
      <AetherText {...restProps} {...bindStyles} ref={ref as any$Todo} onPress={onLinkPress}>
        <a href={destination} target="_blank" rel="noreferrer" style={linkResetStyles}>
          {children}
        </a>
      </AetherText>
    ) : (
      <a href={destination} target="_blank" rel="noreferrer" style={linkResetStyles}>
        <AetherView {...bindStyles}>{children}</AetherView>
      </a>
    )
  }

  // -- Render as Text --

  if (isText) {
    return (
      <AetherText {...restProps} {...bindStyles} ref={ref as any$Todo} onPress={onLinkPress}>
        <NextLink href={destination} style={linkResetStyles}>
          {children}
        </NextLink>
      </AetherText>
    )
  }

  // -- Render as View wrapped with Next Link --

  return (
    <NextLink href={destination} style={linkResetStyles}>
      <AetherView {...bindStyles}>{children}</AetherView>
    </NextLink>
  )
})

AetherLink.displayName = 'AetherLink'

/* --- Exports --------------------------------------------------------------------------------- */

export default AetherLink
