import { graphql } from 'gql.tada'

/* --- Query ----------------------------------------------------------------------------------- */

export const healthCheckQuery = graphql(`
  query healthCheck {
    healthCheck {
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
      apiURL
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
