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
})

export const HealthCheckResponse = ats.schema('HealthCheckResponse', {
  alive: ats.boolean(),
  kicking: ats.boolean(),
  echo: HealthCheckArgs.schema.echo,
})

const resolverConfig = {
  argsSchema: HealthCheckArgs,
  responseSchema: HealthCheckResponse,
}

/* --- healthCheck() --------------------------------------------------------------------------- */

const healthCheck = aetherResolver(
  async ({ args }) => ({
    alive: true,
    kicking: true,
    echo: args.echo,
  }),
  resolverConfig
)

/* --- Exports --------------------------------------------------------------------------------- */

export type HealthCheckArgsType = AetherArgs<typeof healthCheck>
export type HealthCheckResType = AetherResponse<typeof healthCheck>
export const graphResolver = makeGraphQLResolver(healthCheck) // Make resolver available to GraphQL
export default makeNextApiHandler(healthCheck)
