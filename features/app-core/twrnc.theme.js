/* --- Custom Tailwind Config ------------------------------------------------------------------ */
// Docs @ https://github.com/jaredh159/tailwind-react-native-classnames#adding-custom-classes
// ^ Extend this theme that's used in tailwind.config
// ^ Then import & pass the custom tailwind.config to AetherContextManager in ClientRootLayout.tsx (next) or _layout.tsx (expo)
// ^ e.g.   import twConfig from 'app/tailwind.config'
// ^ e.g.   <AetherContextManager twConfig={twConfig} ...>

/* --- Aetherspace Font Standards -------------------------------------------------------------- */

const fontUtilities = {
    'font-primary-regular': {
        fontFamily: 'Roboto',
        fontWeight: '400',
    },
    'font-primary-light': {
        fontFamily: 'RobotoLight',
        fontWeight: '300',
    },
    'font-primary-bold': {
        fontFamily: 'RobotoBold',
        fontWeight: '700',
    },
    'font-primary-black': {
        fontFamily: 'RobotoBlack',
        fontWeight: '900',
    },
}

const typographyUtilities = {
    'heading-1': 'font-primary-bold text-5xl',
    'heading-2': 'font-primary-bold text-3xl',
    'heading-3': 'font-primary-bold text-2xl',
    'heading-4': 'font-primary-bold text-xl',
    'body-lg-regular': 'text-lg font-primary-regular',
    'body-lg-bold': 'text-lg font-primary-bold',
    'body-md-regular': 'text-base font-primary-regular',
    'body-md-bold': 'text-base font-primary-bold',
    'body-sm-regular': 'text-sm font-primary-regular',
    'body-sm-bold': 'text-sm font-primary-bold',
    'body-xs-regular': 'text-xs font-primary-regular',
    'body-xs-bold': 'text-xs font-primary-bold',
}

/* --- Aetherspace Color Standards ------------------------------------------------------------- */

const textColorUtilities = {
    'text-primary': 'text-gray-900 dark:text-white',
    'text-secondary': 'text-gray-700 dark:text-gray-300',
    'text-tertiary': 'text-gray-600 dark:text-gray-400',
    'text-muted': 'text-gray-800 dark:text-gray-200',
    'text-success': 'text-green-400 dark:text-green-500',
    'text-warning': 'text-yellow-400 dark:text-yellow-500',
    'text-danger': 'text-red-400 dark:text-red-500',
    'text-info': 'text-blue-400 dark:text-blue-500',
    'text-grayscale-900': 'text-neutral-900 dark:text-neutral-100',
    'text-grayscale-800': 'text-neutral-800 dark:text-neutral-200',
    'text-grayscale-700': 'text-neutral-700 dark:text-neutral-300',
    'text-grayscale-600': 'text-neutral-600 dark:text-neutral-400',
    'text-grayscale-500': 'text-neutral-500 dark:text-neutral-500',
    'text-grayscale-400': 'text-neutral-400 dark:text-neutral-600',
    'text-grayscale-300': 'text-neutral-300 dark:text-neutral-700',
    'text-grayscale-200': 'text-neutral-200 dark:text-neutral-800',
    'text-grayscale-100': 'text-neutral-100 dark:text-neutral-900',
    'text-on-primary-bg': 'text-neutral-900 dark:text-white',
    'text-on-secondary-bg': 'text-gray-300 dark:text-gray-700',
    'text-on-tertiary-bg': 'text-gray-400 dark:text-gray-600',
    'text-on-muted-bg': 'text-gray-200 dark:text-gray-800',
    'text-on-success-bg': 'text-green-500 dark:text-green-400',
    'text-on-warning-bg': 'text-yellow-500 dark:text-yellow-400',
    'text-on-danger-bg': 'text-red-500 dark:text-red-400',
    'text-on-info-bg': 'text-blue-500 dark:text-blue-400',    
}

const backgroundColorUtilities = {
    'bg-primary': 'bg-white dark:bg-gray-900',
    'bg-secondary': 'bg-slate-200 dark:bg-slate-800',
    'bg-tertiary': 'bg-slate-300 dark:bg-slate-700',
    'bg-muted': 'bg-slate-400 dark:bg-slate-600',
    'bg-success': 'bg-green-400 dark:bg-green-500',
    'bg-warning': 'bg-yellow-400 dark:bg-yellow-500',
    'bg-danger': 'bg-red-400 dark:bg-red-500',
    'bg-info': 'bg-blue-400 dark:bg-blue-500',
}

