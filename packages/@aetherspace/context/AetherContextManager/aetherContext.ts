/* eslint-disable react-hooks/exhaustive-deps */
import { GraphQLSchema } from 'graphql'
import { createContext, FC } from 'react'
import { TextProps } from 'react-native'
import tailwind, { TwConfig, TailwindFn, RnColorScheme } from 'twrnc'

/* --- Types ----------------------------------------------------------------------------------- */

export interface NamedIconType extends TextProps {
  /**
   * Size of the icon, can also be passed as fontSize in the style object.
   *
   * @default 12
   */
  size?: number
  /**
   * Color of the icon
   *
   */
  color?: string
}

export interface IconProps<GLYPHS extends string> extends NamedIconType {
  /**
   * Name of the icon to show
   *
   * See Icon Explorer app
   * {@link https://expo.github.io/vector-icons/}
   */
  name: GLYPHS
}

export interface LinkContextType {
  [pagePath: string]: string
}

export interface AssetsType {
  [assetKey: string]: NodeRequire
}

export interface IconsType {
  [iconKey: string]: FC<NamedIconType> | FC<IconProps<string>>
}

export type BreakPointsType = {
  xs?: number
  sm?: number
  md?: number
  lg?: number
  xl?: number
  xxl?: number
}

export interface AetherContextType {
  assets: AssetsType
  icons: IconsType
  linkContext?: LinkContextType
  tw?: string
  style?: any
  isWeb?: boolean
  isExpo?: boolean
  isNextJS?: boolean
  isAppDir?: boolean
  isServer?: boolean
  isDesktop?: boolean
  isMobile?: boolean
  isAndroid?: boolean
  isIOS?: boolean
  isMobileWeb?: boolean
  isTabletWeb?: boolean
  isPhoneSize?: boolean
  isTabletSize?: boolean
  isLaptopSize?: boolean
  isStorybook?: boolean
  breakpoints?: BreakPointsType
  twPrefixes?: string[]
  mediaPrefixes?: string[]
  children?: any | any[]
  tailwind?: TailwindFn
  twConfig?: TwConfig
  colorScheme?: RnColorScheme
  toggleColorScheme?: () => void
  setColorScheme?: (scheme: RnColorScheme) => void
  importSchema?: () => Promise<GraphQLSchema>
}

/* --- AetherContext --------------------------------------------------------------------------- */

export const DEFAULT_AETHER_CONTEXT = { assets: {}, icons: {}, linkContext: {}, tailwind }
export const AetherContext = createContext<AetherContextType>(DEFAULT_AETHER_CONTEXT)
