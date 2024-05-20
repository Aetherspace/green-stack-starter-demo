import { ResultOf, VariablesOf, graphql } from 'gql.tada'
import { bridgedFetcher } from '@green-stack/core/schemas/bridgedFetcher'
import { healthCheckBridge } from './healthCheck.bridge'

/* --- Query ----------------------------------------------------------------------------------- */

export const healthCheckQuery = graphql(`
  query healthCheck ($healthCheckArgs: HealthCheckArgs) {
    healthCheck(args: $healthCheckArgs) {
      echo
      status
      alive
      kicking
      now
      aliveTime
      aliveSince
      serverTimezone
      requestHost
      requestProtocol
      requestURL
      baseURL
      backendURL
      apiURL
      graphURL
      port
      debugPort
      nodeVersion
      v8Version
      systemArch
      systemPlatform
      systemRelease
      systemFreeMemory
      systemTotalMemory
      systemLoadAverage
    }
  }
`)

/* --- Types ----------------------------------------------------------------------------------- */

export type HealthCheckQueryVariables = VariablesOf<typeof healthCheckQuery>

export type HealthCheckQueryResult = ResultOf<typeof healthCheckQuery>

/* --- healthCheckFetcher() -------------------------------------------------------------------- */

export const healthCheckFetcher = bridgedFetcher({
  ...healthCheckBridge,
  graphqlQuery: healthCheckQuery,
})
