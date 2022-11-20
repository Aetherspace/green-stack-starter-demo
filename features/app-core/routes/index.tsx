import React from 'react'
// Primitives
import { Text, View } from 'aetherspace/primitives'
// Navigation
// import { useLink } from 'expo-router'
import { useAetherNav } from 'aetherspace/navigation'
// Screens
// import { HomeScreen } from 'app/screens/HomeScreen'

/* --- /index ---------------------------------------------------------------------------------- */

const HomeRoute = () => {
  // Hooks
  const { openLink } = useAetherNav()
  // const link = useLink()

  // -- Render --

  return (
    <View tw="flex flex-1 w-full h-full items-center justify-center">
      <Text
        tw="text-2xl roboto-bold"
        // onPress={() => link.push('/author')}
        onPress={() => openLink('/author')}
      >
        Hello Router 👋
      </Text>
    </View>
  )
}

/* --- Exports --------------------------------------------------------------------------------- */

export default HomeRoute
