'use client'
// Primitives
import { Text, View } from 'aetherspace/primitives'
// Screens
// import { HomeScreen } from 'app/screens/HomeScreen'

/* --- /home ----------------------------------------------------------------------------------- */

const HomeRoute = () => (
  <View tw="absolute flex-1 w-full h-full bg-white items-center justify-center">
    <Text tw="text-2xl font-bold">Hello App 👋</Text>
  </View>
)

HomeRoute.displayName = 'HomeRoute'

/* --- Exports --------------------------------------------------------------------------------- */

export default HomeRoute
