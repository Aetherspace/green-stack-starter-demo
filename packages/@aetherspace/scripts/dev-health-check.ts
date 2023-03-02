import axios from 'axios'
import { request, gql } from 'graphql-request'

/* --- Constants ------------------------------------------------------------------------------- */

const ENDPOINT = process.env.ENDPOINT || 'http://localhost:3000'
const HEALTH_ENDPOINT = process.env.HEALTH_ENDPOINT || `${ENDPOINT}/api/health`
const GRAPHQL_ENDPOINT = process.env.GRAPHQL_ENDPOINT || `${ENDPOINT}/api/graphql`
const TIME_INCREMENT = +(process.env.TIME_INCREMENT || 1000)
const MAX_TRIES = +(process.env.MAX_TRIES || 10)

let timesTried = 0

/* --- checkHealth ----------------------------------------------------------------------------- */

// prettier-ignore
const checkHealth = async () => {
  // Increment times we tried to contact the api
  timesTried += 1
  // Exit with error when max amount of tries exceeded
  if (timesTried > MAX_TRIES) {
    console.error(`❌ Exceeded ${MAX_TRIES} health checks, something may be wrong, aborting.`)
    process.exit(1)
  }
  // Attempt to reach the API
  try {
    // Check that the REST API is up
    const restResponse = await axios.post(HEALTH_ENDPOINT, { echo: 'Hello World' })
    const hasWorkingRestAPI = restResponse.data.alive && restResponse.data.kicking
    // Check that the GraphQL API is up
    const gqlHealthCheckQuery = gql`{ healthCheck { alive kicking } }`
    const graphQLResponse = await request(GRAPHQL_ENDPOINT, gqlHealthCheckQuery) // @ts-ignore
    const hasWorkingGraphQLAPI = graphQLResponse.healthCheck.alive && graphQLResponse.healthCheck.kicking
    // Check that the responses are correct
    if (hasWorkingRestAPI && hasWorkingGraphQLAPI) {
      console.log(`✅ Health check #${timesTried} succeeded: Server, API routes & GraphQL up and running.`)
      process.exit(0)
    }
  } catch (err) {
    const retryMs = timesTried * TIME_INCREMENT
    console.log(err)
    console.log(`⏳ Failed health check #${timesTried}, retrying in ${retryMs} ms.`)
    setTimeout(checkHealth, retryMs)
  }
}

/* --- init ------------------------------------------------------------------------------------ */

setTimeout(checkHealth, TIME_INCREMENT)
