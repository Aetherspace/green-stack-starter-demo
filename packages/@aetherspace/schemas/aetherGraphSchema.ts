import { gql } from '@apollo/client'
import { aetherSchemaPlugin } from './aetherSchemaPlugin'
import { AetherSchemaType } from './aetherSchemas'

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
  AetherNumber: 'Number',
  AetherBoolean: 'Boolean',
  AetherId: 'String',
  AetherColor: 'String',
  AetherDate: 'Date',
  AetherEnum: 'String',
})

/* --- aetherSchemaDefinitions() --------------------------------------------------------------- */

const aetherSchemaDefinitions = (aetherSchema: ResolverSchemaType, prefix = 'type') => {
  let schemaDefinitions = [] as string[]
  // Definition factory
  const createDefinition = (gqlType) => (name, schemaConfig) => {
    const isNullable = [schemaConfig.optional, schemaConfig.nullable].includes(true)
    const requiredState = isNullable ? '' : '!'
    const description = schemaConfig.description ? `"""${schemaConfig.description}"""\n` : ''
    if (gqlType === 'Schema') {
      schemaDefinitions = [...schemaDefinitions, ...aetherSchemaDefinitions(schemaConfig)]
      return [description, `${name}: ${schemaConfig.schemaName}${requiredState}`].join('')
    } else if (gqlType === 'Array') {
      const primitiveType = SCHEMA_PRIMITIVE_MAPPER[schemaConfig.schema.aetherType]
      const arrayEntryType = primitiveType || schemaConfig.schema.schemaName
      if (!primitiveType) {
        schemaDefinitions = [...schemaDefinitions, ...aetherSchemaDefinitions(schemaConfig.schema)]
      }
      return [description, `${name}: [${arrayEntryType}]${requiredState}`].join('')
    }
    return [description, `${name}: ${gqlType}${requiredState}`].join('')
  }
  // Schema is known, build graphql definitions from them
  const schemaMap = aetherSchemaPlugin(aetherSchema, {
    // -- Primitives --
    AetherString: createDefinition('String'),
    AetherNumber: createDefinition('Number'),
    AetherBoolean: createDefinition('Boolean'),
    // -- Single values --
    AetherId: createDefinition('String'),
    AetherColor: createDefinition('String'),
    AetherDate: createDefinition('Date'),
    AetherEnum: createDefinition('String'),
    // -- Objectlikes --
    AetherSchema: createDefinition('Schema'),
    AetherObject: createDefinition('Schema'),
    // -- Arraylikes --
    AetherArray: createDefinition('Array'),
    AetherCollection: createDefinition('Array'),
  })
  // Transform into usable graphql definitions
  const schemaDef = `
    ${prefix} ${aetherSchema.schemaName} {
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
    console.log(schemaDef, aetherSchema.schemaName, aetherSchema)
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

/* --- createResolverDefinition() -------------------------------------------------------------- */

const createResolverDefinition = (resolverConfig: ResolverConfigType) => {
  const { resolverName, argSchema, resSchema } = resolverConfig
  const hasArguments = Object.values(argSchema.schema).length > 0 // @ts-ignore
  const onlyHasOptionalArgs = !hasArguments || Object.values(argSchema?.schema).every((arg) => arg.optional === true) // prettier-ignore
  const argRequireState = onlyHasOptionalArgs ? '' : '!'
  const argDef = hasArguments ? `(args: ${argSchema.schemaName}${argRequireState})` : ''
  const resDef = resSchema.schemaName
  return `${resolverName}${argDef}: ${resDef}`
}

/* --- aetherGraphSchema() --------------------------------------------------------------------- */

const aetherGraphSchema = (aetherResolvers: ResolverMapType) => {
  const resolverEntries = Object.entries(aetherResolvers)
  const resolverConfigs = resolverEntries.map(([resolverName, resolver]) => ({
    resolverName,
    argSchema: resolver?.argSchema,
    resSchema: resolver?.resSchema,
    isMutation: !!resolver?.isMutation,
    resolver,
  }))
  const mutationConfigs = resolverConfigs.filter((resolverConfig) => resolverConfig.isMutation)
  const queryConfigs = resolverConfigs.filter((resolverConfig) => !resolverConfig.isMutation)
  const dataTypeDefs = Array.from(new Set(aetherGraphDefinitions(resolverConfigs)))
  const mutationDefs = mutationConfigs.map(createResolverDefinition)
  const queryDefs = queryConfigs.map(createResolverDefinition)
  const hasMutations = mutationDefs.length > 0
  const hasQueries = queryDefs.length > 0
  const mutation = hasMutations ? `type Mutation {\n    ${mutationDefs.join('\n    ')}\n}` : ''
  const query = hasQueries ? `type Query {\n    ${queryDefs.join('\n    ')}\n}` : ''
  const allTypeDefs = [...dataTypeDefs, mutation, query].filter(Boolean)
  const graphqlSchemaDefs = gql`${allTypeDefs.join('\n\n')}` // prettier-ignore
  const rebuildFromConfig = (handlers, { resolverName, resolver }) => ({
    ...handlers,
    [resolverName]: resolver,
  })
  const queryResolvers = queryConfigs.reduce(rebuildFromConfig, {})
  const mutationResolvers = mutationConfigs.reduce(rebuildFromConfig, {})
  return {
    typeDefs: graphqlSchemaDefs,
    resolvers: {
      ...(hasQueries ? { Query: queryResolvers } : {}),
      ...(hasMutations ? { Mutations: mutationResolvers } : {}),
    },
  }
}

/* --- Exports --------------------------------------------------------------------------------- */

export { aetherGraphSchema }
export default aetherGraphSchema
