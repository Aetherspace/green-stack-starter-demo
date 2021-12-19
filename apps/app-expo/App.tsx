import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// Context
import AetherContextManager from '../../packages/@aetherspace/context/AetherContextManager';
// Screens
import HomeScreen from 'app/screens/HomeScreen';
import AuthorScreen from 'app/screens/AuthorScreen';
// Assets
import * as assets from './src/assets';

/* --- Navigation ------------------------------------------------------------------------------ */

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
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
  );
};

/* --- <App/> ---------------------------------------------------------------------------------- */

const App = () => {
  console.warn(Object.keys(assets));
  return (
    <AetherContextManager assets={assets} icons={{}}>
      <AppNavigator />
    </AetherContextManager>
  );
};

/* --- Exports --------------------------------------------------------------------------------- */

export default App;
