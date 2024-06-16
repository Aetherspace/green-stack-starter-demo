// -i- This file was generated using the 'npx turbo run @green-stack/core#build:schema' script. Don't modify it manually.

export const typeDefs = `scalar Date

scalar JSON

scalar JSONObject

input HealthCheckArgs {
  echo: String
  showContext: Boolean
}

type HealthCheckResponse {
  echo: String
  status: String!
  alive: Boolean!
  kicking: Boolean!
  now: String!
  aliveTime: Float!
  aliveSince: Date!
  serverTimezone: String!
  requestHost: String
  requestProtocol: String
  requestURL: String
  baseURL: String
  backendURL: String
  apiURL: String
  graphURL: String
  port: Int
  debugPort: Int
  nodeVersion: String
  v8Version: String
  systemArch: String
  systemPlatform: String
  systemRelease: String
  systemFreeMemory: Float
  systemTotalMemory: Float
  systemLoadAverage: [Float]
  context: JSON
}

type Query {
  healthCheck(args: HealthCheckArgs): HealthCheckResponse
}

schema {
  query: Query
}`
