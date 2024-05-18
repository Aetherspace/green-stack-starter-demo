import { mergeResolvers } from '@graphql-tools/merge'
import { makeExecutableSchema } from '@graphql-tools/schema'
import { gql } from 'graphql-tag'
import type { RequestContext } from '../middleware/createRequestContext'
import { typeDefs } from './typeDefs'
import { healthCheck } from '../resolvers/healthCheck'

/* --- Notes ----------------------------------------------------------------------------------- */

// -i- Workspace package '@green-stack/core' expects this file to be at '/features/app-core/graphql/schema.ts'
// -i- Please keep it here to avoid issues

/** --- createResolver() ----------------------------------------------------------------------- */
/** -i- Helper to wrap a resolver function and map context and args to it */
export const createResolver = <A, R>(resolver: (input: { args: A, context: RequestContext }) => Promise<R>) => {
    return async (parent: unknown, { args }: { args: A }, context: RequestContext, info: unknown) => {
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
