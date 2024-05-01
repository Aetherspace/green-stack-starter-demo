'use client'
import { use, useState, useEffect } from 'react'
import { useQueryClient, useQuery, dehydrate, HydrationBoundary } from '@tanstack/react-query'
import type { UniversalRouteProps, QueryFn } from './UniversalRouteScreen.helpers'
import { useRouteParams } from './useRouteParams'
import { isExpoWebLocal } from '../appConfig'

/* --- Helpers --------------------------------------------------------------------------------- */

const getSSRData = () => {
    const $ssrData = document.getElementById('ssr-data')
    const ssrDataText = $ssrData?.getAttribute('data-ssr')
    const ssrData = ssrDataText ? (JSON.parse(ssrDataText) as Record<string, any>) : null
    return ssrData
}

const getDehydratedSSRState = () => {
    const $ssrHydrationState = document.getElementById('ssr-hydration-state')
    const ssrHydrationStateText = $ssrHydrationState?.getAttribute('data-ssr')
    const ssrHydrationState = ssrHydrationStateText ? (JSON.parse(ssrHydrationStateText) as Record<string, any>) : null
    return ssrHydrationState
}

/** --- <UniversalRouteScreen/> ---------------------------------------------------------------- */
/** -i- Universal Route Wrapper to provide query data on mobile, the browser and during server rendering */
export const UniversalRouteScreen = <Fetcher extends QueryFn>(props: UniversalRouteProps<Fetcher>) => {
    // Props
    const { params: routeParams, searchParams, queryBridge, routeScreen: RouteScreen, ...screenProps } = props
    const { routeParamsToQueryKey, routeParamsToQueryInput, routeDataFetcher } = queryBridge
    const fetcherDataToProps = queryBridge.fetcherDataToProps || ((data: ReturnType<Fetcher>) => data)

    // Hooks
    const nextRouterParams = useRouteParams(props)

    // Context
    const queryClient = useQueryClient()

    // State
    const [hydratedData, setHydratedData] = useState<Record<string, any> | null>(null)
    const [hydratedQueries, setHydratedQueries] = useState<Record<string, any> | null>(null)

    // Vars
    const isBrowser = typeof window !== 'undefined'
    const queryParams = { ...routeParams, ...searchParams, ...nextRouterParams }
    const queryKey = routeParamsToQueryKey(queryParams)
    const queryInput = routeParamsToQueryInput(queryParams)

    // -- Effects --

    useEffect(() => {
        const ssrData = getSSRData()
        if (ssrData) setHydratedData(ssrData) // Save the SSR data to state, removing the SSR data from the DOM
        const hydratedQueyClientState = getDehydratedSSRState()
        if (hydratedQueyClientState) setHydratedQueries(hydratedQueyClientState) // Save the hydrated state to state, removing the hydrated state from the DOM
    }, [])

    // -- Query --

    const queryConfig = {
        queryKey,
        queryFn: async () => await routeDataFetcher(queryInput),
        initialData: queryBridge.initialData,
    }
    
    // -- Browser --

    if (isBrowser) {
        const hydrationData = hydratedData || getSSRData()
        const hydrationState = hydratedQueries || getDehydratedSSRState()
        const renderHydrationData = !!hydrationData && !hydratedData // Only render the hydration data if it's not already in state

        const { data: fetcherData } = useQuery({
            ...queryConfig,
            initialData: isExpoWebLocal ? undefined : {
                ...queryConfig.initialData,
                ...hydrationData,
            },
            refetchOnMount: isExpoWebLocal,
        })
        const routeDataProps = fetcherDataToProps(fetcherData as Awaited<ReturnType<Fetcher>>) as Record<string, unknown> // prettier-ignore

        return (
            <HydrationBoundary state={hydrationState}>
                {renderHydrationData && <div id="ssr-data" data-ssr={JSON.stringify(fetcherData)} />}
                {renderHydrationData && <div id="ssr-hydration-state" data-ssr={JSON.stringify(hydrationState)} />}
                <RouteScreen
                    {...routeDataProps}
                    queryKey={queryKey}
                    queryInput={queryInput}
                    {...screenProps} // @ts-ignore
                    params={routeParams}
                    searchParams={searchParams}
                />
            </HydrationBoundary>
        )
    }

    // -- Server --

    const fetcherData = use(queryClient.fetchQuery(queryConfig)) as Awaited<ReturnType<Fetcher>>
    const routeDataProps = fetcherDataToProps(fetcherData) as Record<string, unknown>
    const dehydratedState = dehydrate(queryClient)
    
    return (
        <HydrationBoundary state={dehydratedState}>
            {!!fetcherData && <div id="ssr-data" data-ssr={JSON.stringify(fetcherData)} />}
            {!!dehydratedState && <div id="ssr-hydration-state" data-ssr={JSON.stringify(dehydratedState)} />}
            <RouteScreen
                {...routeDataProps}
                queryKey={queryKey}
                queryInput={queryInput}
                {...screenProps} // @ts-ignore
                params={routeParams}
                searchParams={searchParams}
            />
        </HydrationBoundary>
    )
}
