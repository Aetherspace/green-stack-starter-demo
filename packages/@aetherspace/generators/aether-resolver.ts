/* eslint-disable import/no-anonymous-default-export */
import { PlopTypes } from '@turbo/gen'
import {
  getWorkspaceOptions,
  matchMethods,
  camelToDash,
  uppercaseFirstChar,
  includesOption,
  validateNonEmptyNoSpaces,
  createAutocompleteSource,
  getAvailableSchemas,
  normalizeName,
  replaceMany,
} from '../scripts/helpers/scriptUtils'

/* --- Disclaimer ------------------------------------------------------------------------------ */

// Learn more about Turborepo Generators at:
// https://turbo.build/repo/docs/core-concepts/monorepos/code-generation

/* --- Constants ------------------------------------------------------------------------------- */

const workspaceOptions = getWorkspaceOptions('')
const availableSchemas = getAvailableSchemas('')

const LINES = 100 - 13 // -i- JSDoc: 100 = max length, 13 = everything but the title & '-' lines

const GraphQlResolverOption = 'GraphQL resolver'
const GetApiRouteOption = 'GET api route'
const PostApiRouteOption = 'POST api route'
const PutApiRouteOption = 'PUT api route'
const DeleteApiRouteOption = 'DELETE api route'
const CustomSchemaOption = 'Custom Args & Response Schemas (skips schema pickers)'
const FormHookOption = 'Typed formState hook (for resolver args)'

const RESOLVER_GENERATABLES = Object.freeze({
  [GraphQlResolverOption]: 'graphResolver',
  [GetApiRouteOption]: 'GET',
  [PostApiRouteOption]: 'POST',
  [PutApiRouteOption]: 'PUT',
  [DeleteApiRouteOption]: 'DELETE',
  [CustomSchemaOption]: 'schemas',
  [FormHookOption]: 'formHook',
  // "Typed fetching function, e.g. fetchResources()": 'fetch',
  // "Typed fetcher hook, e.g. useFetchResources()": 'fetchHook',
})

const GraphqlQueryOption = 'Query >>> for retrieving data'
const GraphqlMutationOption = 'Mutation >>> for adding / updating / deleting data'

const NewArgsSchemaOption = "I'd like to create a new schema for the resolver arguments"
const NewResponseSchemaOption = "I'd like to create a new schema for the resolver response"

