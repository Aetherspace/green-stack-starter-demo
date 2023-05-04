import { ComponentProps } from 'react'
import { Text } from 'react-native'

/* --- Types ----------------------------------------------------------------------------------- */

export interface AetherLinkBaseType extends Partial<ComponentProps<typeof Text>> {
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

export interface AetherLinkToType extends AetherLinkBaseType {
  to: string
  href?: never
  routeName?: never
}
export interface AetherLinkHrefType extends AetherLinkBaseType {
  href: string
  to?: never
  routeName?: never
}
export interface AetherLinkRouteType extends AetherLinkBaseType {
  routeName: string
  to?: never
  href?: never
}

export type AetherLinkType = AetherLinkToType | AetherLinkHrefType | AetherLinkRouteType
