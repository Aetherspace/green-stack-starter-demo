/* eslint-disable import/no-anonymous-default-export */
import { PlopTypes } from '@turbo/gen'
import {
  getWorkspaceOptions,
  getAvailableSchemas,
  getAvailableDataBridges,
  uppercaseFirstChar,
  createAutocompleteSource,
  validateNonEmptyNoSpaces,
  normalizeName,
} from '../scripts/helpers/scriptUtils'

/* --- Disclaimer ------------------------------------------------------------------------------ */

// Learn more about Turborepo Generators at:
// https://turbo.build/repo/docs/core-concepts/monorepos/code-generation

/* --- Constants ------------------------------------------------------------------------------- */

const workspaceOptions = getWorkspaceOptions('')

const availableSchemas = getAvailableSchemas('')

const availableDataBridges = getAvailableDataBridges('', 'mutation', true)

const LINES = 100 - 12 // -i- 100 = max length, 12 = everything but the title & '-' lines

const schemaTypeOptions = {
  ["No, I'll create my own form state schema"]: 'new',
  ['Yes, use an existing schema']: 'existing-schema',
  ['Yes, use an existing data bridge to integrate state for a resolver']: 'bridge',
}

/** --- Resolver Generator --------------------------------------------------------------------- */
/** -i- Resolver generator to add a new data resolver and related schemas, API routes and fetching logic */
export const registerAetherFormGenerator = (plop: PlopTypes.NodePlopAPI) => {
  plop.setGenerator('aether-form', {
    description: 'Create a new form state hooks and based on a schema or resolver args',
    prompts: [
      {
        type: 'list',
        name: 'workspaceTarget',
        message: 'Where would you like to add this resolver?',
        choices: Object.keys(workspaceOptions),
      },
      {
        type: 'list',
        name: 'schemaType',
        message: 'Would you like to provide a schema for this form?',
        choices: Object.keys(schemaTypeOptions),
      },
      {
        type: 'autocomplete',
        name: 'schemaTarget',
        message: 'Which known schema is this form state for?', // @ts-ignore
        source: createAutocompleteSource(Object.keys(availableSchemas)),
        when: (data) => schemaTypeOptions[data.schemaType] === 'existing-schema',
      },
      {
        type: 'autocomplete',
        name: 'bridgeTarget',
        message: 'Which resolver arguments is this form state for?', // @ts-ignore
        source: createAutocompleteSource(Object.keys(availableDataBridges)),
        when: (data) => schemaTypeOptions[data.schemaType] === 'bridge',
      },
      {
        type: 'input',
        name: 'formHookName',
        message: 'What should the form hook be called?',
        default: (data) => {
          const schemaConfig = availableSchemas[data.schemaTarget]
          const bridgeConfig = availableDataBridges[data.bridgeTarget]
          const schemaName = schemaConfig?.schemaName || bridgeConfig?.resolverName || 'useSomeFormState' // prettier-ignore
          let formHookName = `use${uppercaseFirstChar(schemaName)}FormState`
          formHookName = formHookName.replace('Edit', '').replace('Resolver', '').replace('Update', '') // prettier-ignore
          return normalizeName(formHookName)
        },
        validate: validateNonEmptyNoSpaces,
        transformer: normalizeName,
      },
    ],
    actions: (data) => {
      // Args
      const { workspaceTarget, schemaTarget, bridgeTarget } = data || {}
      const formHookName = normalizeName(data!.formHookName)
      const workspacePath = workspaceOptions[workspaceTarget]
      const dataBridgeConfig = availableDataBridges[bridgeTarget]
      const schemaConfig = availableSchemas[schemaTarget]
      const schemaName = schemaConfig?.schemaName || formHookName.replace('use', '')

      // Vars
      const formHookDivider = `/* --- ${formHookName}() ${'-'.repeat(LINES - formHookName.length - 2)} */` // prettier-ignore

      // -- All Possible Steps --

      const addSimpleFormState = {
        type: 'add',
        path: `${workspacePath}/hooks/${formHookName}.ts`,
        templateFile: '../../packages/@aetherspace/generators/templates/form-hook.hbs',
        data: {
          formHookName,
          formHookDivider,
          schemaName,
          SchemaName: uppercaseFirstChar(schemaName),
        },
      }

      const addSchemaFormState = {
        type: 'add',
        path: `${workspacePath}/hooks/${formHookName}.ts`,
        templateFile: '../../packages/@aetherspace/generators/templates/schema-form-hook.hbs',
        data: {
          formHookName,
          formHookDivider,
          schemaName,
          SchemaName: uppercaseFirstChar(schemaName),
          schemaImportPath: `${schemaConfig?.workspaceName}/schemas/${schemaName}`,
        },
      }

      const addResolverFormState = {
        type: 'add',
        path: `${workspacePath}/hooks/${formHookName}.ts`,
        templateFile: '../../packages/@aetherspace/generators/templates/resolver-form-hook.hbs',
        data: {
          formHookName,
          formHookDivider,
          ResolverName: uppercaseFirstChar(dataBridgeConfig?.resolverName),
          workspaceName: dataBridgeConfig?.workspaceName,
        },
      }

      const openFilesInVSCode = {
        type: 'open-files-in-vscode',
        paths: [`${workspacePath}/hooks/${formHookName}.ts`],
      }

      // -- Generate with Schema Form State Schema --

      if (schemaConfig) return [addSchemaFormState, openFilesInVSCode]

      // -- Generate with Resolver Args Form State Schema --

      if (dataBridgeConfig) return [addResolverFormState, openFilesInVSCode]

      // -- Generate with Dummy Form State Schema --

      return [addSimpleFormState, openFilesInVSCode]
    },
  })
}
