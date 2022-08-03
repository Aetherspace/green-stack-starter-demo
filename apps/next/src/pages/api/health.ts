// Schemas
import { ats } from 'aetherspace/schemas'
// Resolvers
import {
  aetherResolver,
  makeNextApiHandler,
  AetherArgs,
  AetherResponse,
  makeGraphQLResolver,
} from 'aetherspace/utils/serverUtils'

/* --- Schemas --------------------------------------------------------------------------------- */

export const HealthCheckArgs = ats.schema('HealthCheckArgs', {
  echo: ats.string().optional(),
  // arr: ats.array(ats.string()).optional(),
})

export const HealthCheckResponse = ats.schema('HealthCheckResponse', {
  alive: ats.boolean(),
  kicking: ats.boolean(),
  echo: HealthCheckArgs.schema.echo,
  // args: ats.array(HealthCheckArgs).optional(),
})

const resolverConfig = {
  argsSchema: HealthCheckArgs,
  responseSchema: HealthCheckResponse,
}

/* --- healthCheckResolver() ------------------------------------------------------------------- */

const healthCheckResolver = aetherResolver(
  async ({ args }) => ({
    alive: true,
    kicking: true,
    echo: args.echo,
    // args: [args],
  }),
  resolverConfig
)

/* --- Exports --------------------------------------------------------------------------------- */

export type HealthCheckArgsType = AetherArgs<typeof healthCheckResolver>
export type HealthCheckResponsType = AetherResponse<typeof healthCheckResolver>
export const graphResolver = makeGraphQLResolver(healthCheckResolver)
export default makeNextApiHandler(healthCheckResolver)
