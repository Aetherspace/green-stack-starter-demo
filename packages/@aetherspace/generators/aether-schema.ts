/* eslint-disable import/no-anonymous-default-export */
import { PlopTypes } from '@turbo/gen'
// Utils
import { getWorkspaceOptions, validateNonEmptyNoSpaces } from '../scripts/helpers/scriptUtils'

/* --- Disclaimer ------------------------------------------------------------------------------ */

// Learn more about Turborepo Generators at:
// https://turbo.build/repo/docs/core-concepts/monorepos/code-generation

/* --- Constants ------------------------------------------------------------------------------- */

const workspaceOptions = getWorkspaceOptions('')

/** --- Schema Generator ----------------------------------------------------------------------- */
/** -i- Simple generator to add a new zod schema as a single source of truth */
export const registerAetherSchemaGenerator = (plop: PlopTypes.NodePlopAPI) => {
  plop.setGenerator('aether-schema', {
    description: 'Create a new zod schema as a single source of truth',
    prompts: [
      {
        type: 'list',
        name: 'workspaceTarget',
        message: 'Where would you like to add this schema?',
        choices: Object.keys(workspaceOptions),
      },
      {
        type: 'input',
        name: 'schemaName',
        message: 'What is the schema name?',
        validate: validateNonEmptyNoSpaces,
      },
      {
        type: 'input',
        name: 'schemaDescription',
        message: 'Optional description: What data structure does this schema describe?',
      },
      {
        type: 'checkbox',
        name: 'commonFields',
        message: 'Optional examples: Would you like to add any common field definitions?', // prettier-ignore
        choices: ['id', 'slug'],
      },
    ],
    actions: (data) => {
      // Args
      const { workspaceTarget, schemaName, schemaDescription, commonFields } = data!

      // -- Vars --

      const leftoverTitleLines = 100 - schemaName.length - 12 // 100 = max line length, 12 = everything but the title
      const workspacePath = workspaceOptions[workspaceTarget]
      const descriptions = [] as string[]
      const schemaBody = [] as string[]

      let jsDocDescription = ''
      let jsDocTitle = ''
      let describeStatement = ''

      // -- Optionals --

      if (schemaDescription) {
        descriptions.push(`${schemaName}: \`${schemaDescription}\`,`)
        jsDocDescription = `/** -i- ${schemaDescription} */`
        jsDocTitle = `/** --- ${schemaName} ${'-'.repeat(leftoverTitleLines - 1)} */`
        describeStatement = `.describe(d.${schemaName})`
      } else {
        jsDocTitle = `/* --- ${schemaName} ${'-'.repeat(leftoverTitleLines)} */`
      }

      if (commonFields.includes('id')) {
        descriptions.push(`id: \`the unique identifier for this ${schemaName}\`,`)
        schemaBody.push(`id: z.string().id().describe(d.id),`)
      }

      if (commonFields.includes('slug')) {
        descriptions.push(`slug: \`the unique slug for this ${schemaName}\`,`)
        schemaBody.push(`slug: z.string().describe(d.slug),`)
      }

      // -- Actions --

      const actions = [
        {
          type: 'add',
          path: `${workspacePath}/schemas/${schemaName}.ts`,
          templateFile: '../../packages/@aetherspace/generators/templates/basic-schema.hbs',
          data: {
            descriptions: descriptions.join('\n  '),
            jsDocHeader: `${jsDocTitle}\n${jsDocDescription}`,
            schemaName,
            schemaBody: schemaBody.join('\n  '),
            describeStatement,
            jsDocDescription,
          },
        },
        {
          type: 'open-files-in-vscode',
          paths: [`${workspacePath}/schemas/${schemaName}.ts`],
        },
      ] as PlopTypes.ActionType[]

      // -- Generate --

      return actions
    },
  })
}
