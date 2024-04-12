import * as OS from 'os'
import type { NextRequest } from 'next/server'
import type { RequestContext } from '../middleware/createRequestContext'

/* --- Constants ------------------------------------------------------------------------------- */

const ALIVE_SINCE = new Date()

/* --- Types ----------------------------------------------------------------------------------- */

type HealthCheckArgs = {
  echo: string
}

type HealthCheckInputs = {
  args: HealthCheckArgs,
  context: RequestContext
}

/** --- healthCheck() -------------------------------------------------------------------------- */
/** -i- Check the health status of the server. Includes relevant urls, server time(zone), versions and more */
export const healthCheck = async ({ args, context }: HealthCheckInputs) => {
    // Inputs
    const { echo } = args
    const { req } = context

    // Vars
    const now = new Date()
    const aliveTime = now.getTime() - ALIVE_SINCE.getTime()

    // Urls
    const r = req as Request
    const rn = req as NextRequest
    const requestHost = rn?.headers?.get?.('host')
    const requestProtocol = rn?.headers?.get?.['x-forwarded-proto'] ?? 'http'
    const requestURL = r?.url ?? `${requestProtocol}://${requestHost}/api/health`
    const baseURL = process.env.BACKEND_URL || requestURL?.split('/api/')[0]
    const apiURL = baseURL ? `${baseURL}/api` : null

    // -- Respond --

    return {
        // PARAMS
        echo,
        // STATUS
        status: 'OK',
        alive: true,
        kicking: true,
        // TIME & DATES
        now: now.toISOString(),
        aliveTime,
        aliveSince: ALIVE_SINCE.toISOString(),
        serverTimezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        // URLS
        requestHost,
        requestProtocol,
        requestURL,
        baseURL,
        apiURL,
        port: process.env.PORT ? Number(process.env.PORT) : null,
        debugPort: process.debugPort && Number(process.debugPort),
        // VERSIONS
        nodeVersion: process.versions.node,
        v8Version: process.versions.v8,
        // SYSTEM
        systemArch: OS.arch(),
        systemPlatform: OS.platform(),
        systemRelease: OS.release(),
        systemFreeMemory: OS.freemem(),
        systemTotalMemory: OS.totalmem(),
        systemLoadAverage: OS.loadavg(),
    }
}
