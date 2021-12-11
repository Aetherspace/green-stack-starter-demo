// -i- Based on: https://moti.fyi/web
const createExpoWebpackConfigAsync = require('@expo/webpack-config');

/* --- createAetherWebpackConfig() ------------------------------------------------------------- */

// -i- This is only used for Expo Web (PWA without SSR)
const createAetherWebpackConfig = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync(
    {
      ...env,
      babel: {
        // -!- Add modules that need to be transpiled, ** including used workspaces **
        dangerouslyAddModulePathsToTranspile: ['app'],
      },
    },
    argv,
  );
  return config;
};

/* --- Exports --------------------------------------------------------------------------------- */

module.exports = createAetherWebpackConfig;
