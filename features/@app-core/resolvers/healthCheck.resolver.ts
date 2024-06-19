import * as OS from 'os'
import type { NextRequest } from 'next/server'
import { createResolver } from '@green-stack/schemas/createResolver'
import { appConfig } from '../appConfig'
import { healthCheckBridge } from './healthCheck.bridge'

/* --- Constants ------------------------------------------------------------------------------- */

const ALIVE_SINCE = new Date()

/** --- healthCheck() -------------------------------------------------------------------------- */
/** -i- Check the health status of the server. Includes relevant urls, server time(zone), versions and more */
export const healthCheck = createResolver(async ({ args, req, context }) => {
    // Inputs
    const { echo, showContext } = args

    // Context
    const { req: _, res: __, ...headerContext } = context

    // Vars
    const now = new Date()
    const aliveTime = now.getTime() - ALIVE_SINCE.getTime()

    // Urls
    const r = req as Request
    const rn = req as NextRequest
    const requestHost = rn?.headers?.get?.('host')
    const requestProtocol = rn?.headers?.get?.('x-forwarded-proto') ?? 'http'
    const requestURL = r?.url || `${requestProtocol}://${requestHost}/api/health`
    const { baseURL, backendURL, apiURL, graphURL } = appConfig

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
        baseURL: requestHost ? `${requestProtocol}://${requestHost}` : baseURL,
        backendURL: requestHost ? `${requestProtocol}://${requestHost}` : backendURL,
        apiURL: requestHost ? `${requestProtocol}://${requestHost}/api` : apiURL,
        graphURL: requestHost ? `${requestProtocol}://${requestHost}/api/graphql` : graphURL,
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
        // CONTEXT
        context: showContext ? headerContext : undefined,
    }
}, healthCheckBridge)
