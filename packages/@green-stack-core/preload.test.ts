import { mock } from 'bun:test'

/* --- Mock Flow typed modules ----------------------------------------------------------------- */

// -i- We need aliases for these as they touch parts of react-native that ship Flow types
// -i- ...which typescript can't deal with.

mock.module('expo-constants', () => import('./__mocks__/expo-constants.mock'))
mock.module(require.resolve('expo-constants'), () => import('./__mocks__/expo-constants.mock')) // @ts-ignore
mock.module('react-native', () => import('react-native-web')) // @ts-ignore
mock.module(require.resolve('react-native'), () => import('react-native-web'))
