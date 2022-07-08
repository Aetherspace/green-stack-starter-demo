// -i- Based on: https://github.com/axeldelafosse/expo-next-monorepo-example/blob/main/packages/next/next.config.js
const { withExpo } = require('@expo/next-adapter');
const withPlugins = require('next-compose-plugins');
const withPWA = require('next-pwa');
const withFonts = require('next-fonts');
const withImages = require('next-images');
const transpiledModules = require('config/transpiledModules');
const withTM = require('next-transpile-modules')(transpiledModules);

/* --- Build Next Config ----------------------------------------------------------------------- */

const projectRoot = __dirname;
const workspaceRoot = `${projectRoot}/../..`;

const config = withPlugins(
    [withTM, withFonts, withImages, withPWA, [withExpo, { projectRoot: workspaceRoot }]],
    // -i- Next specific config, e.g. https://nextjs.org/docs/api-reference/next.config.js/introduction
    {
        typescript: {
            ignoreBuildErrors: true,
        },
        pwa: {
            // https://github.com/shadowwalker/next-pwa#available-options
            dest: 'public',
            disable: process.env.NODE_ENV === 'development',
            // register: true,
            // scope: '/app',
            // sw: 'service-worker.js',
        },
    },
);

/* --- Exports --------------------------------------------------------------------------------- */

module.exports = config;
