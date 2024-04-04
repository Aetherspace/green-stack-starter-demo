const { universalTheme } = require('./tailwind.theme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './**/*.{js,jsx,ts,tsx}',
  ],
  plugins: [],
  theme: {
    ...universalTheme,
  },
}
