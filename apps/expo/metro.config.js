// -i- Learn more: https://docs.expo.io/guides/customizing-metro
// -i- Based on: https://docs.expo.dev/guides/monorepos/
const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const projectRoot = __dirname;
const workspaceRoot = path.resolve(__dirname, '../..');
const config = getDefaultConfig(__dirname);

/* --- Monorepo Support ------------------------------------------------------------------------ */

// 1. Watch all files in the workspace
config.watchFolders = [workspaceRoot];
// 2. Let Metro know where to resolve packages and in what order
config.resolver.nodeModulesPath = [
    path.resolve(projectRoot, 'node_modules'),
    path.resolve(workspaceRoot, 'node_modules'),
];
// 3. Force metro to resolve (sub)dependencies only from 'nodeModulesPath'
config.resolver.disableHierarchicalLookup = true;
// 4. Add .cjs to the list of supported extensions
config.resolver.sourceExts = [...config.resolver.sourceExts, 'cjs'];

/* --- Exports --------------------------------------------------------------------------------- */

module.exports = config;
