/* eslint-disable import/no-anonymous-default-export */
import { PlopTypes } from '@turbo/gen'
// Utils
import { listWorkspaceImports } from '../../packages/@aetherspace/scripts/helpers/scriptUtils'

/* --- Disclaimer ------------------------------------------------------------------------------ */

// Learn more about Turborepo Generators at:
// https://turbo.build/repo/docs/core-concepts/monorepos/code-generation

/* --- Constants ------------------------------------------------------------------------------- */

const workspaceImports = listWorkspaceImports('')
const workspaceOptions = Object.keys(workspaceImports).reduce((options, workspacePath) => {
  const workspaceName = workspaceImports[workspacePath]
  const workspaceOption = `${workspacePath}  --  importable from: '${workspaceName}'`
  // Skip listing the helper workspaces
  if (['config', 'aetherspace', 'registries'].includes(workspaceName)) return options
  // Add the workspace option
  return { ...options, [workspaceOption]: workspacePath }
}, {})

const LINES = 100 - 12 // -i- 100 = max length, 12 = everything but the title & '-' lines

/* --- Helpers --------------------------------------------------------------------------------- */

const camelToDash = (str: string) => str.replace(/[\w]([A-Z])/g, (m) => `${m[0]}-${m[1]}`).toLowerCase() // prettier-ignore

const uppercaseFirstChar = (str: string) => str.charAt(0).toUpperCase() + str.slice(1)

/** --- Route Generator ------------------------------------------------------------------------ */
/** -i- Route generator to add a new route and related screen */
export const registerAetherRouteGenerator = (plop: PlopTypes.NodePlopAPI) => {
  plop.setGenerator('aether-route', {
    description: 'Route generator to add a new route and related screen',
    prompts: [
      {
        type: 'list',
        name: 'workspaceTarget',
        message: 'Where would you like to add this new route?',
        choices: Object.keys(workspaceOptions),
      },
      {
        type: 'input',
        name: 'screenName',
        message: 'What should the screen component be called? (e.g. "TestScreen" = <TestScreen/> component)', // prettier-ignore
      },
      // {
      //   type: 'input',
      //   name: 'screenDescription',
      //   message: 'Optional description: What will this page / screen render?',
      // },
      {
        type: 'input',
        name: 'routePath',
        message: 'What url do you want this route on? (e.g. "/examples/[slug]")',
        default: (data) => {
          const workspacePath = workspaceOptions[data.workspaceTarget]
          const workspaceName = workspacePath.split('/')[1]
          return `/${workspaceName}/${camelToDash(data.screenName)}`
        },
      },
    ],
    actions: (data) => {
      // Args
      const { workspaceTarget, screenName, routePath /*, routeDescription */ } = data || {}
      const workspacePath = workspaceOptions[workspaceTarget]

      // -- Vars --

      const ScreenName = uppercaseFirstChar(screenName)
      const screenTitleDivider = `/* --- <${ScreenName}/> ${'-'.repeat(LINES - ScreenName.length - 3)} */` // prettier-ignore

      const screenRoutePath = `${workspacePath}/routes/${routePath}/index.tsx`
      const traversalParts = routePath.split('/').map(() => '..')
      const screenImportPath = `${traversalParts.join('/')}/screens/${ScreenName}`
      const routePathDivider = `/* --- ${routePath} ${'-'.repeat(LINES - routePath.length)} */`

      // -- Generate --

      return [
        {
          type: 'add',
          path: `${workspacePath}/screens/${ScreenName}.tsx`,
          templateFile: 'templates/route-screen.hbs',
          data: {
            screenName,
            ScreenName,
            screenTitleDivider,
          },
        },
        {
          type: 'append-last-line',
          path: `${workspacePath}/screens/index.ts`,
          template: `export { ${ScreenName}, T${ScreenName}Props } from './${ScreenName}'\n`,
          pattern: /^(.*\S)[\r\n]*$/,
        },
        {
          type: 'add',
          path: screenRoutePath,
          templateFile: 'templates/screen-route.hbs',
          data: {
            screenName,
            ScreenName,
            screenImportPath,
            routePath,
            routePathDivider,
          },
        },
      ]
    },
  })
}
