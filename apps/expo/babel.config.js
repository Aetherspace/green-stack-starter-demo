// -i- Based on: https://github.com/axeldelafosse/expo-next-monorepo-example/blob/main/packages/expo/.babelrc.js
module.exports = function (api) {
  api.cache(true);
  return {
    presets: [['babel-preset-expo', { jsxRuntime: 'automatic' }]],
    plugins: [
      require.resolve('expo-router/babel'), // -i- NOTE: `expo-router/babel` is a temporary extension to `babel-preset-expo`.
      'react-native-reanimated/plugin', // -i- Should always go last
    ],
  };
};
