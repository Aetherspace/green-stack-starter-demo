'use client'
// Primitives
import { Text, View } from 'aetherspace/primitives'
// Screens
// import { HomeScreen } from 'app/screens/HomeScreen'

/* --- /home ----------------------------------------------------------------------------------- */

const HomeRoute = () => (
  <View tw="absolute flex flex-1 w-full h-full items-center justify-center">
    <Text tw="text-2xl font-bold">Hello App 👋</Text>
  </View>
)

HomeRoute.displayName = 'HomeRoute'

/* --- Exports --------------------------------------------------------------------------------- */

export default HomeRoute
