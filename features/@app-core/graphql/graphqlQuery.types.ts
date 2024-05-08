import type { TadaDocumentNode, VariablesOf } from 'gql.tada'

export type QueryConfig<T extends TadaDocumentNode> = {
    variables?: VariablesOf<T>
    headers?: Record<string, string>
    graphqlEndpoint?: string
}
