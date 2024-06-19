import { createDataBridge } from '@green-stack/schemas/createDataBridge'
import { HealthCheckArgs } from '../schemas/HealthCheckArgs'
import { HealthCheckResponse } from '../schemas/HealthCheckResponse'

/* --- Bridge ---------------------------------------------------------------------------------- */

export const healthCheckBridge = createDataBridge({
    resolverName: 'healthCheck',
    resolverArgsName: 'HealthCheckArgs',
    argsSchema: HealthCheckArgs,
    responseSchema: HealthCheckResponse,
    apiPath: '/api/health',
    allowedMethods: ['GRAPHQL', 'GET'],
})
