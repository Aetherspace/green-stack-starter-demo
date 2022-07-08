// -i- Learn more: https://docs.expo.io/guides/customizing-metro
// -i- Based on: https://github.com/axeldelafosse/expo-next-monorepo-example/blob/main/packages/expo/metro.config.js
const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const projectRoot = __dirname;
const workspaceRoot = path.resolve(__dirname, '../..');
const config = getDefaultConfig(__dirname);

/* --- Monorepo Support ------------------------------------------------------------------------ */

config.watchFolders = [workspaceRoot];
config.resolver.nodeModulesPath = [
    path.resolve(projectRoot, 'node_modules'),
    path.resolve(workspaceRoot, 'node_modules'),
];
config.resolver.sourceExts = [...config.resolver.sourceExts, 'cjs'];

/* --- Exports --------------------------------------------------------------------------------- */

module.exports = config;
