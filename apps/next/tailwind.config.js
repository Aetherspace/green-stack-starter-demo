const { universalTheme } = require('@app/core/tailwind.theme.js')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    '../../apps/**/*.tsx',
    '../../features/**/*.tsx',
    '../../packages/**/*.tsx',
  ],
  presets: [require('nativewind/preset')],
  plugins: [],
  important: 'html',
  theme: {
    ...universalTheme,
  },
}
