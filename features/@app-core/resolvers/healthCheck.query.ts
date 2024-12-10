import { ResultOf, VariablesOf } from 'gql.tada'
import { bridgedFetcher } from '@green-stack/schemas/bridgedFetcher'
import { healthCheckBridge } from './healthCheck.bridge'
import { graphql } from '../graphql/graphql'

/* --- Query ----------------------------------------------------------------------------------- */

export const healthCheckQuery = graphql(`
  query healthCheck ($healthCheckArgs: HealthCheckInput) {
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
      context
    }
  }
`)

/* --- Types ----------------------------------------------------------------------------------- */

export type HealthCheckQueryInput = VariablesOf<typeof healthCheckQuery>

export type HealthCheckQueryOutput = ResultOf<typeof healthCheckQuery>

/* --- healthCheckFetcher() -------------------------------------------------------------------- */

export const healthCheckFetcher = bridgedFetcher({
  ...healthCheckBridge,
  graphqlQuery: healthCheckQuery,
})
