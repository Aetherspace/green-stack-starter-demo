const { universalTheme } = require('@app/core/tailwind.theme.js')

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    '../../apps/**/*.tsx',
    '../../features/**/*.tsx',
    '../../packages/**/*.tsx',
  ],
  presets: [require('nativewind/preset')],
  important: 'html',
  theme: {
    ...universalTheme,
  },
  plugins: [require('tailwindcss-animate')],
}
