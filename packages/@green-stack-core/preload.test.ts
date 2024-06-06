import { mock } from 'bun:test'

/* --- Mock 'expo-constants' ------------------------------------------------------------------- */

const expoConstantsMock = {
    default: {
        expoGoConfig: {
            debuggerHost: 'localhost:19000',
        },
        manifest2: {
            extra: {
                expoGo: {
                    debuggerHost: 'localhost:19000',
                },
            },
        },
    }
}

mock.module('expo-constants', () => expoConstantsMock)
mock.module(require.resolve('expo-constants'), () => expoConstantsMock)

/* --- Mock 'react-native' --------------------------------------------------------------------- */

// @ts-ignore
mock.module('react-native', () => import('react-native-web'))
// @ts-ignore
mock.module(require.resolve('react-native'), () => import('react-native-web'))
