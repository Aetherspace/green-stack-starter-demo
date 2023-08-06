import { useEffect } from 'react'
import { Stack, SplashScreen } from 'expo-router'
// Layouts
import RootLayout from 'app/routes/layout'
// Config
import tailwindConfig from 'app/tailwind.config'
// Context
import { AetherContextManager } from 'aetherspace/context'
// Assets
import * as assets from 'registries/assets.generated'
// Hooks
import useLoadFonts from 'app/hooks/useLoadFonts'

/* --- Config ---------------------------------------------------------------------------------- */

SplashScreen.preventAutoHideAsync()

/* --- <ExpoRootLayout/> ----------------------------------------------------------------------- */

const ExpoRootLayout = () => {
  // Hide app when fonts not yet loaded
  const fontsLoaded = useLoadFonts()

  // -- Splash --

  useEffect(() => {
    // Hide the splash screen after the fonts have loaded and the UI is ready
    if (fontsLoaded) SplashScreen.hideAsync()
  }, [fontsLoaded])

  if (!fontsLoaded) return null

  // -- Render --

  return (
    <RootLayout>
      <AetherContextManager assets={assets} icons={{}} twConfig={tailwindConfig} isExpo isAppDir>
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: '#FFFFFF' },
            animation: 'slide_from_right',
          }}
        />
      </AetherContextManager>
    </RootLayout>
  )
}

/* --- Exports --------------------------------------------------------------------------------- */

export default ExpoRootLayout
