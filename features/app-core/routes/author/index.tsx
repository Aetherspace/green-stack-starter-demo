import React from 'react'
// Primitives
import { View } from 'aetherspace/primitives'
// Navigation
import { Link } from 'aetherspace/navigation'
// Screens
// import { AuthorScreen } from 'app/screens/AuthorScreen'

/* --- /screen --------------------------------------------------------------------------------- */

const AuthorRoute = () => {
  // -- Render --
  return (
    <View tw="absolute flex flex-1 w-full h-full items-center justify-center">
      <Link to="/" tw="text-2xl font-bold no-underline">
        Go back
      </Link>
    </View>
  )
}

/* --- Exports --------------------------------------------------------------------------------- */

export default AuthorRoute
