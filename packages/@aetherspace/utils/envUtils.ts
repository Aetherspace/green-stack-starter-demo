import Constants from 'expo-constants';

/* --- getEnvVar() ----------------------------------------------------------------------------- */
// -i- Get expo / public env var
export const getEnvVar = (key: string) => {
    const possibleKeys = [key, `NEXT_PUBLIC_${key}`, `EXPO_PUBLIC_${key}`, `EXPO_${key}`, `REACT_NATIVE_${key}`]; // @ts-ignore
    const checkEnv = (k) => process.env[k] || Constants.manifest.extra?.[k];
    return possibleKeys.map(checkEnv).find(envVar => typeof envVar !== 'undefined');
};
