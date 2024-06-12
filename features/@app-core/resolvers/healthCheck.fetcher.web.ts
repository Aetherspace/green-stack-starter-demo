import type { NextRequest, NextResponse } from 'next/server'
import type { HealthCheckArgs, HealthCheckResponse } from './healthCheck.bridge'
import { appConfig } from '../appConfig'

/** --- healthCheckFetcher() ------------------------------------------------------------------- */
/** -i- Isomorphic fetcher for our healthCheck() resolver at '/api/health' */
export const healthCheckFetcher = async (args: HealthCheckArgs) => {
    // Vars
    const isServer = typeof window === 'undefined'

    // -- Browser --

    if (!isServer) {
        const response = await fetch(`${appConfig.backendURL}/api/health?echo=${args.echo}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        const data = await response.json()
        return data as HealthCheckResponse
    }

    // -- Server --

    const { healthCheck } = await import('./healthCheck.resolver')
    const data = await healthCheck({
        args,
        context: {
            req: {} as NextRequest,
            res: {} as NextResponse,
        },
    })
    return data as HealthCheckResponse
}
