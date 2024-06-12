import { createGraphResolver } from '@green-stack/core/schemas/createGraphResolver'
import { createNextRouteHandler } from '@green-stack/core/schemas/createNextRouteHandler'
import { healthCheck } from '@app/core/resolvers/healthCheck.resolver'

/* --- Routes ---------------------------------------------------------------------------------- */

export const GET = createNextRouteHandler(healthCheck)

export const POST = createNextRouteHandler(healthCheck)

/* --- GraphQL --------------------------------------------------------------------------------- */

export const graphResolver = createGraphResolver(healthCheck)
