import { gql } from '@apollo/client'
import { GraphQLJSON, GraphQLJSONObject } from 'graphql-type-json'
import { aetherSchemaPlugin } from './aetherSchemaPlugin'
import { AetherSchemaType } from './aetherSchemas'
import { isEmpty } from '../utils/commonUtils'

/* --- Scalars --------------------------------------------------------------------------------- */

const CUSTOM_SCALARS = ['scalar Date', 'scalar JSON', 'scalar JSONObject']

/* --- Types ----------------------------------------------------------------------------------- */

type ResolverSchemaType = AetherSchemaType & {
  schemaName: string
}

type ResolverFnType = ((...args: unknown[]) => Promise<unknown>) & {
  argSchema: ResolverSchemaType
  resSchema: ResolverSchemaType
  isMutation?: boolean
}

export type ResolverMapType = {
  [key: string]: ResolverFnType
}

type ResolverConfigType = {
  resolverName: string
  argSchema: ResolverSchemaType
  resSchema: ResolverSchemaType
  resolver?: ResolverFnType
}

const SCHEMA_PRIMITIVE_MAPPER = Object.freeze({
  AetherString: 'String',
  AetherNumber: 'Float',
  AetherBoolean: 'Boolean',
  AetherDate: 'Date',
  AetherId: 'ID',
  AetherColor: 'String',
  AetherEnum: 'String',
})

/* --- Example Input --------------------------------------------------------------------------- */

// ⇣⇣⇣⇣⇣⇣⇣⇣ results of `yarn collect-resolvers` ⇣⇣⇣⇣⇣⇣⇣⇣

// {
//   myResolver: ResolverFnType,
//   anotherResolver: ResolverFnType,
// }

// -i- https://main--62c9a236ee16e6611d719e94.chromatic.com/?path=/story/aetherspace-graphql-data-fetching--page

/* --- Example Output -------------------------------------------------------------------------- */

// ⇣⇣⇣⇣⇣⇣⇣⇣ results of `aetherGraphSchema(...)` ⇣⇣⇣⇣⇣⇣⇣⇣

// {
//   typeDefs: `
//     input MyResolverArgs {
//       """The description from { someArg: z.string().describe(...) }"""
//       someArg: String!
//     }
//
//     type MyResolverResponse {
//       """The description from { someResponseProp: z.string().describe(...) }"""
//       someResponseProp: String!
//     }
//
//     ...
//
//     type Query {
//       myResolver(args: MyResolverArgs): MyResolverResponse
//       anotherResolver(args: AnotherResolverArgs): AnotherResolverResponse
//     }
//   `,
//   resolvers: {
//     Query: {
//       myResolver: ResolverFnType,
//       anotherResolver: ResolverFnType,
//     },
//     Mutation: { ... }
//   }
// }

// -i- https://the-guild.dev/graphql/tools/docs/generate-schema#makeexecutableschema

/* --- aetherSchemaDefinitions() --------------------------------------------------------------- */

