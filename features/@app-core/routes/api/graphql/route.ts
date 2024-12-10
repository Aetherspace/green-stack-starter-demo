import type { NextRequest } from 'next/server'
import { createGraphQLServerHandler } from '../../../graphql/graphqlServer'

/* --- Handler --------------------------------------------------------------------------------- */

const handler = createGraphQLServerHandler()

/* --- /api/graphql ---------------------------------------------------------------------------- */

export const GET = (req: NextRequest) => handler(req)

export const POST = (req: NextRequest) => handler(req)
