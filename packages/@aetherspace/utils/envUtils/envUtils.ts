import Constants from 'expo-constants'

/* --- getDebuggerURL() ---------------------------------------------------------------------------- */
// -i- Get the IP based URL with specified port where the Expo command is running from if local
export const getDebuggerURL = (port?: number) => {
  const expoDebuggerHost = Constants?.manifest?.debuggerHost
  const localURI = expoDebuggerHost?.split?.(':').shift()
  if (!localURI) return null
  return `http://${[localURI, port].join(':')}`
}

/* --- setGlobal() ----------------------------------------------------------------------------- */
// -i- Set a global variable on the "globalThis" object
const setGlobal = (key: any, val: any) => {
  globalThis[key] = val
}

/* --- getGlobal() ----------------------------------------------------------------------------- */
// -i- Get a global variable on the "globalThis" object
const getGlobal = (key: any) => globalThis[key]

/* --- setGlobalEnvVars() ---------------------------------------------------------------------- */
// -i- Set a series of global env vars to enable retrieving them via getEnvVar() later
// -i- You may want to do this in any _app.tsx / _app.js files due to @expo/next-adapter clearing process.env
const __PUBLIC_ENV = '__PUBLIC_ENV'
export const setPublicEnvVars = (publicEnvVars: { [key: string]: any }) => {
  setGlobal(__PUBLIC_ENV, { ...getGlobal(__PUBLIC_ENV), ...publicEnvVars })
}

/* --- getEnvVar() ----------------------------------------------------------------------------- */
// -i- Get expo / public env var
export const getEnvVar = (key: string) => {
  const possibleKeys = [key, `NEXT_PUBLIC_${key}`, `EXPO_PUBLIC_${key}`, `EXPO_${key}`, `REACT_NATIVE_${key}`] // @ts-ignore
  const checkEnv = (k) => process.env[k] || Constants.manifest?.extra?.[k] || getGlobal(__PUBLIC_ENV)?.[k]
  return possibleKeys.map(checkEnv).find((envVar) => typeof envVar !== 'undefined')
}
