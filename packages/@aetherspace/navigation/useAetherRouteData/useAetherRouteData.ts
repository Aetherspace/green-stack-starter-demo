import useSWR from 'swr'
import { useRouteParams } from '../useRouteParams'
import { z, AetherProps } from 'aetherspace/schemas'
import { getGlobal, isEmpty } from 'aetherspace/utils'
import { AetherFetcherOptions } from '../fetchAetherProps'
import { useAetherContext } from '../../context/AetherContextManager/useAetherContext'

/** --- useAetherRouteData() ----------------------------------------------------------------------- */
/** -i- Get the route data and params for any route related screen */
export const useAetherRouteData = <
  PARAMS_DEF extends z.ZodRawShape,
  PROPS_DEF extends z.ZodRawShape,
  PARAMS = z.ZodObject<PARAMS_DEF>['_input'],
  PROPS extends Record<string, unknown> & {
    params?: Record<string, unknown> & PARAMS
    segment?: string
  } = AetherProps<z.ZodObject<PROPS_DEF>>,
>(
  props: Partial<PROPS>,
  {
    graphqlQuery,
    getGraphqlVars,
    getGraphqlData,
    paramsSchema,
    propsSchema,
    refetchOnMount,
    headers,
  }: {
    graphqlQuery: string
    getGraphqlVars: (params: z.infer<z.ZodObject<PARAMS_DEF>>) => unknown
    getGraphqlData: (
      graphqlQuery: string,
      fetcherOptions: AetherFetcherOptions<PARAMS>
    ) => Promise<PROPS>
    paramsSchema: z.ZodObject<PARAMS_DEF>
    propsSchema: z.ZodObject<PROPS_DEF>
    refetchOnMount?: boolean
    headers?: Record<string, string>
  }
) => {
  // Props
  const { params: routeParams, segment, ...screenDataProps } = props

  // Hooks
  const { params: navParams } = useRouteParams(props)
  const { getAuthToken: getContextToken } = useAetherContext()

  // Vars
  const params = paramsSchema.optional().parse({ ...routeParams, ...navParams })
  const variables = getGraphqlVars(params!)
  const shouldFetch = isEmpty(screenDataProps) || refetchOnMount

  // -- Fetching --

  const swrCall = useSWR<PROPS>(
    shouldFetch ? [graphqlQuery, variables] : null,
    Object.assign(
      async ([gqlQuery, gqlParams], config?: AetherFetcherOptions) => {
        const getAuthToken = getContextToken || getGlobal('getAuthToken')
        const configHeaders = config?.headers || {}
        const finalHeaders = { ...configHeaders, ...headers }
        if (!finalHeaders.Authorization && typeof getAuthToken === 'function') {
          const token = await getAuthToken()
          if (token) finalHeaders.Authorization = `Bearer ${token}`
        }
        return getGraphqlData(gqlQuery, { ...config, variables: gqlParams, headers: finalHeaders })
      },
      // -i- Mark as 'aetherFetcher' so any SWR middleware knows the call structure to manipulate
      { isAetherFetcher: true }
    )
  )

  // -- Data --

  const { data: swrData, ...swrOptions } = swrCall
  const screenData = propsSchema.applyDefaults({ ...screenDataProps, ...swrData }) as PROPS

  // -- Return --

  return [screenData, { params, ...swrOptions }] as const
}

/* --- Exports --------------------------------------------------------------------------------- */

export default useAetherRouteData
