const { universalTheme } = require('@app/core/tailwind.theme.js')

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    '../../apps/**/*.{js,jsx,ts,tsx,md,mdx}',
    '../../features/**/*.{js,jsx,ts,tsx,md,mdx}',
    '../../packages/**/*.{js,jsx,ts,tsx,md,mdx}',
  ],
  presets: [require('nativewind/preset')],
  theme: {
    ...universalTheme,
  },
  plugins: [require('tailwindcss-animate')],
}
