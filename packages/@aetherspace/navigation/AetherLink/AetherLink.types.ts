import { ComponentProps } from 'react'
import { Text } from 'react-native'
// Schemas
import { TAetherStyleProps } from '../../schemas/ats'

/* --- Types ----------------------------------------------------------------------------------- */

export type AetherLinkBaseType = Partial<ComponentProps<typeof Text>> &
  TAetherStyleProps & {
    style?: ComponentProps<typeof Text>['style']
    asText?: boolean
    isText?: boolean
    isBlank?: boolean
    target?: string
    children?: any | any[] // TODO: Fix this
  }

export type AetherLinkToType = AetherLinkBaseType & {
  to: string
  href?: never
  routeName?: never
}
export type AetherLinkHrefType = AetherLinkBaseType & {
  href: string
  to?: never
  routeName?: never
}
export type AetherLinkRouteType = AetherLinkBaseType & {
  routeName: string
  to?: never
  href?: never
}

export type AetherLinkType = AetherLinkToType | AetherLinkHrefType | AetherLinkRouteType
