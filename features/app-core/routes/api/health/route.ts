// Schemas
import { z, aetherSchema } from 'aetherspace/schemas'
// Utils
import {
  aetherResolver,
  AetherArguments,
  AetherResponse,
  makeNextRouteHandler,
  makeGraphQLResolver,
} from 'aetherspace/utils/serverUtils'

/* --- Schemas --------------------------------------------------------------------------------- */

export const HealthCheckArgs = aetherSchema('HealthCheckArgs', {
  echo: z.string().optional().describe('Echoes back the echo argument'),
})

export const HealthCheckResponse = HealthCheckArgs.extendSchema('HealthCheckResponse', {
  alive: z.boolean(),
  kicking: z.boolean(),
})

/* --- Config ---------------------------------------------------------------------------------- */

const resolverConfig = {
  argsSchema: HealthCheckArgs,
  responseSchema: HealthCheckResponse,
}

/* --- healthCheck() --------------------------------------------------------------------------- */

const healthCheck = aetherResolver(async ({ args }) => {
  // Return health check response
  return {
    alive: true,
    kicking: true,
    echo: args.echo,
  }
}, resolverConfig)

/* --- Types ----------------------------------------------------------------------------------- */

export type HealthCheckArgsType = AetherArguments<typeof healthCheck>
export type HealthCheckResType = AetherResponse<typeof healthCheck>

/* --- Routes ---------------------------------------------------------------------------------- */

export const GET = makeNextRouteHandler(healthCheck)

export const POST = makeNextRouteHandler(healthCheck)

/* --- GraphQL --------------------------------------------------------------------------------- */

export const graphResolver = makeGraphQLResolver(healthCheck)
