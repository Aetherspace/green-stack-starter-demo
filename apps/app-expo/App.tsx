import React from 'react'
import { LogBox } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
// Context
import AetherContextManager from '../../packages/@aetherspace/context/AetherContextManager'
// Screens
import HomeScreen from 'app/screens/HomeScreen'
import AuthorScreen from 'app/screens/AuthorScreen'
// Assets
import * as assets from 'app/assets.generated'
// Hooks
import useLoadFonts from 'app/hooks/useLoadFonts'

/* --- Ignore Errors --------------------------------------------------------------------------- */

LogBox.ignoreLogs([
  'Constants.platform.ios.model', // Comes from node_modules, nothing we can do about it
])

/* --- Navigation ------------------------------------------------------------------------------ */

const Stack = createNativeStackNavigator()

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
    <AetherContextManager assets={assets} icons={{}}>
      <AppNavigator />
    </AetherContextManager>
  )
}

/* --- Exports --------------------------------------------------------------------------------- */

export default App
