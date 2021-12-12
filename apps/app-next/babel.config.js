module.exports = {
    presets: ['next/babel', ['babel-preset-expo', { jsxRuntime: 'automatic' }]],
    plugins: [
        // -i- Always use the same 'loose' setting
        ['@babel/plugin-proposal-class-properties', { loose: true }],
        ['@babel/plugin-proposal-private-methods', { loose: true }],
        ['@babel/plugin-proposal-private-property-in-object', { loose: true }],
        'react-native-reanimated/plugin' // -i- Should always go last
    ]
}
