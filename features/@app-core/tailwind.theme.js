const colors = require('tailwindcss/colors')

/** @type {import('tailwindcss').Config['theme']} */
const universalTheme = {
    // -i- Extend default tailwind theme here
    // -i- Reference this theme in the tailwind.config.js files in apps/expo, apps/next, features/app-core and other package or feature folders
    extend: {
        colors: {
            primary: colors.gray,
        },
    }
}

/* --- Exports --------------------------------------------------------------------------------- */

module.exports = { universalTheme }
