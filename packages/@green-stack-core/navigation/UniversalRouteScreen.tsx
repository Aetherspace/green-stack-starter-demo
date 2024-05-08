'use client'
import { useQuery } from '@tanstack/react-query'
import type { UniversalRouteProps, QueryFn } from './UniversalRouteScreen.helpers'
import { useRouteParams } from './useRouteParams'

/** --- <UniversalRouteScreen/> -------------------------------------------------------------------- */
/** -i- Universal Route Wrapper to provide query data on mobile, the browser and during server rendering */
export const UniversalRouteScreen = <Fetcher extends QueryFn>(props: UniversalRouteProps<Fetcher>) => {
    // Props
    const { params: routeParams, searchParams, queryBridge, routeScreen: RouteScreen, ...screenProps } = props
    const { routeParamsToQueryKey, routeParamsToQueryInput, routeDataFetcher } = queryBridge
    const fetcherDataToProps = queryBridge.fetcherDataToProps || ((data: ReturnType<Fetcher>) => data)

    // Hooks
    const expoRouterParams = useRouteParams(props)

    // Vars
    const queryParams = { ...routeParams, ...searchParams, ...expoRouterParams }
    const queryKey = routeParamsToQueryKey(queryParams)
    const queryInput = routeParamsToQueryInput(queryParams)

    // -- Query --

    const queryConfig = {
        queryKey,
        queryFn: async () => await routeDataFetcher(queryInput),
        initialData: queryBridge.initialData,
    }

    // -- Mobile --
    
    const { data: fetcherData } = useQuery(queryConfig)
    const routeDataProps = fetcherDataToProps(fetcherData) as Record<string, unknown>

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
