'use client'
import type { QueryKey } from '@tanstack/react-query'

/* --- Types ----------------------------------------------------------------------------------- */

export type QueryFn<
    ARGS extends Record<string, unknown> = Record<string, unknown>,
    RES extends Record<string, unknown> = Record<string, unknown>
> = (args: ARGS) => Promise<RES>

export type QueryBridgeConfig<
    ARGS extends Record<string, unknown> = Record<string, unknown>,
    RES extends Record<string, unknown> = Record<string, unknown>,
    Fetcher extends QueryFn<ARGS, RES> = QueryFn<ARGS, RES>,
    FetcherArgs = Parameters<Fetcher>[0],
    FetcherToProps extends (data: Awaited<ReturnType<Fetcher>>) => unknown = (data: Awaited<ReturnType<Fetcher>>) => Awaited<ReturnType<Fetcher>>,
    ParamsToQueryKey extends (routeParams: Partial<FetcherArgs>) => QueryKey = (routeParams: Partial<FetcherArgs>) => QueryKey,
    ParamsToQueryInput extends (routeParams: Partial<FetcherArgs>) => FetcherArgs = (routeParams: Partial<FetcherArgs>) => FetcherArgs
> = {
    /** -i- Function to turn any route params into the query key for the `routeDataFetcher()` query */
    routeParamsToQueryKey: ParamsToQueryKey
    /** -i- Function to turn any route params into the input args for the `routeDataFetcher()` query */
    routeParamsToQueryInput: ParamsToQueryInput
    /** -i- Fetcher to prefetch data for the Page and QueryClient during SSR, or fetch it clientside if browser / mobile */
    routeDataFetcher: Fetcher
    /** -i- Function transform fetcher data into props */
    fetcherDataToProps?: FetcherToProps
    /** -i- Initial data provided to the QueryClient */
    initialData?: ReturnType<Fetcher>
}

export type UniversalRouteProps<
    ARGS extends Record<string, unknown> = Record<string, unknown>,
    RES extends Record<string, unknown> = Record<string, unknown>,
    Fetcher extends QueryFn<ARGS, RES> = QueryFn<ARGS, RES>,
    FetcherArgs = Parameters<Fetcher>[0],
    FetcherToProps extends (data: Awaited<ReturnType<Fetcher>>) => unknown = (data: Awaited<ReturnType<Fetcher>>) => Awaited<ReturnType<Fetcher>>,
    ParamsToQueryKey extends (routeParams: Partial<FetcherArgs>) => QueryKey = (routeParams: Partial<FetcherArgs>) => QueryKey,
    ParamsToQueryInput extends (routeParams: Partial<FetcherArgs>) => FetcherArgs = (routeParams: Partial<FetcherArgs>) => FetcherArgs
> = {
    /** -i- Optional params passed by the Next.js app router, in Expo we get these from `useRouteParams()` */
    params?: Partial<ARGS>
    /** -i- Optional search params passed by the Next.js app router, in Expo we get these from `useRouteParams()` */
    searchParams?: Partial<ARGS>
    /** -i- Configuration for the query bridge */
    queryBridge: QueryBridgeConfig<ARGS, RES, Fetcher, FetcherArgs, FetcherToProps, ParamsToQueryKey, ParamsToQueryInput>
    /** -i- The screen to render for this route */
    routeScreen: React.ComponentType
}

export type HydratedRouteProps<
    QueryBridge extends {
        fetcherDataToProps: (fetcherData: any) => any,
        routeDataFetcher: (...args: any[]) => Promise<any>,
        routeParamsToQueryKey: any,
        routeParamsToQueryInput: any
        initialData?: any
    }
> = ReturnType<Exclude<QueryBridge['fetcherDataToProps'], undefined>> & {
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
export const createQueryBridge = <
    ARGS extends Record<string, unknown> = Record<string, unknown>,
    RES extends Record<string, unknown> = Record<string, unknown>,
    Fetcher extends QueryFn<ARGS, RES> = QueryFn<ARGS, RES>,
    FetcherArgs = Parameters<Fetcher>[0],
    FetcherData = Awaited<ReturnType<QueryBridgeConfig<ARGS, RES, Fetcher>['routeDataFetcher']>>,
    FetcherToProps extends (fetcherData: Awaited<ReturnType<Fetcher>>) => unknown = (fetcherData: Awaited<ReturnType<Fetcher>>) => Awaited<ReturnType<Fetcher>>,
    ParamsToQueryKey extends (routeParams: Partial<FetcherArgs>) => QueryKey = (routeParams: Partial<FetcherArgs>) => QueryKey,
    ParamsToQueryInput extends (routeParams: Partial<FetcherArgs>) => FetcherArgs = (routeParams: Partial<FetcherArgs>) => FetcherArgs
>(
    queryBridge: QueryBridgeConfig<ARGS, RES, Fetcher, FetcherArgs, FetcherToProps, ParamsToQueryKey, ParamsToQueryInput>
) => {
    const fetcherDataToProps = queryBridge.fetcherDataToProps || ((fetcherData: FetcherData) => fetcherData)
    return {
        ...queryBridge,
        fetcherDataToProps: fetcherDataToProps as FetcherToProps,
    }
}
