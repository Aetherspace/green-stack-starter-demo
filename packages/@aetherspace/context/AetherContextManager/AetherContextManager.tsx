/* eslint-disable react-hooks/exhaustive-deps */
import React, { useMemo, useEffect } from 'react'
import { View, Platform, Dimensions } from 'react-native'
import tailwind, { create as createTailwindWithConfig } from 'twrnc'
// Context
import { AetherContext, DEFAULT_AETHER_CONTEXT, AetherContextType } from './aetherContext'
// Hooks
import { useLayoutInfo } from '../../hooks/useLayoutInfo'
// Utils
import { setGlobal } from '../../utils'

/* --- <AetherContextManager/> ----------------------------------------------------------------- */

const AetherContextManager = (props: AetherContextType) => {
  // Props
  const { children, isNextJS, isExpo, isAppDir, isDesktop, isStorybook, twConfig } = props

  // Layout
  const { layoutInfo, measureOnLayout } = useLayoutInfo()

  // Assets
  const assets = useMemo(() => props.assets || DEFAULT_AETHER_CONTEXT.assets, [])

  // Icons
  const icons = useMemo(() => props.icons || DEFAULT_AETHER_CONTEXT.icons, [])

  // Links (used for mobile navigation only)
  const linkContext = useMemo(() => props.linkContext || DEFAULT_AETHER_CONTEXT.linkContext, [])

  // -- DidMount --

  useEffect(() => {
    if (isStorybook) setGlobal('IS_STORYBOOK', true)
  }, [])

  // -- ContextValue --

  const appWidth = layoutInfo.app?.width || Dimensions.get('window').width
  const appHeight = layoutInfo.app?.width || Dimensions.get('window').height

  const contextValue = useMemo(() => {
    const breakpoints = {
      xs: props.breakpoints?.xs || 320,
      sm: props.breakpoints?.sm || 576,
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
      isMobileWeb: !!props.isMobileWeb,
      isTabletWeb: !!props.isTabletWeb,
      isPhoneSize: !!appWidth && appWidth < breakpoints.sm,
      isTabletSize: !!appWidth && appWidth >= breakpoints.sm && appWidth <= breakpoints.lg,
      isLaptopSize: !!appWidth && appWidth >= breakpoints.md,
      isStorybook,
    }
    const mediaPrefixObj = {
      xs: !!appWidth && appWidth >= breakpoints.xs,
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
      app: isAppDir,
      desktop: isDesktop,
      docs: isStorybook,
    }
    const twPrefixes = Object.entries(twPrefixObj).filter(([, val]) => !!val).map(([k]) => k) // prettier-ignore
    const mediaPrefixes = Object.keys(mediaPrefixObj)
    return {
      ...flags,
      assets,
      icons,
      linkContext,
      isNextJS,
      isExpo,
      isAppDir,
      isDesktop,
      isStorybook,
      breakpoints,
      twPrefixes,
      mediaPrefixes,
      // styles: globalStyles,
      // registerStyles,
      appWidth,
      appHeight,
      tailwind: twConfig ? createTailwindWithConfig(twConfig) : tailwind,
      importSchema: props.importSchema,
    }
  }, [Platform.OS, appWidth, typeof window === 'undefined'])

  // -- Render --

  return (
    <AetherContext.Provider value={contextValue}>
      <View
        style={{
          ...props.style,
          ...contextValue.tailwind`${['flex min-h-full min-w-full', props.tw].filter(Boolean).join(' ')}`, // prettier-ignore
        }}
        onLayout={measureOnLayout('app')}
      >
        {children}
      </View>
    </AetherContext.Provider>
  )
}

/* --- Exports --------------------------------------------------------------------------------- */

export default AetherContextManager