/** --- Resolver Generator --------------------------------------------------------------------- */
/** -i- Resolver generator to add a new data resolver and related schemas, API routes and fetching logic */
export const registerAetherResolverGenerator = (plop: PlopTypes.NodePlopAPI) => {
  plop.setGenerator('aether-resolver', {
    description: 'Create a new data resolver and related schemas, API routes and fetching logic',
    prompts: [
      {
        type: 'list',
        name: 'workspaceTarget',
        message: 'Where would you like to add this resolver?',
        choices: Object.keys(workspaceOptions),
      },
      {
        type: 'input',
        name: 'resolverName',
        message: 'What will you name the resolver function? (e.g. "doSomething")',
        validate: validateNonEmptyNoSpaces,
        transformer: normalizeName,
      },
      {
        type: 'input',
        name: 'resolverDescription',
        message: 'Optional description: What will this data resolver do?',
      },
      {
        type: 'list',
        name: 'resolverTarget',
        message: 'Will this resolver query or mutate data?',
        choices: [GraphqlQueryOption, GraphqlMutationOption],
        default: (data) => {
          const { resolverDescription } = data
          const resolverName = normalizeName(data.resolverName)
          const mutationTriggerWords = ['update', 'edit', 'delete', 'remove', 'add', 'create']
          const checkingString = `${resolverName} ${resolverDescription}`.toLowerCase()
          const isMutatable = mutationTriggerWords.some((word) => checkingString.includes(word))
          return isMutatable ? GraphqlMutationOption : GraphqlQueryOption
        },
      },
      {
        type: 'checkbox',
        name: 'generatables',
        message: 'What would you like to generate linked to this resolver?',
        choices: ({ resolverTarget }) => {
          const isQuery = resolverTarget === GraphqlQueryOption
          if (isQuery) return [GraphQlResolverOption, GetApiRouteOption, CustomSchemaOption]
          return [
            GraphQlResolverOption,
            PostApiRouteOption,
            PutApiRouteOption,
            DeleteApiRouteOption,
            CustomSchemaOption,
            FormHookOption,
          ]
        },
        default: ({ resolverTarget }) => {
          const isQuery = resolverTarget === GraphqlQueryOption
          if (isQuery) return [GraphQlResolverOption, GetApiRouteOption]
          return [GraphQlResolverOption, PostApiRouteOption, FormHookOption]
        },
      },
      {
        type: 'autocomplete',
        name: 'argsSchemaTarget',
        message: 'Which schema should we use for the resolver arguments?', // @ts-ignore
        source: createAutocompleteSource([NewArgsSchemaOption, ...Object.keys(availableSchemas)]),
        when: (data) => !['Schemas'].some(includesOption(data.generatables)),
      },
      {
        type: 'input',
        name: 'argsSchemaName',
        message: 'What will you call this new args schema?',
        default: (data) => `${uppercaseFirstChar(normalizeName(data.resolverName))}Args`,
        validate: validateNonEmptyNoSpaces,
        when: (data) => data.argsSchemaTarget === NewArgsSchemaOption,
        transformer: normalizeName,
      },
      {
        type: 'autocomplete',
        name: 'resSchemaTarget',
        message: 'Which schema should we use for the resolver response?', // @ts-ignore
        source: createAutocompleteSource([
          NewResponseSchemaOption,
          ...Object.keys(availableSchemas),
        ]),
        default: (data) => data.argsSchemaTarget,
        when: (data) => !['Schemas'].some(includesOption(data.generatables)),
      },
      {
        type: 'input',
        name: 'resSchemaName',
        message: 'What will you call this new response schema?',
        default: (data) => `${uppercaseFirstChar(normalizeName(data.resolverName))}Response`,
        when: (data) => data.resSchemaTarget === NewResponseSchemaOption,
        validate: validateNonEmptyNoSpaces,
        transformer: normalizeName,
      },
      {
        type: 'input',
        name: 'apiPath',
        message: 'What API path would you like to use for REST? (e.g. "/api/some/resolver/[slug]")',
        default: (data) => {
          const resolverName = normalizeName(data.resolverName)
          const workspacePath = workspaceOptions[data.workspaceTarget]
          const workspaceName = workspacePath.split('/')[1].replace('-core', '').replace('-page', '') // prettier-ignore
          return `/api/${workspaceName}/${camelToDash(resolverName)}`
        },
        when: (data) => ['api route', 'GraphQL'].some(includesOption(data.generatables)),
        validate: (input) => {
          if (!input.startsWith('/api/')) return 'API paths must start with "/api/"'
          if (!input.includes('/')) return 'API paths must include at least one "/"'
          if (input.includes(' ')) return 'API paths cannot include spaces, use dashes "-" instead'
          if (input.includes('//')) return 'API paths cannot include double slashes "//"'
          if (input.includes('.')) return 'API paths cannot include periods "." or file extensions'
          return validateNonEmptyNoSpaces(input)
        },
      },
      {
        type: 'input',
        name: 'formHookName',
        message: 'What should the form hook be called?',
        default: (data) => {
          const resolverName = normalizeName(data.resolverName)
          const formHookName = `use${uppercaseFirstChar(normalizeName(resolverName))}Form`
          return replaceMany(formHookName, ['Add', 'Create', 'Edit', 'Update', 'Delete', 'Resolver'], '') // prettier-ignore
        },
        when: (data) => ['formState hook'].some(includesOption(data.generatables)),
        validate: validateNonEmptyNoSpaces,
        transformer: normalizeName,
      },
    ],
    actions: (data) => {
      // Args
      const { workspaceTarget, apiPath, resolverTarget, resolverDescription } = data || {} // prettier-ignore
      const generatables = data!.generatables.map((option) => RESOLVER_GENERATABLES[option])
      const workspacePath = workspaceOptions[workspaceTarget]
      const resolverType = resolverTarget === GraphqlQueryOption ? 'query' : 'mutation'
      const argsSchemaConfig = availableSchemas[data!.argsSchemaTarget]
      const resSchemaConfig = availableSchemas[data!.resSchemaTarget]
      const isLinkedToSchemas = argsSchemaConfig || resSchemaConfig || data!.argsSchemaName || data!.resSchemaName // prettier-ignore

      // -- Vars --

      const resolverName = normalizeName(data!.resolverName)
      const ResolverName = uppercaseFirstChar(resolverName)
      const resolverBridgeName = `${ResolverName}DataBridge`
      const descriptions = [] as string[]

      const argsSchemaDescription = `Args for the ${resolverName}() resolver`
      const argsSchemaName = `${ResolverName}Args`
      descriptions.push(`${argsSchemaName}: '${argsSchemaDescription}',`)
      const argsSchemaLines = '-'.repeat(LINES - argsSchemaName.length)
      const jsDocArgsTitle = `/** --- ${argsSchemaName} ${argsSchemaLines} */`
      const jsDocArgsDescription = `/** -i- ${argsSchemaDescription} */`
      const jsDocArgsHeader = `${jsDocArgsTitle}\n${jsDocArgsDescription}`
      const argsSchemaBody = [`exampleArg: z.string().default('Hello World'), // TODO: Add your own fields`] // prettier-ignore
      const argsDescriptionStatement = `.describe(d.${argsSchemaName})`

      const resSchemaDescription = `Response for the ${resolverName}() resolver`
      const resSchemaName = `${ResolverName}Response`
      descriptions.push(`${resSchemaName}: '${resSchemaDescription}',`)
      const resSchemaLines = '-'.repeat(LINES - resSchemaName.length)
      const jsDocResTitle = `/** --- ${resSchemaName} ${resSchemaLines} */`
      const jsDocResDescription = `/** -i- ${resSchemaDescription} */`
      const jsDocResHeader = `${jsDocResTitle}\n${jsDocResDescription}`
      const resSchemaBody = [`exampleField: z.string().default('Hello World'), // TODO: Add your own fields`] // prettier-ignore
      const resDescriptionStatement = `.describe(d.${resSchemaName})`

      const apiBridgeName = `${resolverName}DataBridge`
      const jsDocResolverConfigTitle = `/** --- ${apiBridgeName} ${'-'.repeat(LINES - apiBridgeName.length)} */` // prettier-ignore
      const jsDocResolverConfigDescription = `/** -i- Aetherspace API Config for ${resolverName}() */` // prettier-ignore
      const jsDocResolverConfigHeader = `${jsDocResolverConfigTitle}\n${jsDocResolverConfigDescription}` // prettier-ignore
      const hasGraphResolver = generatables.includes('graphResolver')
      const apiPathStatements = [''] as string[]
      const allowedMethods = generatables.filter(matchMethods(['GET', 'POST', 'PUT', 'DELETE'])) as string[] // prettier-ignore
      if (hasGraphResolver) allowedMethods.unshift('GRAPHQL')
      const allowGET = allowedMethods.includes('GET')
      const allowPOST = allowedMethods.includes('POST')
      const allowPUT = allowedMethods.includes('PUT')
      const allowDELETE = allowedMethods.includes('DELETE')

      const jsDocResolverTitle = `/** --- ${resolverName} ${'-'.repeat(LINES - resolverName.length)} */` // prettier-ignore
      const jsDocResolverDescription = `/** -i- ${resolverDescription || 'TODO: Add description'} */` // prettier-ignore
      const jsDocResolverHeader = `${jsDocResolverTitle}\n${jsDocResolverDescription}`

      const apiStatements = [] as string[]
      const serverUtilImports = [] as string[]

      // -- Helpers --

      const addApiMethod = (method: string) => {
        apiStatements.push(`export const ${method} = makeNextRouteHandler(${resolverName})\n`)
      }

      // -- Optionals --

      const extraActions = [] as PlopTypes.ActionType[]
      const extraFilesToOpen = [] as string[]
      const requiresApiRoute = !!apiPath || allowGET || allowPOST || allowPUT || hasGraphResolver
      const requiresFormHook = generatables.includes('formHook')

      if (requiresApiRoute) {
        // Add API route instructions to the resolver config
        const apiRoutePath = `${workspacePath}/routes/${apiPath}/route.ts`
        apiPathStatements.push(`apiPath: '${apiPath}',`)
        const allowedMethodsStringArray = `${allowedMethods.map((m) => `'${m}'`).join(', ')}`
        apiPathStatements.push(`allowedMethods: [${allowedMethodsStringArray}],`)

        // Add API route file action data
        const traversalParts = apiPath.split('/').map(() => '..')
        const resolverImportPath = `${traversalParts.join('/')}/resolvers/${resolverName}`

        // Figure out API statements
        if (allowGET || allowPOST || allowPUT || allowDELETE) {
          serverUtilImports.push('makeNextRouteHandler')
          const apiPathTitle = `/** --- ${apiPath} ${'-'.repeat(LINES - apiPath.length)} */\n`
          apiStatements.push(apiPathTitle)
          if (allowGET) addApiMethod('GET')
          if (allowPOST) addApiMethod('POST')
          if (allowPUT) addApiMethod('PUT')
          if (allowDELETE) addApiMethod('DELETE')
        }

        // Add GraphQL resolver?
        if (hasGraphResolver) {
          serverUtilImports.push('makeGraphQLResolver')
          apiStatements.push(`/* --- GraphQL ${'-'.repeat(LINES - 'GraphQL'.length + 1)} */\n`)
          apiStatements.push(`export const graphResolver = makeGraphQLResolver(${resolverName})\n`)
        }

        // Add API route file action
        extraActions.push({
          type: 'add',
          path: apiRoutePath,
          templateFile: '../../packages/@aetherspace/generators/templates/resolver-route.hbs',
          data: {
            resolverName,
            resolverImportPath,
            serverUtilImports: serverUtilImports.join(', '),
            apiStatements: apiStatements.join('\n'),
          },
        })
      }

      // Add form hook?
      if (requiresFormHook) {
        const formHookName = normalizeName(data!.formHookName)
        const formHookDivider = `/* --- ${formHookName}() ${'-'.repeat(LINES - formHookName.length - 1)} */` // prettier-ignore
        extraActions.push({
          type: 'add',
          path: `${workspacePath}/forms/${formHookName}.ts`,
          templateFile: '../../packages/@aetherspace/generators/templates/resolver-form-hook.hbs',
          data: {
            ResolverName,
            formHookName,
            formHookDivider,
            workspaceName: '..',
          },
        })
        extraFilesToOpen.push(`${workspacePath}/forms/${formHookName}.ts`)
      }

      // Add args schema?
      if (data!.argsSchemaName) {
        const ArgsSchemaName = uppercaseFirstChar(normalizeName(data!.argsSchemaName))
        const jsDocTitle = `/* --- ${ArgsSchemaName} ${'-'.repeat(
          LINES - ArgsSchemaName.length
        )} */`
        extraActions.push({
          type: 'add',
          path: `${workspacePath}/schemas/${ArgsSchemaName}.ts`,
          templateFile: '../../packages/@aetherspace/generators/templates/basic-schema.hbs',
          data: {
            descriptions: `slug: \`unique slug related to the requested data\`,`,
            jsDocHeader: `${jsDocTitle}\n`,
            schemaName: ArgsSchemaName,
            schemaBody: `slug: z.string().default('some-slug').describe(d.slug), // TODO: Replace this args structure with your own fields`,
            describeStatement: ``,
            jsDocDescription: ``,
          },
        } as PlopTypes.ActionType)
        extraFilesToOpen.push(`${workspacePath}/schemas/${ArgsSchemaName}.ts`)
      }

      // Add response schema?
      if (data!.resSchemaName) {
        const ResSchemaName = uppercaseFirstChar(normalizeName(data!.resSchemaName))
        const jsDocTitle = `/* --- ${ResSchemaName} ${'-'.repeat(LINES - ResSchemaName.length)} */`
        extraActions.push({
          type: 'add',
          path: `${workspacePath}/schemas/${ResSchemaName}.ts`,
          templateFile: '../../packages/@aetherspace/generators/templates/basic-schema.hbs',
          data: {
            descriptions: `slug: \`unique slug related to the requested data\`,`,
            jsDocHeader: `${jsDocTitle}\n`,
            schemaName: ResSchemaName,
            schemaBody: `slug: z.string().default('some-slug').describe(d.slug), // TODO: Replace this response structure with your own fields`,
            describeStatement: ``,
            jsDocDescription: ``,
          },
        } as PlopTypes.ActionType)
        extraFilesToOpen.push(`${workspacePath}/schemas/${ResSchemaName}.ts`)
      }

      // -- Data Bridge --

      let dataBridgeStep = {
        type: 'add',
        path: `${workspacePath}/schemas/${resolverBridgeName}.ts`,
        templateFile: '../../packages/@aetherspace/generators/templates/resolver-bridge.hbs',
        data: {
          descriptions: descriptions.join('\n  '),
          resolverName,
          ResolverName,
          resolverType,
          ResolverType: uppercaseFirstChar(resolverType),
          // - Args -
          jsDocArgsHeader,
          argsSchemaBody: argsSchemaBody.join('\n  '),
          jsDocArgsDescription,
          argsDescriptionStatement,
          // - Response -
          jsDocResponseHeader: jsDocResHeader,
          responseSchemaBody: resSchemaBody.join('\n  '),
          jsDocResponseDescription: jsDocResDescription,
          responseDescriptionStatement: resDescriptionStatement,
          // - Config -
          jsDocResolverConfigHeader,
          apiPathStatements: apiPathStatements.join('\n  '),
        },
      } as PlopTypes.ActionType

      if (isLinkedToSchemas) {
        const ArgsSchemaName = uppercaseFirstChar(normalizeName(argsSchemaConfig?.schemaName || data!.argsSchemaName)) // prettier-ignore
        const ResSchemaName = uppercaseFirstChar(normalizeName(resSchemaConfig?.schemaName || data!.resSchemaName)) // prettier-ignore
        const argsSchemaWorkspace = argsSchemaConfig?.workspaceName || '..'
        const resSchemaWorkspace = resSchemaConfig?.workspaceName || '..'
        const argsSchemaImportStatement = `import { ${ArgsSchemaName} } from '${argsSchemaWorkspace}/schemas/${ArgsSchemaName}'`
        const resSchemaImportStatement = `import { ${ResSchemaName} } from '${resSchemaWorkspace}/schemas/${ResSchemaName}'`
        dataBridgeStep = {
          type: 'add',
          path: `${workspacePath}/schemas/${resolverBridgeName}.ts`,
          templateFile: '../../packages/@aetherspace/generators/templates/resolver-bridge-w-schemas.hbs', // prettier-ignore
          data: {
            descriptions: descriptions.join('\n  '),
            resolverName,
            ResolverName,
            resolverType,
            ResolverType: uppercaseFirstChar(resolverType),
            // - Args -
            ArgsSchemaName,
            argsSchemaImportStatement,
            InputSchemaName: argsSchemaConfig ? `${ArgsSchemaName}Input` : ArgsSchemaName,
            inputSchemaTransforms: argsSchemaConfig ? `.extendSchema('${ArgsSchemaName}Input', {})` : '', // prettier-ignore
            ResSchemaName,
            resSchemaImportStatement: argsSchemaImportStatement === resSchemaImportStatement ? '' : resSchemaImportStatement, // prettier-ignore
            // - Config -
            jsDocResolverConfigHeader,
            apiPathStatements: apiPathStatements.join('\n  '),
          },
        }
      }

      // -- Generate --

      return [
        dataBridgeStep,
        {
          type: 'add',
          path: `${workspacePath}/resolvers/${resolverName}.ts`,
          templateFile: '../../packages/@aetherspace/generators/templates/basic-resolver.hbs',
          data: {
            resolverName,
            ResolverName,
            jsDocResolverHeader,
          },
        },
        ...extraActions,
        {
          type: 'collect-resolvers',
        },
        {
          type: 'link-routes',
        },
        {
          type: 'open-files-in-vscode',
          paths: [
            `${workspacePath}/schemas/${resolverBridgeName}.ts`,
            `${workspacePath}/resolvers/${resolverName}.ts`,
            ...extraFilesToOpen,
          ],
        },
      ]
    },
  })
}
