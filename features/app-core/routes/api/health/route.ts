import * as OS from 'os'
import type { NextApiRequest } from 'next'
import { z, aetherSchema, createDataBridge } from 'aetherspace/schemas'
import {
  aetherResolver,
  AetherArguments,
  AetherResponse,
  makeNextRouteHandler,
  makeGraphQLResolver,
  checkURLs,
  getEnvVar,
} from 'aetherspace/utils/serverUtils'

/* --- Disclaimers ----------------------------------------------------------------------------- */

// -i- While useful and usable, this health check API route is just a simplified example.
// -i- It's purpose is to show how to tie schemas, resolvers and API routes together.
// -i- For that reason, a lot of the code here is more colocated than it should be.
// -i- See the 'Quickstart' page in the docs for the simplified example and more info:

// -i- https://main--62c9a236ee16e6611d719e94.chromatic.com/?path=/docs/aetherspace-quickstart--page
// -i- http://localhost:6006?path=/docs/aetherspace-quickstart--page (local docs with `yarn dev:docs`)

// -i- To get the most out of the template when creating API routes and GraphQL resolvers,
// -i- We recommend you not colocate the schemas and resolver in the same route.ts file.

// -i- Instead, use the `yarn ats add-resolver` command to create a resolver scaffold.
// -i- This will generate: a schema, a resolver, a route, a fetch util and SWR hook for you
// -i- and automatically link these all together to save time and enforce best practices.

// -i- You *could* also remove this route and the health check if you want.

// -!- Though it is used in the Expo dev startup script to check if the server is running first.
// -!- So if you remove it, you will have to remove it from the scripts and turborepo config as well.

/* --- Schemas --------------------------------------------------------------------------------- */

export const HealthCheckArgs = aetherSchema('HealthCheckArgs', {
  echo: z.string().optional().describe('Echoes back the echo argument'),
  docsURLs: z.string().array().optional().describe('Extra documentation URLs to check against'),
})

export const HealthCheckResponse = HealthCheckArgs.extendSchema('HealthCheckResponse', {
  // STATUS
  status: z.string().describe('The status of the server'),
  alive: z.boolean().describe('Indicates if the server is alive'),
  kicking: z.boolean().describe('Indicates if the server is kicking'),
  // URLS
  requestURL: z.string().nullish().describe('The request URL'),
  baseURL: z.string().nullish().describe('The base URL'),
  apiURL: z.string().nullish().describe('The path all API routes are under'),
  graphURL: z.string().nullish().describe('The GraphQL URL'),
  docsURL: z.string().nullish().describe('The docs URL'),
  port: z.number().nullish().describe('The port the server is running on'),
  debugPort: z.number().nullish().describe('The debug port the server is running on'),
  // TIME & DATES
  now: z.date().describe('The current server time'),
  aliveSince: z.date().describe('Time since the server or lambda has started'),
  aliveTime: z.number().describe('Time since the server or lambda has started in milliseconds'),
  timezone: z.string().nullish().describe('The timezone of the server'),
  // VERSIONS
  nodeVersion: z.string().nullish().describe('The node version'),
  v8Version: z.string().nullish().describe('The v8 version'),
  // SYSTEM
  systemArch: z.string().nullish().describe('The system architecture'),
  systemPlatform: z.string().nullish().describe('The system platform'),
  systemRelease: z.string().nullish().describe('The system release'),
  systemFreeMemory: z.number().nullish().describe('The system free memory in bytes'),
  systemTotalMemory: z.number().nullish().describe('The system total memory in bytes'),
  systemLoadAverage: z.number().array().nullish().describe('The system load average'),
})

/* --- Config ---------------------------------------------------------------------------------- */

const resolverConfig = createDataBridge({
  resolverName: 'healthCheck',
  resolverType: 'query',
  argsSchema: HealthCheckArgs,
  responseSchema: HealthCheckResponse,
  apiPath: '/api/health',
  allowedMethods: ['GRAPHQL', 'GET', 'POST'],
})

/* --- Constants ------------------------------------------------------------------------------- */

const aliveSince = new Date()

const DOCS_URL = getEnvVar('DOCS_URL')
const BACKEND_URL = getEnvVar('BACKEND_URL')

/** --- healthCheck() -------------------------------------------------------------------------- */
/** -i- A resolver to check the health status of the server. Includes relevant urls, server time(zone), versions and more in the response. */
const healthCheck = aetherResolver(async ({ args, req, withDefaults }) => {
  // Args
  const { echo, docsURLs } = args

  // Vars
  const now = new Date()
  const aliveTime = now.getTime() - aliveSince.getTime()

  // -- URLS --

  const r = req as Request
  const rn = req as NextApiRequest

  const reqHost = rn?.headers?.host
  const reqProtocol = rn?.headers?.['x-forwarded-proto'] ?? 'http'
  const requestURL = r?.url ?? `${reqProtocol}://${reqHost}/api/health`

  const baseURL = BACKEND_URL || requestURL?.split('/api/')[0]
  const apiURL = baseURL ? `${baseURL}/api` : null
  const graphURL = baseURL ? `${baseURL}/api/graphql` : null
  const [docsURL] = await checkURLs(['http://localhost:6006', DOCS_URL, ...(docsURLs ?? [])])

  // -- Return --

  return withDefaults({
    // ARGS
    echo,
    // STATUS
    status: 'OK',
    alive: true,
    kicking: true,
    // URLS
    requestURL,
    baseURL,
    apiURL,
    graphURL,
    docsURL,
    port: process.env.PORT ? Number(process.env.PORT) : null,
    debugPort: process.debugPort && Number(process.debugPort),
    // TIME & DATES
    now: new Date(),
    aliveSince,
    aliveTime,
    timezone: process.env.TZ ?? Intl.DateTimeFormat().resolvedOptions().timeZone,
    // VERSIONS
    nodeVersion: process.versions.node,
    v8Version: process.versions.v8,
    // SYSTEM
    systemArch: OS.arch(),
    systemPlatform: OS.platform(),
    systemRelease: OS.release(),
    systemFreeMemory: OS.freemem(),
    systemTotalMemory: OS.totalmem(),
    systemLoadAverage: OS.loadavg(),
  })
}, resolverConfig)

/* --- Types ----------------------------------------------------------------------------------- */

export type HealthCheckArgsType = AetherArguments<typeof healthCheck>
export type HealthCheckResType = AetherResponse<typeof healthCheck>

/* --- Routes ---------------------------------------------------------------------------------- */

export const GET = makeNextRouteHandler(healthCheck)

export const POST = makeNextRouteHandler(healthCheck)

/* --- GraphQL --------------------------------------------------------------------------------- */

export const graphResolver = makeGraphQLResolver(healthCheck)
