import React from 'react'
// Primitives
import { View } from 'aetherspace/primitives'
// Navigation
import { Link } from 'aetherspace/navigation'
// Screens
// import { HomeScreen } from 'app/screens/HomeScreen'

/* --- /index ---------------------------------------------------------------------------------- */

const HomeRoute = () => {
  // -- Render --

  return (
    <View tw="flex flex-1 w-full h-full items-center justify-center">
      <Link to="/author" tw="text-2xl roboto-bold no-underline">
        Hello Router 👋
      </Link>
    </View>
  )
}

/* --- Exports --------------------------------------------------------------------------------- */

export default HomeRoute
