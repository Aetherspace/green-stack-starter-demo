import { mergeResolvers } from '@graphql-tools/merge'
import { makeExecutableSchema } from '@graphql-tools/schema'
import { GraphQLJSON, GraphQLJSONObject } from 'graphql-type-json'
import { gql } from 'graphql-tag'
import { typeDefs } from './typeDefs'
import * as resolvers from '@app/registries/resolvers.generated'
import { createGraphSchemaDefs } from '@green-stack/schemas/createGraphSchemaDefs'

/* --- Notes ----------------------------------------------------------------------------------- */

// -i- Workspace package '@green-stack/core' expects this file to be at '/features/app-core/graphql/schema.ts'
// -i- Please keep it here to avoid issues

/* --- Types ----------------------------------------------------------------------------------- */

export type ResolverFn = (parent: any, args: any, context: any, info: any) => any$Unknown

export type ResolversMap = {
    Query?: { [queryName: string]: ResolverFn }
    Mutation?: { [mutationName: string]: ResolverFn }
}

/* --- Custom Resolvers ------------------------------------------------------------------------ */

const customResolvers: ResolversMap = {
    // Query: {
    //     healthCheck: resolvers.healthCheck, // -i- Example of a custom resolver
    // },
}

/** --- createRootResolver() ------------------------------------------------------------------- */
/** -i- Combine all custom and other (e.g. injected) resolvers */
export const createRootResolver = (extraResolvers?: ResolversMap) => mergeResolvers([
    customResolvers,
    // Extra resolvers, like from codegen
    extraResolvers,
    // Custom scalars
    {
        JSON: GraphQLJSON,
        JSONObject: GraphQLJSONObject,
    }
])

/* --- Codegen --------------------------------------------------------------------------------- */

// -i- Create a resolver map from the resolvers created with createResolver() & createGraphResolver()
const { generatedResolvers } = createGraphSchemaDefs(resolvers)

/* --- Schema ---------------------------------------------------------------------------------- */

export const schemaBundle = {
    typeDefs: gql`${typeDefs}`,
    resolvers: createRootResolver(generatedResolvers),
}

export const executableSchema = makeExecutableSchema(schemaBundle)

/* --- Exports --------------------------------------------------------------------------------- */

export default executableSchema
