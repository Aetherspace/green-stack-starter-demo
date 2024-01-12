/* eslint-disable import/no-anonymous-default-export */
import { PlopTypes } from '@turbo/gen'
import { validateNonEmptyNoSpaces } from '../scripts/helpers/scriptUtils'

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
        validate: validateNonEmptyNoSpaces,
      },
      {
        type: 'input',
        name: 'packageName',
        message: 'What package name would you like to import from? (used for package.json)',
        validate: validateNonEmptyNoSpaces,
      },
      {
        type: 'checkbox',
        name: 'workspaceStructure',
        message: 'Optional: What will this workspace contain? (optional extra folder setup)',
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
      const { workspaceType, folderName, packageName, workspaceStructure } = data!

      // Vars
      const workspaceFolder = WORKSPACE_FOLDER_MAPPER[workspaceType]
      const workspacePath = `${workspaceFolder}/${folderName}`
      const isFeature = workspaceType === 'feature'

      // License
      const usesCustomLicense = ['aether', 'green-stack'].some((word) => packageName.includes(word))
      let packageLicense = isFeature ? 'MIT' : 'UNLICENSED'
      if (usesCustomLicense) packageLicense = 'SEE LICENSE IN LICENSE.md'
      const isPrivate = isFeature || usesCustomLicense
      const privateLine = isPrivate ? '\n    "private": true,' : ''

      // -- Actions --

      const actions = [
        {
          type: 'add',
          path: `${workspacePath}/package.json`,
          templateFile: '../../packages/@aetherspace/generators/templates/package-json.hbs',
          data: { packageLicense, privateLine },
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

      addOptionalStructure('schemas', '.gitkeep')
      addOptionalStructure('resolvers', '.gitkeep')
      addOptionalStructure('components', '.gitkeep')
      addOptionalStructure('hooks', '.gitkeep')
      addOptionalStructure('screens', '.gitkeep')
      addOptionalStructure('routes', '.gitkeep')
      addOptionalStructure('utils', '.gitkeep')

      // -- Generate --

      return [
        ...actions,
        {
          type: 'open-files-in-vscode',
          paths: [`${workspacePath}/package.json`],
        },
        { type: 'install' },
      ]
    },
  })
}
