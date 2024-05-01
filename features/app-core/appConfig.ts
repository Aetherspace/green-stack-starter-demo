import Constants from 'expo-constants'
import { Platform } from 'react-native'

export const isLocalhost = Platform.OS === 'web' && globalThis?.location?.hostname === 'localhost'
export const isExpoWebLocal = isLocalhost && globalThis?.location?.port === '8081'
export const fallbackExpoWebHost = isExpoWebLocal ? "localhost" : ''

export const expoDebuggerHost = Constants?.expoGoConfig?.debuggerHost || Constants.manifest2?.extra?.expoGo?.debuggerHost // prettier-ignore
export const localURL = expoDebuggerHost?.split?.(':').shift() || fallbackExpoWebHost

export const fallbackBaseURL = localURL ? `http://${localURL}:3000` : ''

/** --- appConfig ------------------------------------------------------------------------------ */
/** -i- App config variables powered by env vars universally, and including some expo contants config on mobile */
export const appConfig = {
    isExpoWebLocal: isExpoWebLocal,
    baseURL: process.env.NEXT_PUBLIC_BASE_URL || process.env.EXPO_PUBLIC_BASE_URL || `${fallbackBaseURL}`, // prettier-ignore
    backendURL: process.env.NEXT_PUBLIC_BACKEND_URL || process.env.EXPO_PUBLIC_BACKEND_URL || `${fallbackBaseURL}`, // prettier-ignore
    apiURL: process.env.NEXT_PUBLIC_API_URL || process.env.EXPO_PUBLIC_API_URL || `${fallbackBaseURL}/api`, // prettier-ignore
    graphURL: process.env.NEXT_PUBLIC_GRAPH_URL || process.env.EXPO_PUBLIC_GRAPH_URL || `${fallbackBaseURL}/api/graphql`, // prettier-ignore
} as const

/* --- Debug ----------------------------------------------------------------------------------- */

if (Platform.OS !== 'web') {
    if (appConfig.baseURL === '') console.warn('appConfig.baseURL is empty, check your environment variables')
}
