// -i- Based on: https://github.com/axeldelafosse/expo-next-monorepo-example/blob/main/packages/next/next.config.js
const { withExpo } = require('@expo/next-adapter');
const withPlugins = require('next-compose-plugins');
const withPWA = require('next-pwa');
const withFonts = require('next-fonts');
const transpiledModules = require('config/transpiledModules');
// -!- Add modules that need to be transpiled, ** including used workspaces **
const withTM = require('next-transpile-modules')(transpiledModules);

/* --- Build Next Config ----------------------------------------------------------------------- */

const projectRoot = __dirname;
const workspaceRoot = `${projectRoot}/../..`;

const config = withPlugins(
    [withTM, withFonts, withPWA, [withExpo, { projectRoot: workspaceRoot }]],
    // -i- Next specific config, e.g. https://nextjs.org/docs/api-reference/next.config.js/introduction
    {
        typescript: {
            ignoreBuildErrors: true,
        },
        pwa: {
            dest: 'public',
            // https://github.com/shadowwalker/next-pwa#available-options
            // disable: process.env.NODE_ENV === 'development',
            // register: true,
            // scope: '/app',
            // sw: 'service-worker.js',
        },
    },
);

/* --- Exports --------------------------------------------------------------------------------- */

module.exports = config;