const aetherSchemaDefinitions = (aetherSchema: ResolverSchemaType, prefix = 'type') => {
  let schemaDefinitions = [] as string[]
  // Normalizators
  const normalizeSchemaName = (schemaName) => {
    const isInputSchemaName = ['Input', 'Args', 'Arguments'].some((term) => schemaName.includes(term)) // prettier-ignore
    if (prefix === 'input' && !isInputSchemaName) return `${schemaName}Input`
    return schemaName
  }
  // Definition factory
  const createDefinition = (gqlType) => (name, schemaConfig) => {
    const isNullable = [schemaConfig.isOptional, schemaConfig.isNullable].includes(true)
    const requiredState = isNullable ? '' : '!'
    const description = schemaConfig.description ? `"""\n        ${schemaConfig.description}\n        """\n        ` : '' // prettier-ignore
    if (gqlType === 'Schema' && schemaConfig?.schemaName) {
      schemaDefinitions = [...schemaDefinitions, ...aetherSchemaDefinitions(schemaConfig, prefix)]
      const schemaName = normalizeSchemaName(schemaConfig?.schemaName)
      return [description, `${name}: ${schemaName}${requiredState}`].join('')
    } else if (gqlType === 'Array') {
      const primitiveType = SCHEMA_PRIMITIVE_MAPPER[schemaConfig.schema.aetherType]
      const arrayEntryType = primitiveType || normalizeSchemaName(schemaConfig.schema?.schemaName)
      if (!primitiveType) {
        schemaDefinitions = [
          ...schemaDefinitions,
          ...aetherSchemaDefinitions(schemaConfig.schema, prefix),
        ]
      }
      return [description, `${name}: [${arrayEntryType}]${requiredState}`].join('')
    }
    return [description, `${name}: ${gqlType}${requiredState}`].join('')
  }
  // Schema is known, build graphql definitions from them
  const schemaMap = aetherSchemaPlugin(aetherSchema, {
    // -- Primitives --
    AetherString: createDefinition('String'),
    AetherNumber: createDefinition('Float'),
    AetherBoolean: createDefinition('Boolean'),
    AetherDate: createDefinition('Date'),
    // -- Single values --
    AetherId: createDefinition('ID'),
    AetherColor: createDefinition('String'),
    AetherEnum: createDefinition('String'),
    // -- Objectlikes --
    AetherSchema: createDefinition('Schema'),
    AetherObject: createDefinition('Schema'),
    // -- Arraylikes --
    AetherArray: createDefinition('Array'),
    // -- Complex types --
    AetherUnion: createDefinition('JSON'),
    AetherTuple: createDefinition('JSON'),
  })
  // Transform into usable graphql definitions
  const finalSchemaName = normalizeSchemaName(aetherSchema?.schemaName)
  const finalPrefix = finalSchemaName.includes('Input') ? 'input' : prefix
  const schemaDef = `
    ${finalPrefix} ${finalSchemaName} {
        ${Object.values(schemaMap).join('\n        ')}
    }
  `
  // Remove excess spacing & newlines
  if (!schemaDef.includes('undefined')) {
    const defWithoutLeadingSpaces = schemaDef.split('\n    ').join('\n')
    const defWithoutLeadingNewLines = defWithoutLeadingSpaces.replace('\n', '')
    const defWithoutEndingNewLines = defWithoutLeadingNewLines.replace('}\n  ', '}')
    schemaDefinitions.push(defWithoutEndingNewLines)
  } else {
    console.log(schemaDef, aetherSchema?.schemaName, aetherSchema)
  }
  // Return all definitions
  return schemaDefinitions
}

/* --- aetherGraphDefinitions() ---------------------------------------------------------------- */

const aetherGraphDefinitions = (resolverConfigs: ResolverConfigType[]) => {
  const typeDefs = resolverConfigs.reduce((acc, { argSchema, resSchema }) => {
    const argDefinitions = aetherSchemaDefinitions(argSchema, 'input')
    const resDefinitions = aetherSchemaDefinitions(resSchema)
    return [...acc, ...argDefinitions, ...resDefinitions] as string[]
  }, [] as string[])
  return typeDefs.flat()
}

/** --- createResolverDefinition() ------------------------------------------------------------- */
/** -i- Create the resolver definition for the GraphQL schema file, meaning:
 ** the name of the resolver, then the arguments (if any), then the return type.
 ** example input = myResolver (an aetherResolver() with input & output schemas)
 ** example output = 'myResolver(args: !ResolverArgs): ResolverResponse' */
