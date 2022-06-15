const path = require('path')
const { withUnimodules } = require('@expo/webpack-config/addons')

module.exports = {
    stories: [
        '../*.stories.mdx',
        '../apps/**/*.stories.mdx', 
        '../apps/**/*.stories.@(js|jsx|ts|tsx)',
        '../packages/**/*.stories.mdx', 
        '../packages/**/*.stories.@(js|jsx|ts|tsx)',
    ],
    addons: ['@storybook/addon-essentials'],
    webpackFinal: (config) => {
        // Add TS & react-native-web support
        config.module.rules.push({
          test: /\.tsx?$/,
          use: [
            {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-typescript'],
                },
            },
          ],
        })
        // Aliases
        config.resolve.alias['react-native$'] = require.resolve('react-native-web')
        config.resolve.extensions.push('.ts', '.tsx')
        // Export updated webpack config
        return withUnimodules(config, {
          projectRoot: path.resolve(__dirname, '../'),
        })
    },
    core: {
        builder: 'webpack5',
    },
    features: {
      previewMdx2: true, // 👈 MDX 2 enabled here (https://storybook.js.org/docs/react/writing-docs/mdx#mdx-2)
    },
    framework: '@storybook/react',
}
