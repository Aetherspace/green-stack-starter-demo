import path from 'path'
import { fileURLToPath } from 'node:url'
import { loadFilesSync } from '@graphql-tools/load-files'
import { mergeTypeDefs, mergeResolvers } from '@graphql-tools/merge'
import { makeExecutableSchema } from '@graphql-tools/schema'
import type { RequestContext } from '../middleware/createRequestContext'
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

/** --- createSchemaDefinitions() -------------------------------------------------------------- */
/** -i- Combine all custom and other (e.g. generated) graphql schema definitions */
export const createSchemaDefinitions = () => {
    const currentDir = path.dirname(fileURLToPath(import.meta.url))
    const rootDir = path.resolve(currentDir, '../../..')
    const schemaPathPattern = `${rootDir}/(features|packages)/**/*.graphql`
    const customGraphQLDefinitions = loadFilesSync(schemaPathPattern)
    return mergeTypeDefs([
        ...customGraphQLDefinitions,
        /* other typedefs? */
    ])
}

/* --- Schema ---------------------------------------------------------------------------------- */

export const schemaBundle = {
    typeDefs: createSchemaDefinitions(),
    resolvers: createRootResolver(),
}

export const executableSchema = makeExecutableSchema(schemaBundle)

/* --- Exports --------------------------------------------------------------------------------- */

export default executableSchema
