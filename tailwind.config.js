// -!- Do not edit, won't work -!-
// *Decoy config* created with `tailwind init` for the "tailwind intellisense" vscode plugin to work
// ^ Actual tailwind config with twrnc should live elsewhere inside the apps/ or packages/@config folder
// ^ e.g. import twConfig from 'app/tailwind.config' // (... or from 'config/tailwind.config' if it exists)
// ^ Extend that tailwind.config, import & pass to AetherContextManager in _app.tsx (next) or App.tsx (expo)
// --
// -i- Also add the following to your vscode's .settings file to get the addon to work
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
// --
module.exports = { content: [], theme: { extend: {} }, plugins: [] }
