import { writeFileSync } from 'fs'
import { makeExecutableSchema } from '@graphql-tools/schema'
import { printSchema } from 'graphql'
// Schemas
import { ats, aetherGraphSchema, ResolverMapType } from 'aetherspace/schemas'
// Resolvers
import * as resolvers from 'registries/resolvers.generated'
import {
  aetherResolver,
  makeNextApiHandler,
  AetherArgs,
  AetherResponse,
  makeGraphQLResolver,
} from 'aetherspace/utils/serverUtils'

/* --- Schemas --------------------------------------------------------------------------------- */

export const HealthCheckArgs = ats.schema('HealthCheckArgs', {
  echo: ats.string().optional().docs('Hello World', 'Echoes back the echo argument'),
  saveGraphQLSchema: ats.boolean().optional().docs(false, 'Saves graphql schema to app-next root in development mode'), // prettier-ignore
})

export const HealthCheckResponse = ats.schema('HealthCheckResponse', {
  alive: ats.boolean(),
  kicking: ats.boolean(),
  echo: HealthCheckArgs.schema.echo,
  didSaveGraphQLSchema: ats.boolean().optional().docs(false, 'true if schema was saved to next-app root in dev mode'), // prettier-ignore
})

const resolverConfig = {
  argsSchema: HealthCheckArgs,
  responseSchema: HealthCheckResponse,
}

/* --- healthCheck() --------------------------------------------------------------------------- */

const healthCheck = aetherResolver(async ({ args }) => {
  // Export graphql schema while we're at it?
  let didSaveGraphQLSchema: boolean | null = null
  if (process.env.NODE_ENV === 'development' && args.saveGraphQLSchema) {
    try {
      const schema = aetherGraphSchema(resolvers as unknown as ResolverMapType)
      if (process.env.NODE_ENV === 'development') {
        const schemaDefinitions = printSchema(makeExecutableSchema(schema))
        writeFileSync('./schema.graphql', schemaDefinitions)
        didSaveGraphQLSchema = true
      }
    } catch (err) {
      didSaveGraphQLSchema = false
    }
  }
  // Return health check response
  return {
    alive: true,
    kicking: true,
    echo: args.echo,
    ...(args.saveGraphQLSchema ? { didSaveGraphQLSchema } : {}),
  }
}, resolverConfig)

/* --- Exports --------------------------------------------------------------------------------- */

export type HealthCheckArgsType = AetherArgs<typeof healthCheck>
export type HealthCheckResType = AetherResponse<typeof healthCheck>
export const graphResolver = makeGraphQLResolver(healthCheck) // Make resolver available to GraphQL
export default makeNextApiHandler(healthCheck)
