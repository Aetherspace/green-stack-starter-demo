import { NextRequest, NextResponse } from 'next/server'
import { healthCheck } from '@app/core/resolvers/healthCheck'
import { createRequestContext } from '@app/core/middleware/createRequestContext'

/* --- Types ----------------------------------------------------------------------------------- */

type NextRequestContext<T = Record<string, unknown>> = {
    params: T
}

/* --- Handlers -------------------------------------------------------------------------------- */

const handler = async (req: NextRequest, nextRequestContext: NextRequestContext) => {
    // Input
    const searchParams = req.nextUrl.searchParams
    const echo = searchParams.get('echo') || null

    // Build Context
    const context = await createRequestContext({ req, ...nextRequestContext })

    // Run Resolver
    const serverHealth = await healthCheck({ args: { echo }, context })

    // Respond
    return NextResponse.json(serverHealth)
}

/* --- Methods --------------------------------------------------------------------------------- */

export const GET = handler

