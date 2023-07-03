/* eslint-disable import/no-anonymous-default-export */
import { PlopTypes } from '@turbo/gen'

/* --- Disclaimer ------------------------------------------------------------------------------ */

// Learn more about Turborepo Generators at:
// https://turbo.build/repo/docs/core-concepts/monorepos/code-generation

/* --- Constants ------------------------------------------------------------------------------- */

const WORKSPACE_FOLDER_MAPPER = Object.freeze({
  feature: 'features',
  package: 'packages',
})

/** --- Workspace Generator -------------------------------------------------------------------- */
/** -i- Simple generator to add a new feature or package workspace */
export const registerAetherWorkspaceGenerator = (plop: PlopTypes.NodePlopAPI) => {
  plop.setGenerator('aether-workspace', {
    description: 'Create a new feature or package workspace',
    prompts: [
      {
        type: 'list',
        name: 'workspaceType',
        message: 'what type of workspace would you like to generate?',
        choices: Object.keys(WORKSPACE_FOLDER_MAPPER),
        default: 'feature',
      },
      {
        type: 'input',
        name: 'folderName',
        message: 'What foldername do you want to give this workspace?',
      },
      {
        type: 'input',
        name: 'packageName',
        message: 'What package name would you like to import from? (used for package.json)',
      },
      {
        type: 'checkbox',
        name: 'workspaceStructure',
        message: 'Optional: What will this workspace contain? (extra folder setup)',
        choices: ['schemas', 'resolvers', 'components', 'hooks', 'screens', 'routes', 'utils'],
      },
      {
        type: 'input',
        name: 'packageDescription',
        message: 'Optional: How would you shortly describe the package? (used for package.json)',
        default: 'todo: add description',
      },
    ],
    actions: (data) => {
      // Args
      const { workspaceType, folderName, workspaceStructure } = data!

      // Vars
      const workspaceFolder = WORKSPACE_FOLDER_MAPPER[workspaceType]
      const workspacePath = `${workspaceFolder}/${folderName}`

      // -- Actions --

      const actions = [
        {
          type: 'add',
          path: `${workspacePath}/package.json`,
          templateFile: 'templates/package-json.hbs',
        },
      ] as PlopTypes.ActionType[]

      // -- Helpers --

      const addOptionalStructure = (folderName: string, file: string) => {
        if (workspaceStructure.includes(folderName)) {
          actions.push({
            type: 'add',
            path: `${workspacePath}/${folderName}/${file}`,
          })
        }
      }

      // -- Optionals --

      addOptionalStructure('schemas', 'index.ts')
      addOptionalStructure('resolvers', 'index.ts')
      addOptionalStructure('components', 'index.ts')
      addOptionalStructure('hooks', 'index.ts')
      addOptionalStructure('screens', 'index.ts')
      addOptionalStructure('routes', '.gitkeep')
      addOptionalStructure('utils', 'index.ts')

      // -- Generate --

      return actions
    },
  })
}
