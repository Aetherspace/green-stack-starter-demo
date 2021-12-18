/* --- Helpers ------------------------------------------------------------------------------------ */

const getPublicEnvVars = () => {
    const filterEnv = ([k]) => ['NEXT_PUBLIC_', 'EXPO_', 'REACT_NATIVE_'].some(prefix => k.includes(prefix));
    return Object.fromEntries(Object.entries(process.env).filter(filterEnv));
};

/* --- Expo Config -------------------------------------------------------------------------- */

const expoConfig = ({ config }) => ({
    ...config,
    version: process.env.VERSION || '0.0.1',
    extra: {
        ...getPublicEnvVars(),
    },
});

/* --- Exports ------------------------------------------------------------------------------ */

module.exports = expoConfig;
