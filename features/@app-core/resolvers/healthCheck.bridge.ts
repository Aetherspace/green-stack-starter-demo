import { z, schema } from '@green-stack/core/schemas'
import { createDataBridge } from '@green-stack/core/schemas/createDataBridge'

/* --- Schemas --------------------------------------------------------------------------------- */

export const HealthCheckArgs = schema('HealthCheckArgs', {
   echo: z.string().default('Hello World'), 
})

export const HealthCheckResponse = schema('HealthCheckResponse', {
    echo: z.string().optional(),
    status: z.literal('OK'),
    alive: z.boolean(),
    kicking: z.boolean(),
    now: z.string(),
    aliveTime: z.number(),
    aliveSince: z.string(),
    serverTimezone: z.string(),
    requestHost: z.string(),
    requestProtocol: z.string(),
    requestURL: z.string(),
    baseURL: z.string(),
    backendURL: z.string(),
    apiURL: z.string(),
    graphURL: z.string(),
    port: z.number().nullable(),
    debugPort: z.number().nullable(),
    nodeVersion: z.string(),
    v8Version: z.string(),
    systemArch: z.string(),
    systemPlatform: z.string(),
    systemRelease: z.string(),
    systemFreeMemory: z.number(),
    systemTotalMemory: z.number(),
    systemLoadAverage: z.array(z.number()),
})

/* --- Type Aliases ---------------------------------------------------------------------------- */

export type HealthCheckArgs = z.infer<typeof HealthCheckArgs>

export type HealthCheckResponse = z.infer<typeof HealthCheckResponse>

/* --- Bridge ---------------------------------------------------------------------------------- */

export const healthCheckBridge = createDataBridge({
    resolverName: 'healthCheck',
    resolverArgsName: 'HealthCheckArgs',
    argsSchema: HealthCheckArgs,
    responseSchema: HealthCheckResponse,
    apiPath: '/api/health',
    allowedMethods: ['GET'],
})
