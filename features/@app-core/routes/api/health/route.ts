import { createNextRouteHandler } from '@green-stack/core/schemas/createNextRouteHandler'
import { healthCheck } from '../../../resolvers/healthCheck'

/* --- Routes ---------------------------------------------------------------------------------- */

export const GET = createNextRouteHandler(healthCheck)

export const POST = createNextRouteHandler(healthCheck)
