const transpiledWorkspaces = require('registries/transpiledWorkspaces.generated.js')

// -i- The order of these is important -!-
// -i- Always do 3rd party packages first, then internal packages, then the rest
// -i- Try to list these in order of dependence (e.g. node_modules <- aetherspace <- some-feature)
module.exports = [
    // - Modules -
    'twrnc',
    '@react-native/assets-registry',
    '@expo/vector-icons',
    // - Packages & Features -
    ...transpiledWorkspaces,
]
