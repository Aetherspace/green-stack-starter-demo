import Constants from 'expo-constants'

export const expoDebuggerHost = Constants?.manifest?.debuggerHost || Constants.manifest2?.extra?.expoGo?.debuggerHost // prettier-ignore
export const localURI = expoDebuggerHost?.split?.(':').shift()

export const expoEnv = Constants.expoConfig?.extra?.env || Constants.manifest2?.extra?.expoClient?.extra?.env // prettier-ignore
