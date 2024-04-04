/** @type {import('tailwindcss').Config['theme']} */
const universalTheme = {
    // -i- Extend default tailwind theme here
    // -i- Reference this theme in the tailwind.config.js files in apps/expo, apps/next, features/app-core and other package or feature folders
    extend: {
        // colors: {
        //     primary: {
        //         100: '#FFA8E2',
        //         200: '#FF8CD4',
        //         300: '#FF70C6',
        //         400: '#FF54B8',
        //         500: '#FF38AA',
        //         600: '#FF1C9C',
        //         700: '#FF0090',
        //         800: '#E60082',
        //         900: '#CC0074',
        //     },
        // }
    }
}

/* --- Exports --------------------------------------------------------------------------------- */

module.exports = { universalTheme }
