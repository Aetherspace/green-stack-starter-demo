const { plugin } = require('twrnc');
const twrncTheme = require('./twrnc.theme');

/* --- Custom Tailwind Config ------------------------------------------------------------------ */
// Docs @ https://github.com/jaredh159/tailwind-react-native-classnames#adding-custom-classes
// ^ Extend the twrnc.theme.js used in tailwind.config, import & pass to AetherContextManager in ClientRootLayout.tsx (next) or _layout.tsx (expo)
// ^ e.g.   import twConfig from 'app/tailwind.config'
// ^ e.g.   <AetherContextManager twConfig={twConfig} ...>

module.exports = {
    twrncTheme: twrncTheme,
    plugins: [
        plugin(({ addUtilities }) => {
            addUtilities(twrncTheme)
        })
    ]
}

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
