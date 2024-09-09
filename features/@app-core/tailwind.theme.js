const colors = require('tailwindcss/colors')

/** @type {import('tailwindcss').Config['theme']} */
const universalTheme = {
    // -i- Extend default tailwind theme here
    // -i- Reference this theme in the tailwind.config.js files in apps/expo, apps/next, features/app-core and other package or feature folders
    extend: {
        colors: {
            primary: colors.gray[900],
            primaryLight: colors.white,
            secondary: colors.gray[800],
            secondaryLight: colors.gray[100],
            muted: colors.gray[400],
            error: colors.red[500],
            foreground: colors.zinc[900],
        },
        borderColor: (theme) => ({
            primary: theme('colors.primary'),
            primaryLight: theme('colors.primaryLight'),
            secondary: theme('colors.secondary'),
            secondaryLight: theme('colors.secondaryLight'),
            muted: theme('colors.muted'),
            error: theme('colors.error'),
            foreground: theme('colors.foreground'),
        }),
        backgroundColor: (theme) => ({
            primary: theme('colors.primary'),
            primaryLight: theme('colors.primaryLight'),
            secondary: theme('colors.secondary'),
            secondaryLight: theme('colors.secondaryLight'),
            muted: theme('colors.muted'),
            error: theme('colors.error'),
            foreground: theme('colors.foreground'),
        }),
        textColor: (theme) => ({
            primary: theme('colors.primary'),
            primaryLight: theme('colors.primaryLight'),
            secondary: theme('colors.secondary'),
            secondaryLight: theme('colors.secondaryLight'),
            muted: theme('colors.muted'),
            error: theme('colors.error'),
            foreground: theme('colors.foreground'),
        }),
    }
}

/* --- Exports --------------------------------------------------------------------------------- */

module.exports = { universalTheme }