const createResolverDefinition = (resolverConfig: ResolverConfigType) => {
  // Destructure the resolver config
  const { resolverName, argSchema, resSchema } = resolverConfig
  // If there are no arguments, we don't need to add the parenthesis around the arguments
  const hasArguments = argSchema && Object.values(argSchema.schema).length > 0
  // If there are arguments, we need to add the exclamation point to the end of the arguments
  const onlyHasOptionalArgs = !hasArguments || Object.values(argSchema?.schema).every((arg) => arg.isOptional === true) // prettier-ignore
  const argRequireState = onlyHasOptionalArgs ? '' : '!'
  // If there are arguments, we need to add the arguments to the resolver definition
  const argDef = hasArguments ? `(args: ${argSchema.schemaName}${argRequireState})` : ''
  // Return the resolver definition
  const resDef = resSchema.schemaName
  return `${resolverName}${argDef}: ${resDef}`
}

/** --- aetherGraphSchema() -------------------------------------------------------------------- */
/** -i- Turn a mapped object of aetherResolvers into an executable GraphQL schema */
const aetherGraphSchema = (
  aetherResolvers: ResolverMapType,
  {
    customSchemaDefinitions = '',
    customQueryDefinitions = '',
    customMutationDefinitions = '',
    customScalars = {},
    customQueries = {},
    customMutations = {},
  }: {
    customSchemaDefinitions?: string
    customQueryDefinitions?: string
    customMutationDefinitions?: string
    customScalars?: Record<string, (...args: unknown[]) => Promise<unknown>>
    customQueries?: Record<string, (...args: unknown[]) => Promise<unknown>>
    customMutations?: Record<string, (...args: unknown[]) => Promise<unknown>>
  } = {}
) => {
  const resolverEntries = Object.entries(aetherResolvers)
  const resolverConfigs = resolverEntries.map(([resolverName, resolver]) => ({
    resolverName,
    argSchema: resolver?.argSchema,
    resSchema: resolver?.resSchema,
    isMutation: resolver?.isMutation,
    resolver,
  }))

  const mutationConfigs = resolverConfigs.filter((resolverConfig) => resolverConfig.isMutation)
  const mutationDefs = [customMutationDefinitions, ...mutationConfigs.map(createResolverDefinition)].filter(Boolean) // prettier-ignore
  const hasMutations = mutationDefs.length > 0 || !isEmpty(customMutations)

  const queryConfigs = resolverConfigs.filter((resolverConfig) => !resolverConfig.isMutation)
  const queryDefs = [customQueryDefinitions, ...queryConfigs.map(createResolverDefinition)].filter(Boolean) // prettier-ignore
  const hasQueries = queryDefs.length > 0 || !isEmpty(customQueries)

  const mutation = hasMutations ? `type Mutation {\n    ${mutationDefs.join('\n    ')}\n}` : ''
  const query = hasQueries ? `type Query {\n    ${queryDefs.join('\n    ')}\n}` : ''

  const dataTypeDefs = Array.from(new Set(aetherGraphDefinitions(resolverConfigs)))
  const allTypeDefs = [
    customSchemaDefinitions,
    ...CUSTOM_SCALARS,
    ...dataTypeDefs,
    mutation,
    query,
  ].filter(Boolean)

  const typeDefsString = allTypeDefs.join('\n\n')
  const graphqlSchemaDefs = gql`${typeDefsString}` // prettier-ignore

  const rebuildFromConfig = (handlers, { resolverName, resolver }) => ({
    ...handlers,
    [resolverName]: resolver,
  })

  const queryResolvers = queryConfigs.reduce(rebuildFromConfig, customQueries)
  const mutationResolvers = mutationConfigs.reduce(rebuildFromConfig, customMutations)

  return {
    typeDefs: graphqlSchemaDefs,
    resolvers: {
      JSON: GraphQLJSON,
      JSONObject: GraphQLJSONObject,
      ...customScalars,
      ...(hasQueries ? { Query: queryResolvers } : {}),
      ...(hasMutations ? { Mutation: mutationResolvers } : {}),
    },
  }
}

/* --- Exports --------------------------------------------------------------------------------- */

export { aetherGraphSchema }
export default aetherGraphSchema
