import { expect, test } from 'bun:test'
import { print } from 'graphql'
import { z, schema } from './index'
import { createDataBridge } from './createDataBridge'

const healtCheckBridge = createDataBridge({
    resolverName: 'healthCheck',
    argsSchema: schema('HealthCheckArgs', { echo: z.string().default('Hello World') }),
    responseSchema: schema('HealthCheckResponse', { echo: z.string().optional() }),
    apiPath: '/api/health',
    allowedMethods: ['GET'],
})

test("Bridges created by createDataBridge infer the right argsName & query type", () => {
    expect(healtCheckBridge.resolverName).toBe('healthCheck')
    expect(healtCheckBridge.resolverArgsName).toBe('healthCheckArgs')
    expect(healtCheckBridge.resolverType).toBe('query')
})

const expectedQuery = `query healthCheck($healthCheckArgs: HealthCheckArgs) {
  healthCheck(args: $healthCheckArgs) {
    echo
  }
}`

test("Bridges created by createDataBridge can build the graphql query from args & response schemas", () => {
    const graphqlQuery = healtCheckBridge.getGraphqlQuery()
    expect(print(graphqlQuery)).toBe(expectedQuery)
})

// TODO: Figure out why using healthCheckQuery here causes "error: Unexpected typeof" from react-native?
// test("Bridges created by createDataBridge can use a custom graphql query", async () => {
//     // Lazily import the query to avoid circular dependencies
//     const { healthCheckQuery } = await (import('@app/core/resolvers/healthCheck.query'))
//     const bridgeWithCustomQuery = createDataBridge({
//         ...healtCheckBridge,
//         graphqlQuery: healthCheckQuery,
//     })
//     const graphqlQuery = bridgeWithCustomQuery.getGraphqlQuery()
//     expect(print(graphqlQuery)).not.toBe(expectedQuery)
// })
