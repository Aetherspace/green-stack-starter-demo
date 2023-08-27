// -!- Do not edit, won't work -!-
// *Decoy config* created with `tailwind init` and expanded on for the "tailwind intellisense" vscode plugin to work
// ^ Actual tailwind config with twrnc should live at the "/features/app-core/tailwind.config.js" file
// ^ Extend that tailwind.config, import & pass to AetherContextManager in _app.tsx (next) or App.tsx (expo)
// ^ e.g. import twConfig from 'app/tailwind.config'
// --
// -i- Usage & adding custom classes: https://www.npmjs.com/package/twrnc#adding-custom-classes
// --
// ^ Extend the "/features/app-core/twrnc.theme.js" file used here and in "/features/app-core/tailwind.config.js",
// ^ import & pass to AetherContextManager in ClientRootLayout.tsx (next) or _layout.tsx (expo)
// ^ e.g.   import twConfig from 'app/tailwind.config'
// ^ e.g.   <AetherContextManager twConfig={twConfig} ...>
// --
// -i- Also add the following to your vscode's .settings file to get the addon to work:
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
const twrncTheme = require('./features/app-core/twrnc.theme');
module.exports = {
    content: [],
    theme: { extend: {} },
    plugins: [
        function ({ addUtilities }) {
            const twrncThemeIntelliSense = Object.entries(twrncTheme).reduce((acc, [key, value], i) => {
                // @apply alternative from twrnc: https://www.npmjs.com/package/twrnc#adding-custom-classes
                if (typeof value === 'string') return { ...acc, [`.${key}`]: { [`@apply ${value}`]: {} } }
                // Regular object definitions from twrnc: https://www.npmjs.com/package/twrnc#adding-custom-classes
                return { ...acc, [`.${key}`]: { ...value } }
            }, {})
            addUtilities(twrncThemeIntelliSense)
        }
    ],
}
