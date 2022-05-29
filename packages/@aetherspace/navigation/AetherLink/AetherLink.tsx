import React, { useMemo, forwardRef, ComponentProps } from 'react'
import { Platform } from 'react-native'
import { Link, useRouting } from 'expo-next-react-navigation'
import * as Linking from 'expo-linking'
import * as WebBrowser from 'expo-web-browser'
// Primitives
import { AetherView, AetherText } from '../../primitives'
// Utils
import { getEnvVar } from '../../utils'

/* --- Types ----------------------------------------------------------------------------------- */

interface AetherLinkBaseType extends Partial<ComponentProps<typeof Link>> {
  style?: ComponentProps<typeof Link>['style']
  tw?: string | (string | null | undefined | false | 0)[]
  twID?: string
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

/* --- useAetherNav() -------------------------------------------------------------------------- */

export const useAetherNav = () => {
  // Hooks
  const { navigate, ...expoNextReactNavRoutingResources } = useRouting()

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
    const isInternalLink = !destination.includes('://')
    const webDestination = isInternalLink && Platform.OS !== 'web' ? `${webDomain}${destination}` : path
    const isBrowserEnv = Platform.OS === 'web' && typeof window !== 'undefined' && !!window.open
    const openURL = isBrowserEnv ? (url: string) => window.open(url, '_blank') : Linking.openURL
    if (isInternalLink && !isBlank) return navigate({ routeName: destination })
    if (isBlank || isBrowserEnv) return openURL(webDestination) // "open in a new tab" or mobile browser
    WebBrowser.openBrowserAsync(webDestination) // Open external links in internal browser?
  }

  // -- Return --

  return {
    ...expoNextReactNavRoutingResources,
    navigate,
    webDomain,
    getDestination,
    openLink,
  }
}

/* --- <AetherLink/> --------------------------------------------------------------------------- */

const AetherLink = forwardRef<typeof Link | typeof Text, AetherLinkType>((props, ref) => {
  // Props
  const { children, href, to, routeName, style, tw, twID, asText, ...restProps } = props
  const bindStyles = { style, tw, twID, ...restProps }

  // Hooks
  const { openLink, getDestination } = useAetherNav()
  const destination = getDestination((href || to || routeName)!)

  // Vars
  const isBlank = props.target === '_blank' || props.isBlank
  const isText = asText || props.isText || typeof children === 'string'

  // -- Handler --

  const onLinkPress = () => openLink(destination, isBlank)

  // -- Render as Text --

  if (isText) {
    return (
      <AetherText {...restProps} {...bindStyles} ref={ref as any$Todo} onPress={onLinkPress}>
        {children}
      </AetherText>
    )
  }

  // -- Render as View --

  return (
    <Link
      {...restProps}
      routeName={destination}
      ref={ref as any$Todo}
      touchableOpacityProps={{ onPressIn: onLinkPress }}
    >
      <AetherView {...bindStyles}>{children}</AetherView>
    </Link>
  )
})

/* --- Exports --------------------------------------------------------------------------------- */

export default AetherLink
