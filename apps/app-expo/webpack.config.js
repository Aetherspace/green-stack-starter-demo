// -i- Based on: https://moti.fyi/web
const createExpoWebpackConfigAsync = require('@expo/webpack-config');
const transpiledModules = require('config/transpiledModules');

/* --- createAetherWebpackConfig() ------------------------------------------------------------- */

// -i- This is only used for Expo Web (PWA without SSR)
const createAetherWebpackConfig = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync(
    {
      ...env,
      babel: {
        // -!- Add modules that need to be transpiled, ** including used workspaces **
        dangerouslyAddModulePathsToTranspile: transpiledModules,
      },
    },
    argv,
  );
  return config;
};

/* --- Exports --------------------------------------------------------------------------------- */

module.exports = createAetherWebpackConfig;
