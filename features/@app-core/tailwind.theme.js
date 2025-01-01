const { hairlineWidth } = require('nativewind/theme')

/** @type {import('tailwindcss').Config['theme']} */
const universalTheme = {
    // -i- Extend default tailwind theme here
    // -i- Reference this theme in the tailwind.config.js files in apps/expo, apps/next, features/app-core and other package or feature folders
    extend: {
        colors: {
            'background': 'hsl(var(--background))',
            'foreground': 'hsl(var(--foreground))',
            'primary': 'hsl(var(--primary))',
            'primary-foreground': 'hsl(var(--primary-foreground))',
            'secondary': 'hsl(var(--secondary))',
            'secondary-foreground': 'hsl(var(--secondary-foreground))',
            'accent': 'hsl(var(--accent))',
            'accent-foreground': 'hsl(var(--accent-foreground))',
            'card': 'hsl(var(--card))',
            'card-foreground': 'hsl(var(--card-foreground))',
            'popover': 'hsl(var(--popover))',
            'popover-foreground': 'hsl(var(--popover-foreground))',
            'link': 'hsl(var(--link))',
            'muted': 'hsl(var(--muted))',
            'warn': 'hsl(var(--warn))',
            'danger': 'hsl(var(--danger))',
            'info': 'hsl(var(--info))',
            'success': 'hsl(var(--success))',
            'ring': 'hsl(var(--ring))',
            'input': 'hsl(var(--input))',
        },
        borderColor: (theme) => ({
            'background': theme('colors.background'),
            'foreground': theme('colors.foreground'),
            'primary': theme('colors.primary'),
            'primary-foreground': theme('colors.primary-foreground'),
            'secondary': theme('colors.secondary'),
            'secondary-foreground': theme('colors.secondary-foreground'),
            'accent': theme('colors.accent'),
            'accent-foreground': theme('colors.accent-foreground'),
            'card': theme('colors.card'),
            'card-foreground': theme('colors.card-foreground'),
            'popover': theme('colors.popover'),
            'popover-foreground': theme('colors.popover-foreground'),
            'link': theme('colors.link'),
            'muted': theme('colors.muted'),
            'warn': theme('colors.warn'),
            'danger': theme('colors.danger'),
            'info': theme('colors.info'),
            'success': theme('colors.success'),
            'ring': theme('colors.ring'),
            'input': theme('colors.input'),
        }),
        backgroundColor: (theme) => ({
            'background': theme('colors.background'),
            'foreground': theme('colors.foreground'),
            'primary': theme('colors.primary'),
            'primary-foreground': theme('colors.primary-foreground'),
            'secondary': theme('colors.secondary'),
            'secondary-foreground': theme('colors.secondary-foreground'),
            'accent': theme('colors.accent'),
            'accent-foreground': theme('colors.accent-foreground'),
            'card': theme('colors.card'),
            'card-foreground': theme('colors.card-foreground'),
            'popover': theme('colors.popover'),
            'popover-foreground': theme('colors.popover-foreground'),
            'link': theme('colors.link'),
            'muted': theme('colors.muted'),
            'warn': theme('colors.warn'),
            'danger': theme('colors.danger'),
            'info': theme('colors.info'),
            'success': theme('colors.success'),
            'ring': theme('colors.ring'),
            'input': theme('colors.input'),
        }),
        textColor: (theme) => ({
            'background': theme('colors.background'),
            'foreground': theme('colors.foreground'),
            'primary': theme('colors.primary'),
            'primary-foreground': theme('colors.primary-foreground'),
            'secondary': theme('colors.secondary'),
            'secondary-foreground': theme('colors.secondary-foreground'),
            'accent': theme('colors.accent'),
            'accent-foreground': theme('colors.accent-foreground'),
            'card': theme('colors.card'),
            'card-foreground': theme('colors.card-foreground'),
            'popover': theme('colors.popover'),
            'popover-foreground': theme('colors.popover-foreground'),
            'link': theme('colors.link'),
            'muted': theme('colors.muted'),
            'warn': theme('colors.warn'),
            'danger': theme('colors.danger'),
            'info': theme('colors.info'),
            'success': theme('colors.success'),
            'ring': theme('colors.ring'),
            'input': theme('colors.input'),
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
