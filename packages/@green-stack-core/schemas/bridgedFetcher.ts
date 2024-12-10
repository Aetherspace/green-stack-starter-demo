import type { TadaDocumentNode, VariablesOf, ResultOf } from 'gql.tada'
import { graphqlQuery } from '@app/core/graphql/graphqlQuery'

/** --- bridgedFetcher() ----------------------------------------------------------------------- */
/** -i- Helper to create a typed fetcher from config created by `createDataBridge()` */
export const bridgedFetcher = <
    ResolverName extends string,
    BridgeQuery extends TadaDocumentNode | unknown,
    CustomQuery extends TadaDocumentNode | null = null,
    FinalQuery extends TadaDocumentNode | unknown = CustomQuery extends null ? BridgeQuery : CustomQuery,
>({
    allowedMethods,
    getGraphqlQuery,
    graphqlQuery: customQuery,
}: {
    resolverName: ResolverName
    getGraphqlQuery: () => BridgeQuery
    graphqlQuery?: CustomQuery
    allowedMethods?: ('GRAPHQL' | 'GET' | 'POST' | 'PUT' | 'DELETE')[]
    [key: string]: any
}) => {
    // Log errors if the bridge is incompatible
    const hasGraphqlQuery = !!customQuery || !!getGraphqlQuery
    if (!allowedMethods?.includes('GRAPHQL') || !hasGraphqlQuery) {
        throw new Error('bridgedFetcher() with incompatible bridge. Please add "GRAPHQL" to the allowedMethods array in the DataBridge.')
    }
    // If a custom query is provided, use that instead
    if (customQuery) {
        // return customQuery as FinalQuery
        const query = customQuery as unknown as Exclude<FinalQuery, unknown>
        return (async (variables: VariablesOf<Exclude<FinalQuery, unknown>>) => {
            const result = await graphqlQuery(query, { variables })
            return result
        }) as (variables: VariablesOf<FinalQuery>) => Promise<ResultOf<FinalQuery>>
    }
    // Otherwise, use the query from the bridge
    const query = getGraphqlQuery() as unknown as Exclude<FinalQuery, unknown>
    return (async (variables: VariablesOf<Exclude<FinalQuery, unknown>>) => {
        const result = await graphqlQuery(query, { variables })
        return result as ResultOf<FinalQuery>
    }) as (variables: VariablesOf<FinalQuery>) => Promise<ResultOf<FinalQuery>>
}
