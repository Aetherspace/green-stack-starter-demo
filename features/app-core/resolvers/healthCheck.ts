import type { NextApiRequest } from 'next'
import * as OS from 'os'

/* --- Constants ------------------------------------------------------------------------------- */

const ALIVE_SINCE = new Date()

/* --- Types ----------------------------------------------------------------------------------- */

type HealthCheckArgs = {
  echo: string
  req: Request | NextApiRequest
}

/** --- healthCheck() -------------------------------------------------------------------------- */
/** -i- Check the health status of the server. Includes relevant urls, server time(zone), versions and more */
export const healthCheck = async (args: HealthCheckArgs) => {
    // Input
    const { echo, req } = args

    // Vars
    const now = new Date()
    const aliveTime = now.getTime() - ALIVE_SINCE.getTime()

    // Urls
    const r = req as Request
    const rn = req as NextApiRequest
    const reqHost = rn?.headers?.host
    const reqProtocol = rn?.headers?.['x-forwarded-proto'] ?? 'http'
    const requestURL = r?.url ?? `${reqProtocol}://${reqHost}/api/health`
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
