import React, { useState, useMemo, createContext, FC } from 'react'
import { View, Platform, Dimensions, TextProps } from 'react-native'
import tailwind, { create as createTailwindWithConfig, TwConfig, TailwindFn } from 'twrnc'
// Hooks
import { useLayoutInfo } from '../../hooks/useLayoutInfo'

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
  breakpoints?: BreakPointsType
  twPrefixes?: string[]
  mediaPrefixes?: string[]
  children?: any | any[]
  tailwind?: TailwindFn
  twConfig?: TwConfig
}

/* --- AetherContext --------------------------------------------------------------------------- */

export const DEFAULT_AETHER_CONTEXT = { assets: {}, icons: {}, linkContext: {} }
export const AetherContext = createContext<AetherContextType>(DEFAULT_AETHER_CONTEXT)

/* --- <AetherContextManager/> ----------------------------------------------------------------- */

const AetherContextManager = (props: AetherContextType) => {
  // Props
  const { children, isNextJS, isExpo, isDesktop, twConfig } = props

  // Layout
  const { layoutInfo, measureOnLayout } = useLayoutInfo()

  // Assets
  const assets = useMemo(() => props.assets || DEFAULT_AETHER_CONTEXT.assets, [])

  // Icons
  const icons = useMemo(() => props.icons || DEFAULT_AETHER_CONTEXT.icons, [])

  // Links (used for mobile navigation only)
  const linkContext = useMemo(() => props.linkContext || DEFAULT_AETHER_CONTEXT.linkContext, [])

  // Styles
  const [globalStyles, setGlobalStyles] = useState({})

  // -- Handlers --

  const registerStyles = (newStyles: Record<string, unknown>) => {
    return setGlobalStyles((currStyles) => ({ ...newStyles, ...currStyles }))
  }

  // -- ContextValue --

  const appWidth = layoutInfo.app?.width || Dimensions.get('window').width
  const appHeight = layoutInfo.app?.width || Dimensions.get('window').height

  const contextValue = useMemo(() => {
    const breakpoints = {
      sm: props.breakpoints?.sm || 640,
      md: props.breakpoints?.md || 768,
      lg: props.breakpoints?.lg || 1024,
      xl: props.breakpoints?.xl || 1280,
      xxl: props.breakpoints?.xxl || 1536,
      phones: 1,
      tablets: props.breakpoints?.md || 768,
      laptops: props.breakpoints?.lg || 1024,
    }
    const flags = {
      isWeb: Platform.OS === 'web',
      isMobile: Platform.OS !== 'web' && !isDesktop,
      isAndroid: Platform.OS === 'android',
      isIOS: Platform.OS === 'ios',
      isServer: Platform.OS === 'web' && typeof window === 'undefined',
      isXS: !!appWidth && appWidth < breakpoints.sm,
      isSM: !!appWidth && appWidth >= breakpoints.sm && appWidth < breakpoints.md,
      isMD: !!appWidth && appWidth >= breakpoints.md && appWidth < breakpoints.lg,
      isLG: !!appWidth && appWidth >= breakpoints.lg && appWidth < breakpoints.xl,
      isXL: !!appWidth && appWidth >= breakpoints.xl && appWidth < breakpoints.xxl,
      isXXL: !!appWidth && appWidth >= breakpoints.xxl,
      isMobileWeb: props.isMobileWeb,
      isTabletWeb: props.isTabletWeb,
      isPhoneSize: !!appWidth && appWidth < breakpoints.sm,
      isTabletSize: !!appWidth && appWidth >= breakpoints.sm && appWidth <= breakpoints.lg,
      isLaptopSize: !!appWidth && appWidth >= breakpoints.md,
    }
    const mediaPrefixObj = {
      sm: !!appWidth && appWidth >= breakpoints.sm,
      md: !!appWidth && appWidth >= breakpoints.md,
      lg: !!appWidth && appWidth >= breakpoints.lg,
      xl: !!appWidth && appWidth >= breakpoints.xl,
      xxl: !!appWidth && appWidth >= breakpoints.xxl,
      phones: flags.isPhoneSize || flags.isMobileWeb,
      tablets: flags.isTabletSize || flags.isTabletWeb,
      laptops: flags.isLaptopSize,
    }
    const twPrefixObj = {
      ...mediaPrefixObj,
      web: flags.isWeb,
      mobile: flags.isMobile,
      android: flags.isAndroid,
      ios: flags.isIOS,
      server: flags.isServer,
      next: isNextJS,
      expo: isExpo,
      desktop: isDesktop,
    }
    const twPrefixes = Object.entries(twPrefixObj)
      .filter(([, val]) => !!val)
      .map(([k]) => k)
    const mediaPrefixes = Object.keys(mediaPrefixObj)
    return {
      ...flags,
      assets,
      icons,
      linkContext,
      isNextJS,
      isExpo,
      isDesktop,
      breakpoints,
      twPrefixes,
      mediaPrefixes,
      styles: globalStyles,
      registerStyles,
      appWidth,
      appHeight,
      tailwind: twConfig ? createTailwindWithConfig(twConfig) : tailwind,
    }
  }, [Platform.OS, appWidth, typeof window === 'undefined'])

  // -- Render --

  return (
    <AetherContext.Provider value={contextValue}>
      <View
        style={{ ...props.style, ...contextValue.tailwind`${['w-full h-full', props.tw].filter(Boolean).join(' ')}` }}
        onLayout={measureOnLayout('app')}
      >
        {children}
      </View>
    </AetherContext.Provider>
  )
}

/* --- Exports --------------------------------------------------------------------------------- */

export default AetherContextManager
