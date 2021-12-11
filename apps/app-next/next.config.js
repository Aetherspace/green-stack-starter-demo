// -i- Based on: https://github.com/axeldelafosse/expo-next-monorepo-example/blob/main/packages/next/next.config.js
const { withExpo } = require('@expo/next-adapter');
const withPlugins = require('next-compose-plugins');
const withFonts = require('next-fonts');
// -!- Add modules that need to be transpiled, ** including used workspaces **
const withTM = require('next-transpile-modules')([
    // - Workspaces -
    'aetherspace',
    'app',
    // - Modules -
    'expo-next-react-navigation',
]);

/* --- Build Next Config ----------------------------------------------------------------------- */

const projectRoot = __dirname;
const workspaceRoot = `${projectRoot}/../..`;

const config = withPlugins(
    [withTM, withFonts, [withExpo, { projectRoot: workspaceRoot }]],
    // -i- Next specific config, e.g. https://nextjs.org/docs/api-reference/next.config.js/introduction
    {
        typescript: {
            ignoreBuildErrors: true,
        },
    },
);

/* --- Exports --------------------------------------------------------------------------------- */

module.exports = config;
