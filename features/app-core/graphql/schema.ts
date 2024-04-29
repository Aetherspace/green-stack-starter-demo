import { mergeResolvers } from '@graphql-tools/merge'
import { makeExecutableSchema } from '@graphql-tools/schema'
import { gql } from 'graphql-tag'
import type { RequestContext } from '../middleware/createRequestContext'
import { typeDefs } from './typeDefs'
import { healthCheck } from '../resolvers/healthCheck'

/** --- createResolver() ----------------------------------------------------------------------- */
/** -i- Helper to wrap a resolver function and map context and args to it */
export const createResolver = <T>(resolver: (input: { args: T, context: RequestContext }) => Promise<unknown>) => {
    return async (parent: unknown, { args }: { args: T }, context: RequestContext, info: unknown) => {
        return resolver({ args, context: { ...context, parent, info } })
    }
}

/* --- Custom Resolvers ------------------------------------------------------------------------ */

const customResolvers = {
    Query: {
        healthCheck: createResolver(healthCheck),
    },
}

/** --- createRootResolver() ------------------------------------------------------------------- */
/** -i- Combine all custom and other (e.g. injected) resolvers */
export const createRootResolver = () => mergeResolvers([
    customResolvers,
    /* other resolvers? */
])

/* --- Schema ---------------------------------------------------------------------------------- */

export const schemaBundle = {
    typeDefs: gql`${typeDefs}`,
    resolvers: createRootResolver(),
}

export const executableSchema = makeExecutableSchema(schemaBundle)

/* --- Exports --------------------------------------------------------------------------------- */

export default executableSchema