const buttonColorUtilities = {
    'btn-primary-bg': 'bg-slate-800 dark:bg-slate-200',
    'btn-primary-text': 'text-white dark:text-gray-900',
    'btn-secondary-bg': 'bg-slate-300 dark:bg-slate-700',
    'btn-secondary-text': 'text-gray-900 dark:text-white',
    'btn-tertiary-bg': 'bg-transparent',
    'btn-tertiary-text': 'text-gray-900 dark:text-gray-100',
    'btn-muted-bg': 'bg-slate-400 dark:bg-slate-600',
    'btn-muted-text': 'text-gray-900 dark:text-white',    
}

const borderColorUtilities = {
    'border-primary': 'border-white dark:border-gray-900',
    'border-secondary': 'border-gray-700 dark:border-gray-300',
    'border-tertiary': 'border-gray-600 dark:border-gray-400',    
}

/* --- Dimensions & Sizing --------------------------------------------------------------------- */

const buttonDimensionUtilities = {
    'btn-size-sm': 'h-[30px]',
    'btn-size-sm-text': 'body-sm-bold px-3',
    'btn-size-md': 'h-[40px]',
    'btn-size-md-text': 'body-md-bold px-4',
    'btn-size-lg': 'h-[50px]',
    'btn-size-lg-text': 'body-lg-bold px-5',
}

/* --- Export Theme ---------------------------------------------------------------------------- */

const twrncTheme = {
    ...fontUtilities,
    ...typographyUtilities,
    ...textColorUtilities,
    ...backgroundColorUtilities,
    ...buttonColorUtilities,
    ...borderColorUtilities,
    ...buttonDimensionUtilities,
}

module.exports = twrncTheme

/* --- IntelliSense Setup ---------------------------------------------------------------------- */
// Enable intellisense by installing the "Tailwind CSS Intellisense" vscode plugin
// Also add the following to your vscode's .settings file to get the addon to work properly:
/* --
    "tailwindCSS.classAttributes": [
        "class",
        "className",
        "tw",
        "tailwind",
        "style"
    ],
    "tailwindCSS.experimental.classRegex": [
        "tw`([^`]*)", // tw`...`
        "tw=\"([^\"]*)", // <div tw="..." />
        "tw={\"([^\"}]*)", // <div tw={"..."} />
        "tw\\.\\w+`([^`]*)", // tw.xxx`...`
        "tw\\(.*?\\)`([^`]*)", // tw(Component)`...`
        "twStyled\\.\\w+`([^`]*)", // twStyled.xxx`...`
        "twStyled\\(.*?\\)`([^`]*)", // twStyled(Component)`...`
        "tw.*?z\\.string\\(\\).*?\\.default\\('([^']*)'", // tailwind class property default in zod schemas
        "tw.*?z\\.string\\(\\).*?\\.eg\\('([^']*)'", // tailwind class property example in zod schemas
        "Classes.*?z\\.string\\(\\).*?\\.default\\('([^']*)'", // tailwind class property default in zod schemas
        "Classes.*?z\\.string\\(\\).*?\\.eg\\('([^']*)'", // tailwind class property example in zod schemas
    ],
    "tailwindCSS.includeLanguages": {
        "typescript": "javascript",
        "typescriptreact": "javascript"
    },
    "inlineFold.regex": "(tw|class|className)=[`'{\"]([^`'\"}]{20,})[`'\"}]",
    "inlineFold.regexFlags": "g",
    "inlineFold.regexGroup": 2,
    "inlineFold.unfoldedOpacity": 0.5,
    "inlineFold.maskChar": "...",
    "inlineFold.maskColor": "#FFF",
    "inlineFold.supportedLanguages": ["javascriptreact", "typescriptreact"],
    "inlineFold.unfoldOnLineSelect": true,
    "inlineFold.autoFold": true,
    "tailwindCSS.lint.invalidTailwindDirective": "warning",
    "tailwindCSS.lint.invalidApply": "warning",
    "tailwindCSS.lint.invalidConfigPath": "ignore",
    "tailwindCSS.lint.invalidScreen": "warning",
    "tailwindCSS.lint.invalidVariant": "warning",
    "tailwindCSS.experimental.configFile": null,
-- */
