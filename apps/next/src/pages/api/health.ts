import { writeFileSync } from 'fs'
import { makeExecutableSchema } from '@graphql-tools/schema'
import { printSchema } from 'graphql'
import { z } from 'zod'
// Schemas
import { aetherSchema, aetherGraphSchema, ResolverMapType } from 'aetherspace/schemas'
// Resolvers
import * as resolvers from 'registries/resolvers.generated'
// Middleware
import { withCors } from 'app/middleware'
// Utils
import {
  aetherResolver,
  makeNextApiHandler,
  AetherArguments,
  AetherResponse,
  makeGraphQLResolver,
} from 'aetherspace/utils/serverUtils'

/* --- Schemas --------------------------------------------------------------------------------- */

export const HealthCheckArgs = aetherSchema('HealthCheckArgs', {
  echo: z.string().optional().describe('Echoes back the echo argument'),
  saveGraphQLSchema: z
    .boolean()
    .optional()
    .describe('Saves graphql schema to app-next root in development mode'),
})

export const HealthCheckResponse = HealthCheckArgs.pick({ echo: true }).extendSchema(
  'HealthCheckResponse',
  {
    alive: z.boolean(),
    kicking: z.boolean(),
    didSaveGraphQLSchema: z
      .boolean()
      .optional()
      .describe('true if schema was saved to next-app root in dev mode'),
  }
)

/* --- Config ---------------------------------------------------------------------------------- */

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
      // Save graphql schema to next root?
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

export type HealthCheckArgsType = AetherArguments<typeof healthCheck>
export type HealthCheckResType = AetherResponse<typeof healthCheck>
export const graphResolver = makeGraphQLResolver(healthCheck) // Make resolver available to GraphQL
export default makeNextApiHandler(healthCheck, { middleware: [withCors] })
