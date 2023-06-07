import * as OS from 'os'
import type { NextApiRequest } from 'next'
// Schemas
import { z, aetherSchema } from 'aetherspace/schemas'
// Utils
import {
  aetherResolver,
  AetherArguments,
  AetherResponse,
  makeNextRouteHandler,
  makeGraphQLResolver,
  checkURLs,
  getEnvVar,
} from 'aetherspace/utils/serverUtils'

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
  requestURL: z.string().optional().describe('The request URL'),
  baseURL: z.string().optional().describe('The base URL'),
  apiURL: z.string().optional().describe('The path all API routes are under'),
  graphURL: z.string().optional().describe('The GraphQL URL'),
  docsURL: z.string().optional().describe('The docs URL'),
  port: z.number().optional().describe('The port the server is running on'),
  debugPort: z.number().optional().describe('The debug port the server is running on'),
  // TIME & DATES
  now: z.date().describe('The current server time'),
  aliveSince: z.date().describe('Time since the server or lambda has started'),
  aliveTime: z.number().describe('Time since the server or lambda has started in milliseconds'),
  timezone: z.string().optional().describe('The timezone of the server'),
  // VERSIONS
  nodeVersion: z.string().optional().describe('The node version'),
  v8Version: z.string().optional().describe('The v8 version'),
  // SYSTEM
  systemArch: z.string().optional().describe('The system architecture'),
  systemPlatform: z.string().optional().describe('The system platform'),
  systemRelease: z.string().optional().describe('The system release'),
  systemFreeMemory: z.number().optional().describe('The system free memory in bytes'),
  systemTotalMemory: z.number().optional().describe('The system total memory in bytes'),
  systemLoadAverage: z.number().array().optional().describe('The system load average'),
})

/* --- Config ---------------------------------------------------------------------------------- */

const resolverConfig = {
  argsSchema: HealthCheckArgs,
  responseSchema: HealthCheckResponse,
}

/* --- Constants ------------------------------------------------------------------------------- */

const aliveSince = new Date()

const DOCS_URL = getEnvVar('DOCS_URL')
const BACKEND_URL = getEnvVar('BACKEND_URL')

/* --- healthCheck() --------------------------------------------------------------------------- */

const healthCheck = aetherResolver(async ({ args, req }) => {
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

  return {
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
    port: process.env.PORT && Number(process.env.PORT),
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
  } as z.infer<typeof HealthCheckResponse>
}, resolverConfig)

/* --- Types ----------------------------------------------------------------------------------- */

export type HealthCheckArgsType = AetherArguments<typeof healthCheck>
export type HealthCheckResType = AetherResponse<typeof healthCheck>

/* --- Routes ---------------------------------------------------------------------------------- */

export const GET = makeNextRouteHandler(healthCheck)

export const POST = makeNextRouteHandler(healthCheck)

/* --- GraphQL --------------------------------------------------------------------------------- */

export const graphResolver = makeGraphQLResolver(healthCheck)
