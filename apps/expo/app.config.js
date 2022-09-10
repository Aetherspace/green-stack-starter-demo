// Load env vars from .env file in next app
require('dotenv').config({ path: '../next/.env' });

// Only apply the env vars that start with "NEXT_PUBLIC_" & "EXPO_PUBLIC_" (once executed)
const aetherAppConfig = require('config/app.config');

/* --- Config ---------------------------------------------------------------------------------- */
// -i- Extends or overwrites the static Expo config defined in app.json
const config = ({ config }) => {
    // EAS updates config (only applied when not using expo publish)
    const easConfig = {
        runtimeVersion: { policy: 'sdkVersion' },
        updates: {
            enabled: true,
            checkAutomatically: 'ON_LOAD',
            fallbackToCacheTimeout: 0,
            // -!- TODO: This uri is supposed to be different per project and won't work if not changed
            // -i- TODO: Figure out your own uri by running 'eas updates:configure' in ./apps/expo/
            url: 'https://u.expo.dev/0fd0bb82-82d2-4be2-933a-edd5237cc822',
        },
        extra: {
            eas: {
                projectId: '0fd0bb82-82d2-4be2-933a-edd5237cc822',
            }
        }
    }
    // Extend the config
    const finalConfig = aetherAppConfig({
        config: {
            ...config,
            // Only apply EAS config when using the expo-cli to publish
            ...(!!process.env.EXPO_PUBLISH ? {} : easConfig),
        }
    })
    // Wrap up & return
    return finalConfig;
}

/* --- Exports --------------------------------------------------------------------------------- */

module.exports = config
