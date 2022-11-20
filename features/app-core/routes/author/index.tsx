import React from 'react'
// Primitives
import { Text, View } from 'aetherspace/primitives'
// Navigation
// import { useLink } from 'expo-router'
import { useAetherNav } from 'aetherspace/navigation'
// Screens
// import { AuthorScreen } from 'app/screens/AuthorScreen'

/* --- /screen --------------------------------------------------------------------------------- */

const AuthorRoute = () => {
  // Hooks
  // const link = useLink()
  const { openLink, goBack } = useAetherNav()

  // -- Render --
  return (
    <View tw="absolute flex flex-1 w-full h-full items-center justify-center">
      <Text
        tw="text-2xl font-bold"
        // onPress={() => goBack()}
        onPress={() => openLink('/')}
        // onPress={() => link.push('/')}
      >
        Go back
      </Text>
    </View>
  )
}

/* --- Exports --------------------------------------------------------------------------------- */

export default AuthorRoute
