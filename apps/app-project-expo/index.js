// -i- Based on: https://github.com/axeldelafosse/expo-next-monorepo-example/blob/main/packages/expo/index.js
// import 'expo-dev-client';
// import 'expo-dev-launcher';
import 'expo/build/Expo.fx';
import 'expo/build/Expo.fx.web';
import { activateKeepAwake } from 'expo-keep-awake';
// -i- Based on: ../node_modules/expo/AppEntry.js
import { registerRootComponent } from 'expo';
import App from './App';

/* --- Start ----------------------------------------------------------------------------------- */

if (__DEV__) activateKeepAwake();
registerRootComponent(App);
