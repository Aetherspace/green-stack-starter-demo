// -i- Based on: https://github.com/axeldelafosse/expo-next-monorepo-example/blob/main/packages/expo/index.js
// import 'expo-dev-client';
// import 'expo-dev-launcher';
import 'expo/build/Expo.fx';
import 'expo/build/Expo.fx.web';
import { activateKeepAwakeAsync } from 'expo-keep-awake';

/* --- Start ----------------------------------------------------------------------------------- */
// -i- Expo Router setup
import 'expo-router/entry';

if (__DEV__) activateKeepAwakeAsync();
