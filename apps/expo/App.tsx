import React from 'react'
import { LogBox } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
// Config
import tailwindConfig from 'app/tailwind.config'
// Context
import { AetherContextManager } from 'aetherspace/context'
// Screens
import HomeScreen from 'app/screens/HomeScreen'
import AuthorScreen from 'app/screens/AuthorScreen'
// Assets
import * as assets from 'registries/assets.generated'
// Hooks
import useLoadFonts from 'app/hooks/useLoadFonts'

/* --- Ignore Errors --------------------------------------------------------------------------- */

LogBox.ignoreLogs([
  'Constants.platform.ios.model', // Comes from node_modules, nothing we can do about it
])

/* --- Navigation ------------------------------------------------------------------------------ */

const Stack = createStackNavigator()

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="/">
        <Stack.Screen
          name="/"
          navigationKey="/"
          component={HomeScreen}
          options={{ title: 'Home', headerShown: false }}
        />
        <Stack.Screen
          name="author"
          navigationKey="author"
          component={AuthorScreen}
          options={{ title: 'About the Author', headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

/* --- <App/> ---------------------------------------------------------------------------------- */

const App = () => {
  // Hide app when fonts not yet loaded
  const fontsLoaded = useLoadFonts()
  if (!fontsLoaded) return null

  // -- Render --

  return (
    <AetherContextManager assets={assets} icons={{}} twConfig={tailwindConfig}>
      <AppNavigator />
    </AetherContextManager>
  )
}

/* --- Exports --------------------------------------------------------------------------------- */

export default App
