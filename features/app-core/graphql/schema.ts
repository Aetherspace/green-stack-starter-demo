import { makeExecutableSchema } from '@graphql-tools/schema'
// Schemas
import { aetherGraphSchema, ResolverMapType } from 'aetherspace/schemas'
// Resolvers
import * as resolvers from 'registries/resolvers.generated'

/* --- GraphQL Schema -------------------------------------------------------------------------- */

// Build executable GraphQL schema from resolvers
export const schemaDefs = aetherGraphSchema(resolvers as unknown as ResolverMapType)

// Create and export an executable schema
export const schema = makeExecutableSchema(schemaDefs)
