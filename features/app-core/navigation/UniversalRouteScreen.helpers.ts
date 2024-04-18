'use client'
import type { Query, QueryKey } from '@tanstack/react-query'
import { queryBridge } from '../screens/HomeScreen'

/* --- Types ----------------------------------------------------------------------------------- */

export type QueryFn = (args: Record<string, unknown>) => Promise<Record<string, unknown>>

export type QueryBridgeConfig<Fetcher extends QueryFn> = {
    /** -i- Function to turn any route params into the query key for the `routeDataFetcher()` query */
    routeParamsToQueryKey: (routeParams: Partial<Parameters<Fetcher>[0]>) => QueryKey
    /** -i- Function to turn any route params into the input args for the `routeDataFetcher()` query */
    routeParamsToQueryInput: (routeParams: Partial<Parameters<Fetcher>[0]>) => Parameters<Fetcher>[0]
    /** -i- Fetcher to prefetch data for the Page and QueryClient during SSR, or fetch it clientside if browser / mobile */
    routeDataFetcher: Fetcher
    /** -i- Function transform fetcher data into props */
    fetcherDataToProps?: (data: Awaited<ReturnType<Fetcher>>) => Record<string, unknown>
    /** -i- Initial data provided to the QueryClient */
    initialData?: ReturnType<Fetcher>
}

export type UniversalRouteProps<Fetcher extends QueryFn> = {
    /** -i- Optional params passed by the Next.js app router, in Expo we get these from `useRouteParams()` */
    params?: Partial<Parameters<Fetcher>[0]>
    /** -i- Optional search params passed by the Next.js app router, in Expo we get these from `useRouteParams()` */
    searchParams?: Partial<Parameters<Fetcher>[0]>
    /** -i- Configuration for the query bridge */
    queryBridge: QueryBridgeConfig<Fetcher>
    /** -i- The screen to render for this route */
    routeScreen: React.ComponentType
}

export type HydratedRouteProps<
    QueryBridge extends QueryBridgeConfig<QueryFn>
> = ReturnType<QueryBridge['fetcherDataToProps']> & {
    /** -i- The route key for the query */
    queryKey: QueryKey
    /** -i- The input args for the query */
    queryInput: Parameters<QueryBridge['routeDataFetcher']>[0]
    /** -i- The route params passed by the Next.js app router, in Expo we get these from `useRouteParams()` */
    params: Partial<Parameters<QueryBridge['routeDataFetcher']>[0]>
    /** -i- The search params passed by the Next.js app router, in Expo we get these from `useRouteParams()` */
    searchParams: Partial<Parameters<QueryBridge['routeDataFetcher']>[0]>
}

/** --- createQueryBridge() -------------------------------------------------------------------- */
/** -i- Util to create a typed bridge between a fetcher and a route's props */
export const createQueryBridge = <QueryBridge extends QueryBridgeConfig<QueryFn>>(
    queryBridge: QueryBridge
) => {
    type FetcherData = Awaited<ReturnType<QueryBridge['routeDataFetcher']>>
    type ReturnTypeOfFunction<F, A> = F extends ((args: A) => infer R) ? R : FetcherData
    type RoutePropsFromFetcher = ReturnTypeOfFunction<QueryBridge['fetcherDataToProps'], FetcherData>
    const fetcherDataToProps = queryBridge.fetcherDataToProps || ((data: FetcherData) => data)
    return {
        ...queryBridge,
        fetcherDataToProps: fetcherDataToProps as ((data: FetcherData) => RoutePropsFromFetcher),
    }
}
