import { ResultOf, VariablesOf, graphql } from 'gql.tada'
import { graphqlQuery } from '@app/core/graphql/graphqlQuery'

/* --- Query ----------------------------------------------------------------------------------- */

export const healthCheckQuery = graphql(`
  query healthCheck ($args: HealthCheckArgs) {
    healthCheck(args: $args) {
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

export const healthCheckFetcher = async (variables: HealthCheckQueryVariables['args']) => {
  const result = await graphqlQuery(healthCheckQuery, { variables: { args: variables } })
  return result.healthCheck
}
