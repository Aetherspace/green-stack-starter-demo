import { z, AetherParams, AetherProps, AetherSchemaType } from './aetherSchemas'
import { fetchAetherProps, AetherFetcherOptions } from '../navigation/fetchAetherProps'
import type { HintedKeys } from '../types/typeHelpers'
import { isEmpty } from '../utils/commonUtils'

/** --- renderGraphqlQuery() ------------------------------------------------------------------- */
/** -i- Accepts a resolverName, argsSchema and responseSchema and spits out a graphql query that stops at 3 levels of depth */
export const renderGraphqlQuery = <SA extends z.ZodRawShape, SR extends z.ZodRawShape>({
  resolverName,
  resolverArgsName,
  resolverType,
  argsSchema,
  responseSchema,
  maxFieldDepth = 5,
}: {
  resolverName: string
  resolverArgsName: string
  resolverType: 'query' | 'mutation'
  argsSchema: z.ZodObject<SA>
  responseSchema: z.ZodObject<SR>
  maxFieldDepth?: number
}) => {
  const argsSchemaName = argsSchema.schemaName

  let query = `${resolverType} ${resolverName}($${resolverArgsName}: ${argsSchemaName}!) {\n  {{body}}\n}` // prettier-ignore
  query = query.replace('{{body}}', `${resolverName}(args: $${resolverArgsName}) {\n{{fields}}\n  }`) // prettier-ignore
  const responseSchemaDefs = responseSchema.introspect()

  const renderFields = (schema: AetherSchemaType, depth: number) => {
    const fieldKeys = Object.keys(schema.schema)
    const fieldEntries = fieldKeys.map((fieldKey) => {
      const fieldConfig = schema.schema[fieldKey] as AetherSchemaType
      const fieldType = fieldConfig.type
      const spacing = '  '.repeat(depth)

      const isNonObjectLike = !['array', 'object'].includes(fieldType) // @ts-ignore
      const isNonObjectArray = fieldType === 'array' && !['array', 'object'].includes(fieldConfig.schema.type) // prettier-ignore
      const hasNoSubFields = isNonObjectLike || isNonObjectArray
      if (hasNoSubFields) return `${spacing}${fieldKey}`
      if (depth > maxFieldDepth) return null

      let objectSchema = fieldConfig?.schema as AetherSchemaType
      if (objectSchema.schema?.schemaName) objectSchema = objectSchema.schema as AetherSchemaType
      return `${spacing}${fieldKey} {\n${renderFields(objectSchema, depth + 1)}\n${spacing}}`
    })

    return fieldEntries.filter(Boolean).join('\n')
  }

  const fields = renderFields(responseSchemaDefs, 2)
  query = query.replace('{{fields}}', fields)
  return query
}

/** --- createDataBridge() --------------------------------------------------------------------- */
/** -i- Create a reusable bridge object between a resolver and a page */
export const createDataBridge = <
  RN extends string,
  SA extends z.ZodRawShape,
  SR extends z.ZodRawShape,
  SU extends z.ZodRawShape = SA,
  SP extends z.ZodRawShape = SR,
  AT extends AetherParams<z.ZodObject<SA>> = AetherParams<z.ZodObject<SA>>,
  RT extends AetherProps<z.ZodObject<SR>> = AetherProps<z.ZodObject<SR>>,
  UT extends AetherParams<z.ZodObject<SU>> = AetherParams<z.ZodObject<SU>>,
  PT extends AetherProps<z.ZodObject<SP>> = AetherProps<z.ZodObject<SP>>,
  RAN extends `${RN}Args` | HintedKeys = `${RN}Args`,
