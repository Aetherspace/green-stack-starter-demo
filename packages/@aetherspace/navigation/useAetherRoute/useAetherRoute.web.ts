import useSWR from 'swr'
// Schemas
import { AetherProps, z } from '../../schemas'
// Utils
import { isEmpty } from '../../utils'

/** --- useAetherRoute() ----------------------------------------------------------------------- */
/** -i- Get the route data and params for any route related screen */
export const useAetherRoute = <
  PARAMS_DEF extends z.ZodRawShape,
  PROPS_DEF extends z.ZodRawShape,
  PARAMS = z.ZodObject<PARAMS_DEF>['_input'],
  PROPS extends Record<string, unknown> & {
    params?: Record<string, unknown> & PARAMS
    searchParams?: Record<string, unknown> & PARAMS
    segment?: string
  } = AetherProps<z.ZodObject<PROPS_DEF>>
>(
  props: Partial<PROPS>,
  {
    query,
    getGraphqlVars,
    getGraphqlData,
    paramSchema,
    propSchema,
    refetchOnMount,
  }: {
    query: string
    getGraphqlVars: (params: z.infer<z.ZodObject<PARAMS_DEF>>) => unknown
    getGraphqlData: (query: string, variables: PARAMS) => Promise<PROPS>
    paramSchema: z.ZodObject<PARAMS_DEF>
    propSchema: z.ZodObject<PROPS_DEF>
    refetchOnMount?: boolean
  }
) => {
  // Props
  const { params: routeParams, segment, searchParams, ...screenDataProps } = props

  // Vars
  const params = paramSchema.optional().parse({ ...searchParams, ...routeParams })
  const variables = getGraphqlVars(params!)
  const isServer = typeof window === 'undefined'
  const hasScreenProps = !isEmpty(screenDataProps)
  const shouldFetch = isServer || !hasScreenProps || refetchOnMount

  // -- Fetching --

  const swrCall = useSWR<PROPS>(
    shouldFetch ? [query, variables] : null,
    ([gqlQuery, gqlParams]) => {
      return getGraphqlData(gqlQuery, gqlParams)
    }
  )

  // -- Data --

  const { data: swrData, ...swrOptions } = swrCall
  const screenData = { ...screenDataProps, ...swrData } as PROPS

  // -- Return --

  return [screenData, { params, ...swrOptions }] as const
}

/* --- Exports --------------------------------------------------------------------------------- */

export default useAetherRoute
