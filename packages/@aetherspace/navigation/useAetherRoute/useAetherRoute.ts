import useSWR from 'swr'
// Navigation
import { useAetherNav } from '../AetherLink/'
// Schemas
import { z } from 'aetherspace/schemas'

/* --- useAetherRoute() ------------------------------------------------------------------------- */

export const useAetherRoute = <
  PARAMS_DEF extends z.ZodRawShape,
  PROPS_DEF extends z.ZodRawShape,
  PARAMS = z.infer<z.ZodObject<PARAMS_DEF>>,
  PROPS extends Record<string, unknown> & {
    params?: Record<string, unknown> & PARAMS
    segment?: string
  } = z.infer<z.ZodObject<PROPS_DEF>>
>(
  props: Partial<PROPS>,
  {
    query,
    getGraphqlVars,
    getGraphqlData,
    paramSchema,
    propSchema,
  }: {
    query: string
    getGraphqlVars: (params: z.infer<z.ZodObject<PARAMS_DEF>>) => unknown
    getGraphqlData: (query: string, variables: PARAMS) => Promise<PROPS>
    paramSchema: z.ZodObject<PARAMS_DEF>
    propSchema: z.ZodObject<PROPS_DEF>
  }
) => {
  // Props
  const { params: routeParams, segment, ...screenDataProps } = props

  // Hooks
  const { params: navParams, urlParams, ...navigationOptions } = useAetherNav(props)

  // Vars
  const params = paramSchema.parse({ ...routeParams, ...navParams })
  const variables = getGraphqlVars(params)

  // -- Fetching --

  const swrCall = useSWR<PROPS>([query, variables], ([gqlQuery, gqlParams]) => {
    return getGraphqlData(gqlQuery, gqlParams)
  })

  // -- Data --

  const { data: swrData, ...swrOptions } = swrCall
  const screenData = { ...screenDataProps, ...swrData } as PROPS

  // -- Return --

  return [
    screenData,
    { params, urlParams: urlParams as PARAMS, ...swrOptions, ...navigationOptions },
  ] as const
}

/* --- Exports --------------------------------------------------------------------------------- */

export default useAetherRoute
