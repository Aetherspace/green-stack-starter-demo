const path = require('path')
const { withUnimodules } = require('@expo/webpack-config/addons')

module.exports = {
    stories: [
        // -- Aetherspace docs --
        '../README.stories.mdx',
        './docs/Quickstart.stories.mdx',
        './docs/CoreConcepts.stories.mdx',
        './docs/Schemas.stories.mdx',
        './docs/Styling.stories.mdx',
        './docs/UniversalRouting.stories.mdx',
        './docs/GraphQL.stories.mdx',
        './docs/Automation.stories.mdx',
        './docs/Icons.stories.mdx',
        './docs/Deployment.stories.mdx',
        './other/License.stories.mdx',
        // -- Other documentation --
        '../apps/**/*.stories.mdx', 
        '../apps/**/*.stories.@(js|jsx|ts|tsx)',
        '../features/**/*.stories.mdx', 
        '../features/**/*.stories.@(js|jsx|ts|tsx)',
        '../packages/**/*.stories.mdx', 
        '../packages/**/*.stories.@(js|jsx|ts|tsx)',
    ],
    addons: [
      { name: '@storybook/addon-essentials', options: { transcludeMarkdown: true } },
      { name: '@storybook/addon-docs', options: { transcludeMarkdown: true } },
      '@a110/storybook-expand-all',
      'aetherspace/docs/addons',
    ],
    staticDirs: [
      './public',
      '../packages/@aetherspace/assets',
      '../apps/next/public',
    ],
    webpackFinal: (config) => {
        // Add TS & react-native-web support
        config.module.rules.push({
          test: /\.tsx?$/,
          use: [
            {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-typescript', '@babel/preset-react'],
                },
            },
          ],
        })
        // Transform all direct `react-native` imports to `react-native-web`
        config.resolve.alias['react-native$'] = require.resolve('react-native-web')
        // Other aliases for web support (https://github.com/expo/expo/issues/21469#issuecomment-1576001543)
        config.resolve.alias['expo-asset'] = 'expo-asset-web'
        config.resolve.alias['aetherspace/navigation'] = require.resolve('./__mocks__/aetherspaceNavigation.tsx')
        config.resolve.extensions.push('.ts', '.tsx')
        config.resolve.fallback = {
          ...config.resolve.fallback,
          https: false,
          os: false,
          zlib: false,
          http: false,
          stream: false,
        }
        // Compatibility
        config.optimization = {
          ...config.optimization,
          sideEffects: false,
        }
        // Create final webpack config
        const finalConfig = withUnimodules(config, {
          projectRoot: path.resolve(__dirname, '../'),
        })
        // Return updated config
        return finalConfig
    },
    core: {
        builder: 'webpack5',
    },
    features: {
      previewMdx2: true, // 👈 MDX 2 enabled here (https://storybook.js.org/docs/react/writing-docs/mdx#mdx-2)
    },
    env: (config) => ({
      ...config,
      STORYBOOK_BACKEND_URL: process.env.STORYBOOK_BACKEND_URL || process.env.BACKEND_URL,
      BACKEND_URL: process.env.STORYBOOK_BACKEND_URL || process.env.BACKEND_URL,
    }),
    framework: '@storybook/react',
}
