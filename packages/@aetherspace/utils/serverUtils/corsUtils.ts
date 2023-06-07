/**
 ** Multi purpose CORS lib, only slightly altered from:
 ** https://github.com/vercel/examples/blob/main/edge-functions/cors/lib/cors.ts
 ** https://github.com/vercel/next.js/discussions/47933#discussioncomment-5852156
 ** Note: Based on the `cors` package in npm but using only
 ** web APIs. Feel free to use it in your own projects.
 */

/* --- Types ---------------------------------------------------------------------------------- */

export type StaticOrigin = boolean | string | RegExp | (boolean | string | RegExp)[]

export type OriginFn = (
  origin: string | undefined,
  req: Request
) => StaticOrigin | Promise<StaticOrigin>

export interface CorsOptions {
  origin?: StaticOrigin | OriginFn
  methods?: string | string[]
  allowedHeaders?: string | string[]
  exposedHeaders?: string | string[]
  credentials?: boolean
  maxAge?: number
  preflightContinue?: boolean
  optionsSuccessStatus?: number
}

export const defaultOptions: CorsOptions = {
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
  optionsSuccessStatus: 204,
}

/** --- isOriginAllowed() ---------------------------------------------------------------------- */
/** -i- Check whether the origin is allowed */
export const isOriginAllowed = (origin: string, allowed: StaticOrigin): boolean => {
  return Array.isArray(allowed)
    ? allowed.some((o) => isOriginAllowed(origin, o))
    : typeof allowed === 'string'
    ? origin === allowed
    : allowed instanceof RegExp
    ? allowed.test(origin)
    : !!allowed
}

/** --- getOriginHeaders() --------------------------------------------------------------------- */
/** -i- Extract the origin headers from the Request object */
export const getOriginHeaders = (reqOrigin: string | undefined, origin: StaticOrigin) => {
  const headers = new Headers()

  if (origin === '*') {
    // Allow any origin
    headers.set('Access-Control-Allow-Origin', '*')
  } else if (typeof origin === 'string') {
    // Fixed origin
    headers.set('Access-Control-Allow-Origin', origin)
    headers.append('Vary', 'Origin')
  } else {
    const allowed = isOriginAllowed(reqOrigin ?? '', origin)
    if (allowed && reqOrigin) headers.set('Access-Control-Allow-Origin', reqOrigin)
    headers.append('Vary', 'Origin')
  }

  return headers
}

/** --- originHeadersFromReq() ----------------------------------------------------------------- */
/** -i- Extracts the origin headers from the request object */
export const originHeadersFromReq = async (req: Request, origin: StaticOrigin | OriginFn) => {
  const reqOrigin = req.headers.get('Origin') || undefined
  const value = typeof origin === 'function' ? await origin(reqOrigin, req) : origin
  if (!value) return
  return getOriginHeaders(reqOrigin, value)
}

/** --- getAllowedHeaders() -------------------------------------------------------------------- */
/** -i- Extract the allowed headers from the Request object */
export const getAllowedHeaders = (req: Request, allowed?: string | string[]) => {
  const headers = new Headers()

  if (!allowed) {
    allowed = req.headers.get('Access-Control-Request-Headers')!
    headers.append('Vary', 'Access-Control-Request-Headers')
  } else if (Array.isArray(allowed)) {
    // If the allowed headers is an array, turn it into a string
    allowed = allowed.join(',')
  }

  if (allowed) headers.set('Access-Control-Allow-Headers', allowed)
  return headers
}

/** --- cors() --------------------------------------------------------------------------------- */
/** -i- Multi purpose CORS lib. Note: Based on the `cors` package in npm but using only web APIs. */
export const cors = async (req: Request, res: Response, options?: CorsOptions) => {
  const opts = { ...defaultOptions, ...options }
  const { headers } = res
  const originHeaders = await originHeadersFromReq(req, opts.origin ?? false)
  const mergeHeaders = (v: string, k: string) => {
    if (k === 'Vary') headers.append(k, v)
    else headers.set(k, v)
  }

  // If there's no origin we won't touch the response
  if (!originHeaders) return res

  originHeaders.forEach(mergeHeaders)

  if (opts.credentials) headers.set('Access-Control-Allow-Credentials', 'true')

  const exposed = Array.isArray(opts.exposedHeaders)
    ? opts.exposedHeaders.join(',')
    : opts.exposedHeaders

  if (exposed) headers.set('Access-Control-Expose-Headers', exposed)

  // Handle the preflight request
  if (req.method === 'OPTIONS') {
    if (opts.methods) {
      const methods = Array.isArray(opts.methods) ? opts.methods.join(',') : opts.methods
      headers.set('Access-Control-Allow-Methods', methods)
    }

    getAllowedHeaders(req, opts.allowedHeaders).forEach(mergeHeaders)

    if (typeof opts.maxAge === 'number') headers.set('Access-Control-Max-Age', String(opts.maxAge))
    if (opts.preflightContinue) return res

    headers.set('Content-Length', '0')
    return new Response(null, { status: opts.optionsSuccessStatus, headers })
  }

  // If we got here, it's a normal request
  return res
}

/** --- initCors() ----------------------------------------------------------------------------- */
/** -i- Initialize the CORS middleware */
export function initCors(options?: CorsOptions) {
  return (req: Request, res: Response) => cors(req, res, options)
}

/** --- corsOPTIONS() -------------------------------------------------------------------------- */
/** -i- Allow OPTIONS with CORS middleware */
export const corsOPTIONS = async (req: Request) => {
  return cors(req, new Response(null, { status: 204 })) // prettier-ignore
}
