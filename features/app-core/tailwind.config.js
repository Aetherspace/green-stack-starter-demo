const { plugin } = require('twrnc');

/* --- Custom Tailwind Config ------------------------------------------------------------------ */
// Docs @ https://github.com/jaredh159/tailwind-react-native-classnames#adding-custom-classes
// ^ Extend this tailwind.config, import & pass to AetherContextManager in _app.tsx (next) or App.tsx (expo)
// ^ e.g.   import twConfig from 'app/tailwind.config'
// ^ e.g.   <AetherContextManager twConfig={twConfig} ...>

module.exports = {
    plugins: [
        plugin(({ addUtilities }) => {
            addUtilities({
                'roboto': {
                    fontFamily: 'Roboto',
                },
                'roboto-light': {
                    fontFamily: 'RobotoLight',
                    fontWeight: '300',
                },
                'roboto-bold': {
                    fontFamily: 'RobotoBold',
                    fontWeight: '700',
                },
                'roboto-black': {
                    fontFamily: 'RobotoBlack',
                    fontWeight: '900',
                }
            })
        })
    ]
}

/* --- Intellisense Setup ---------------------------------------------------------------------- */
// Enable intellisense by installing the "Tailwind CSS Intellisense" vscode plugin
// Also add the following to your vscode's .settings file to get the addon to work properly:
// --
// "tailwindCSS.classAttributes": [
//   "class",
//   "className",
//   "tw",
//   "tailwind",
//   "style"
// ],
// "tailwindCSS.experimental.classRegex": [
//   "tw`([^`]*)", // tw`...`
//   "tw=\"([^\"]*)", // <div tw="..." />
//   "tw={\"([^\"}]*)", // <div tw={"..."} />
//   "tw\\.\\w+`([^`]*)", // tw.xxx`...`
//   "tw\\(.*?\\)`([^`]*)" // tw(Component)`...`
// ],
// "tailwindCSS.includeLanguages": {
//   "typescript": "javascript",
//   "typescriptreact": "javascript"
// },
