import { NextRequest, NextResponse } from 'next/server'
import { healthCheck } from '@app/core/resolvers/healthCheck'

/* --- Types ----------------------------------------------------------------------------------- */

type RequestContext<T = Record<string, unknown>> = {
    params: T
}

/* --- Handlers -------------------------------------------------------------------------------- */

const handler = async (req: NextRequest, context: RequestContext) => {
    // Input
    const searchParams = req.nextUrl.searchParams
    const echo = searchParams.get('echo') || null

    // Run Resolver
    const serverHealth = await healthCheck({ echo, req })

    // Respond
    return NextResponse.json(serverHealth)
}

/* --- Methods --------------------------------------------------------------------------------- */

export const GET = handler

