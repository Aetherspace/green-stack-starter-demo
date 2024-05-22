import Constants from 'expo-constants'
import { Platform } from 'react-native'

/* --- Notes ----------------------------------------------------------------------------------- */

// -i- Workpacke package '@green-stack/core' expects this file to be at '/features/app-core/appConfig.ts'
// -i- Please keep it here to avoid issues

/* --- Computed Fallbacks ---------------------------------------------------------------------- */

export const isWebLocalhost = Platform.OS === 'web' && globalThis?.location?.hostname === 'localhost'
export const isExpoWebLocal = isWebLocalhost && globalThis?.location?.port === '8081'
export const fallbackExpoWebHost = isExpoWebLocal ? 'localhost' : ''

export const expoDebuggerHost = Constants?.expoGoConfig?.debuggerHost || Constants.manifest2?.extra?.expoGo?.debuggerHost // prettier-ignore
export const localURL = expoDebuggerHost?.split?.(':').shift() || fallbackExpoWebHost
export const isExpoMobileLocal = !!expoDebuggerHost

export const fallbackBaseURL = localURL ? `http://${localURL}:3000` : ''

/** --- appConfig ------------------------------------------------------------------------------ */
/** -i- App config variables powered by env vars universally, and including some expo contants config on mobile */
export const appConfig = {
    // - Flags -
    isLocal: isWebLocalhost || isExpoMobileLocal,
    isWebLocalhost,
    isExpoWebLocal,
    isExpoMobileLocal,
    // - Server URLs -
    baseURL: process.env.NEXT_PUBLIC_BASE_URL || process.env.EXPO_PUBLIC_BASE_URL || `${fallbackBaseURL}`, // prettier-ignore
    backendURL: process.env.NEXT_PUBLIC_BACKEND_URL || process.env.EXPO_PUBLIC_BACKEND_URL || `${fallbackBaseURL}`, // prettier-ignore
    apiURL: process.env.NEXT_PUBLIC_API_URL || process.env.EXPO_PUBLIC_API_URL || `${fallbackBaseURL}/api`, // prettier-ignore
    graphURL: process.env.NEXT_PUBLIC_GRAPH_URL || process.env.EXPO_PUBLIC_GRAPH_URL || `${fallbackBaseURL}/api/graphql`, // prettier-ignore
    // - Secrets -
    appSecret: process.env.APP_SECRET || process.env.APP_SECRET,
} as const

/* --- Debug ----------------------------------------------------------------------------------- */

if (Platform.OS !== 'web') {
    if (appConfig.baseURL === '') console.warn('appConfig.baseURL is empty, you may be missing some environment variables')
}
