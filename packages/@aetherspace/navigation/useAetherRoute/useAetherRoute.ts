import useSWR from 'swr'
// Navigation
import { useRouteParams } from '../useRouteParams'
// Schemas
import { z, AetherProps } from 'aetherspace/schemas'

/** --- useAetherRoute() ----------------------------------------------------------------------- */
/** -i- Get the route data and params for any route related screen */
export const useAetherRoute = <
  PARAMS_DEF extends z.ZodRawShape,
  PROPS_DEF extends z.ZodRawShape,
  PARAMS = z.ZodObject<PARAMS_DEF>['_input'],
  PROPS extends Record<string, unknown> & {
    params?: Record<string, unknown> & PARAMS
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
  const { params: navParams } = useRouteParams(props)

  // Vars
  const params = paramSchema.optional().parse({ ...routeParams, ...navParams })
  const variables = getGraphqlVars(params!)

  // -- Fetching --

  const swrCall = useSWR<PROPS>([query, variables], ([gqlQuery, gqlParams]) => {
    return getGraphqlData(gqlQuery, gqlParams)
  })

  // -- Data --

  const { data: swrData, ...swrOptions } = swrCall
  const screenData = { ...screenDataProps, ...swrData } as PROPS

  // -- Return --

  return [screenData, { params, ...swrOptions }] as const
}

/* --- Exports --------------------------------------------------------------------------------- */

export default useAetherRoute