>({
  resolverName,
  resolverType: customResolverType,
  resolverArgsName = `${resolverName}Args`,
  argsSchema,
  responseSchema,
  paramsSchema = argsSchema as unknown as z.ZodObject<SU>,
  propsSchema = responseSchema as unknown as z.ZodObject<SP>,
  paramsToArgs,
  responseToProps,
  apiPath,
  allowedMethods,
  graphqlQuery: customGraphqlQuery = '',
  refetchOnMount,
  backgroundColor,
  dynamic = 'auto',
  ...restOptions
}: {
  resolverName: RN
  resolverType?: 'query' | 'mutation'
  resolverArgsName?: RAN | HintedKeys
  argsSchema: z.ZodObject<SA>
  responseSchema: z.ZodObject<SR>
  paramsSchema?: z.ZodObject<SU>
  propsSchema?: z.ZodObject<SP>
  paramsToArgs?: (navParams: any) => AT
  responseToProps?: (response: RT) => PT
  apiPath?: string
  allowedMethods?: ('GRAPHQL' | 'GET' | 'POST' | 'PUT' | 'DELETE')[]
  graphqlQuery?: string
  refetchOnMount?: boolean
  backgroundColor?: string
  dynamic?: 'auto' | 'force-dynamic' | 'error' | 'force-static'
  isMutation?: boolean
}) => {
  // Vars & Flags
  const constainsMutationKeyword = customGraphqlQuery?.includes?.('mutation')
  const resolverType = customResolverType || (constainsMutationKeyword ? 'mutation' : 'query')
  const isMutation = restOptions.isMutation || resolverType === 'mutation' || constainsMutationKeyword // prettier-ignore

  // -- Error Checks --

  if (!resolverName) throw new Error('Missing resolverName in createDataBridge() call')
  if (!argsSchema) throw new Error('Missing argsSchema in createDataBridge() call')
  if (!responseSchema) throw new Error('Missing responseSchema in createDataBridge() call')

  // -- Build default graphql query? --

  const defaultGraphqlQuery = renderGraphqlQuery({
    resolverName,
    resolverArgsName,
    resolverType,
    argsSchema,
    responseSchema,
  })

  const graphqlQuery = customGraphqlQuery || defaultGraphqlQuery

  // -- Params to Args --

  const defaultParamsToArgs = (navParams: UT) => {
    return argsSchema.applyDefaults(paramsSchema.applyDefaults(navParams))
  }
  const paramsToArgsFn = paramsToArgs || defaultParamsToArgs

  const getGraphqlVars = (navParams: UT) => {
    const args = paramsToArgsFn(navParams)
    return { [resolverArgsName]: args } as Record<RAN | HintedKeys, AT>
  }

  // -- Graphql call to Props --

  const defaultResponseToProps = (response: RT) => response
  const responseToPropsFn = (responseToProps || defaultResponseToProps) as (response: RT) => PT

  const getGraphqlData = Object.assign(
    async (queryKey: string, fetcherOptions?: AetherFetcherOptions<AT>) => {
      const { variables: queryVariables, headers } = fetcherOptions || {}
      const queryData = queryKey || graphqlQuery // @ts-ignore
      const hasQueryVariables = !isEmpty(queryVariables) && !isEmpty(queryVariables[resolverArgsName]) // prettier-ignore
      const finalVariables = !hasQueryVariables ? null : queryVariables
      const queryInput = finalVariables || getGraphqlVars({} as UT)
      const result = await fetchAetherProps(queryData, { variables: queryInput, headers })
      const data = result.data
      return responseToPropsFn(data[resolverName] as RT)
    },
    // -i- Mark as 'aetherFetcher' so any SWR middleware knows the second arg is a fetcherOptions object
    { isAetherFetcher: true }
  )

  // -- Return Data Bridge --

  return {
    resolverName,
    resolverType,
    resolverArgsName,
    paramsSchema,
    argsSchema,
    responseSchema,
    propsSchema,
    paramsToArgs: paramsToArgsFn,
    getGraphqlVars,
    /** -i- Fetcher to use with SWR */
    getGraphqlData,
    responseToProps: responseToPropsFn,
    apiPath,
    allowedMethods,
    graphqlQuery,
    isMutation,
    refetchOnMount,
    backgroundColor,
    dynamic,
    PARAMS: null as unknown as UT,
    ARGS: null as unknown as AT,
    RES: null as unknown as RT,
    PROPS: null as unknown as PT,
  }
}
