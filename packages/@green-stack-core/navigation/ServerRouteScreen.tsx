import { QueryKey, QueryClient, dehydrate, HydrationBoundary } from '@tanstack/react-query'

/* --- Types -------------------------------------------------------------------------------- */

export type ServerRouteScreenProps = {
    routeParams?: Record<string, unknown>
    searchParams?: Record<string, unknown>
    queryConfig: {
        queryKey: QueryKey,
        queryFn: () => Promise<Record<string, any$Unknown>>,
        initialData?: Record<string, any$Unknown>,
    },
    queryInput: Record<string, unknown>,
    fetcherDataToProps: (data: any) => Record<string, unknown>,
    RouteScreen: React.ComponentType<any>,
}

/** --- <ServerRouteScreen/> ---------------------------------------------------------------- */
/** -i- Server Route Wrapper to provide query data to universal route as a Server Component */
export const ServerRouteScreen = async (props: ServerRouteScreenProps) => {
    // Props
    const { queryConfig, queryInput, fetcherDataToProps, RouteScreen, routeParams, searchParams, ...screenProps } = props
    const { queryKey } = queryConfig

    // -- Server Data --

    const queryClient = new QueryClient()
    const fetcherData = await queryClient.fetchQuery(queryConfig)
    const routeDataProps = fetcherDataToProps(fetcherData) as Record<string, unknown>
    const dehydratedState = dehydrate(queryClient)

    // -- Render --
    
    return (
        <HydrationBoundary state={dehydratedState}>
            {!!fetcherData && <div id="ssr-data" data-ssr={JSON.stringify(fetcherData)} />}
            {!!dehydratedState && <div id="ssr-hydration-state" data-ssr={JSON.stringify(dehydratedState)} />}
            <RouteScreen
                {...routeDataProps}
                queryKey={queryKey}
                queryInput={queryInput}
                refetchInitialData={() => Promise.resolve(routeDataProps)}
                {...screenProps}
                params={routeParams}
                searchParams={searchParams}
            />
        </HydrationBoundary>
    )
}
