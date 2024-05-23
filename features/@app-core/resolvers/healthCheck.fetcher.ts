import type { HealthCheckArgs, HealthCheckResponse } from './healthCheck.bridge'
import { appConfig } from '../appConfig'

/** --- healthCheckFetcher() ------------------------------------------------------------------- */
/** -i- Isomorphic fetcher for our healthCheck() resolver at '/api/health' */
export const healthCheckFetcher = async (args: HealthCheckArgs) => {
    const response = await fetch(`${appConfig.backendURL}/api/health?echo=${args.echo}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    const data = await response.json()
    return data as HealthCheckResponse
}
