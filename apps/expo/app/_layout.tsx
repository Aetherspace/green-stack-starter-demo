import { useEffect } from 'react'
import { Stack, SplashScreen } from 'expo-router'
import RootLayout from 'app/routes/layout'
import tailwindConfig from 'app/tailwind.config'
import { AetherContextManager } from 'aetherspace/context'
import * as assets from 'registries/assets.generated'
import useLoadFonts from 'app/hooks/useLoadFonts'
import { setGlobal } from 'aetherspace/utils'

/* --- Config ---------------------------------------------------------------------------------- */

SplashScreen.preventAutoHideAsync()

/* --- <AetherContextWrapper/> ----------------------------------------------------------------- */

const AetherContextWrapper = () => {
  // -- Effects --

  useEffect(() => {
    setGlobal('getAuthToken', undefined) // TODO: Add an auth resolver like Clerk
  }, [])

  // -- Render --

  return (
    <AetherContextManager
      assets={assets}
      icons={{}}
      twConfig={tailwindConfig}
      // getAuthToken={} // TODO: Add an auth resolver like Clerk
      isAppDir
      isExpo
    >
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: '#FFFFFF' },
          animation: 'slide_from_right',
        }}
      />
    </AetherContextManager>
  )
}

/* --- <ExpoRootLayout/> ----------------------------------------------------------------------- */

const ExpoRootLayout = () => {
  // Hide app when fonts not yet loaded
  const fontsLoaded = useLoadFonts()

  // -- Effects --

  useEffect(() => {
    // Hide the splash screen after the fonts have loaded and the UI is ready
    if (fontsLoaded) SplashScreen.hideAsync()
  }, [fontsLoaded])

  if (!fontsLoaded) return null

  // -- Render --

  return (
    <RootLayout>
      <AetherContextWrapper />
    </RootLayout>
  )
}

/* --- Exports --------------------------------------------------------------------------------- */

export default ExpoRootLayout
