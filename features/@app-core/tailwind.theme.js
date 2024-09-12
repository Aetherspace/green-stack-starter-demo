const { hairlineWidth } = require('nativewind/theme')

/** @type {import('tailwindcss').Config['theme']} */
const universalTheme = {
    // -i- Extend default tailwind theme here
    // -i- Reference this theme in the tailwind.config.js files in apps/expo, apps/next, features/app-core and other package or feature folders
    extend: {
        colors: {
            /* light - #FFFFFF - colors.white */
            /* dark - #111827 - colors.gray[900] */
            background: 'hsl(var(--background))',

            /* light - #18181b - colors.zinc[900] */
            /* dark - #f3f4f6 - colors.gray[100] */
            foreground: 'hsl(var(--foreground))', 

            /* light - #111827 - colors.gray[900] */
            /* dark - #f3f4f6 - colors.gray[100] */
            primary: 'hsl(var(--primary))',

            /* light - #FFFFFF - colors.white */
            /* dark - #111827 - colors.gray[900] */
            primaryLight: 'hsl(var(--primary-light))',

            /* light - #1f2937 - colors.gray[800] */
            /* dark - #1f2937 - colors.gray[800] */
            secondary: 'hsl(var(--secondary))',

            /* light - #f3f4f6 - colors.gray[100] */
            /* dark - #f3f4f6 - colors.gray[100] */
            secondaryLight: 'hsl(var(--secondary-light))',

            /* light - #9ca3af - colors.gray[400] */
            /* dark - #9ca3af - colors.gray[400] */
            muted: 'hsl(var(--muted))',

            /* light - #ef4444 - colors.red[500] */
            /* dark - #ef4444 - colors.red[500] */
            error: 'hsl(var(--error))',

            /* light - #0f172a - colors.slate[900] */
            /* dark - #0f172a - colors.slate[900] */
            ring: 'hsl(var(--ring))',

            /* light - #d1d5db - colors.gray[300] */
            /* dark - #d1d5db - colors.gray[300] */
            input: 'hsl(var(--input))',
        },
        borderColor: (theme) => ({
            background: theme('colors.background'),
            foreground: theme('colors.foreground'),
            primary: theme('colors.primary'),
            primaryLight: theme('colors.primaryLight'),
            secondary: theme('colors.secondary'),
            secondaryLight: theme('colors.secondaryLight'),
            muted: theme('colors.muted'),
            error: theme('colors.error'),
            ring: theme('colors.ring'),
            input: theme('colors.input'),
        }),
        backgroundColor: (theme) => ({
            background: theme('colors.background'),
            foreground: theme('colors.foreground'),
            primary: theme('colors.primary'),
            primaryLight: theme('colors.primaryLight'),
            secondary: theme('colors.secondary'),
            secondaryLight: theme('colors.secondaryLight'),
            muted: theme('colors.muted'),
            error: theme('colors.error'),
            ring: theme('colors.ring'),
            input: theme('colors.input'),
        }),
        textColor: (theme) => ({
            background: theme('colors.background'),
            foreground: theme('colors.foreground'),
            primary: theme('colors.primary'),
            primaryLight: theme('colors.primaryLight'),
            secondary: theme('colors.secondary'),
            secondaryLight: theme('colors.secondaryLight'),
            muted: theme('colors.muted'),
            error: theme('colors.error'),
            ring: theme('colors.ring'),
            input: theme('colors.input'),
        }),
        borderWidth: {
            hairline: hairlineWidth(),
        },
        keyframes: {
            'accordion-down': {
                from: { height: '0' },
                to: { height: 'var(--radix-accordion-content-height)' },
            },
            'accordion-up': {
                from: { height: 'var(--radix-accordion-content-height)' },
                to: { height: '0' },
            },
        },
        animation: {
            'accordion-down': 'accordion-down 0.2s ease-out',
            'accordion-up': 'accordion-up 0.2s ease-out',
        },
    }
}

/* --- Exports --------------------------------------------------------------------------------- */

module.exports = { universalTheme }
