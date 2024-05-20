'use client'
import { useQuery } from '@tanstack/react-query'
import type { UniversalRouteProps, QueryFn } from './UniversalRouteScreen.helpers'
import { useRouteParams } from './useRouteParams'

/** --- <UniversalRouteScreen/> -------------------------------------------------------------------- */
/** -i- Universal Route Wrapper to provide query data on mobile, the browser and during server rendering */
export const UniversalRouteScreen = <
    ARGS extends Record<string, unknown> = Record<string, unknown>,
    RES extends Record<string, unknown> = Record<string, unknown>,
>(props: UniversalRouteProps<ARGS, RES>) => {
    // Props
    const { params: routeParams, searchParams, queryBridge, routeScreen: RouteScreen, ...screenProps } = props
    const { routeParamsToQueryKey, routeParamsToQueryInput, routeDataFetcher } = queryBridge
    const fetcherDataToProps = queryBridge.fetcherDataToProps || ((data: Awaited<ReturnType<QueryFn<ARGS, RES>>>) => data)

    // Hooks
    const expoRouterParams = useRouteParams(props)

    // Vars
    const queryParams = { ...routeParams, ...searchParams, ...expoRouterParams }
    const queryKey = routeParamsToQueryKey(queryParams as any)
    const queryInput = routeParamsToQueryInput(queryParams as any)

    // -- Query --

    const queryConfig = {
        queryKey,
        queryFn: async () => await routeDataFetcher(queryInput),
        initialData: queryBridge.initialData as Awaited<RES>,
    }

    // -- Mobile --
    
    const { data: fetcherData } = useQuery(queryConfig)
    const routeDataProps = fetcherDataToProps(fetcherData as Awaited<RES>) as Record<string, unknown>

    return (
        <RouteScreen
            {...routeDataProps}
            queryKey={queryKey}
            queryInput={queryInput}
            {...screenProps} // @ts-ignore
            params={routeParams}
            searchParams={searchParams}
        />
    )
}
