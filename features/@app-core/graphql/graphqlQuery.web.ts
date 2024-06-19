import { print } from 'graphql/language/printer'
import type { TadaDocumentNode, ResultOf } from 'gql.tada'
import { warnOnce } from '@green-stack/utils/commonUtils'
import type { QueryConfig } from './graphqlQuery.types'
import { appConfig } from '../appConfig'

/** --- graphqlQuery --------------------------------------------------------------------------- */
/** -i- Isomorphic graphql request, uses the graphql endpoint in browser & mobile, but the executable schema serverside */
export const graphqlQuery = async <T extends TadaDocumentNode, R = ResultOf<T>>(query: T, config?: QueryConfig<T>) => {
    // Config
    const { variables, headers, graphqlEndpoint } = config || {}

    // Flags
    const isServer = typeof window === 'undefined'

    // Vars
    const queryString = print(query)

    // -- Server: Execute query with lazy loaded schema --

    if (isServer) {
        try {
            // Lazy imports to avoid build issues
            const [
                { graphql },
                { executableSchema },
            ]  = await Promise.all([
                import('graphql'),
                import('./schema'),
            ])
            // 💡 You might want to build the server-only request context here
            warnOnce('-i- graphqlQuery() called serverside without request context set up.')
            // Execute query with the executable schema
            const { data } = await graphql({
                schema: executableSchema,
                source: queryString,
                variableValues: variables,
            }) as { data: R }
            // Return resolver response
            return data
        } catch (error: any) {
            throw new Error(error)
        }
    }

    // -- Browser: Execute query with fetch --

    try {
        const { graphURL } = appConfig
        const fetchURL = graphqlEndpoint || graphURL
        const res = await fetch(fetchURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...headers,
            },
            body: JSON.stringify({ query: queryString, variables }),
        })
        const { data, errors } = await res.json()
        if (errors) throw new Error(errors[0].message)
        return data as R
    } catch (error: any) {
        throw new Error(error)
    }
}

