import type { NextApiRequest, NextApiResponse } from 'next'
import axios, { AxiosRequestConfig } from 'axios'
// Utils
import { parseIfJSON } from '../jsonUtils'
import { normalizeObjectProps } from '../objectUtils'

/* --- Types ----------------------------------------------------------------------------------- */

export type ApiSourcesType = {
  query?: any
  body?: any
  cookies?: any
  params?: any
  args?: any
  context?: any
}

export type MiddlewareFnType = (
  req: NextApiRequest,
  res: NextApiResponse,
  next: (result: unknown) => void
) => Promise<any>

/** --- getApiParam() -------------------------------------------------------------------------- */
/** -i- Gets a specific property by key from supplied api sources */
export const getApiParam = (key: string, apiSources: ApiSourcesType) => {
  const { cookies, query, params, body, args, context } = apiSources
  const [result] = [params, query, body, args, context, cookies]
    .map((src) => src?.[key])
    .filter(Boolean)
  if (!result && cookies?.get?.(key)) return parseIfJSON(cookies?.get?.(key))
  return result
}

/** --- getApiParams() ------------------------------------------------------------------------- */
/** -i- Get multiple api params from supplied api sources */
export const getApiParams = (keys: string | string[], apiSources: ApiSourcesType) => {
  const paramKeys = typeof keys === 'string' ? keys.split(' ') : keys
  return paramKeys.reduce((apiParams, paramKey) => {
    return { ...apiParams, [paramKey]: getApiParam(paramKey, apiSources) }
  }, {}) as { [key: string]: unknown }
}

/** --- getUrlParams() ------------------------------------------------------------------------- */
/** -i- Extract the query parameters from a url */
export const getUrlParams = (url: string) => {
  const queryString = url.split('?')[1] || ''
  const urlSearchParams = new URLSearchParams(queryString)
  return normalizeObjectProps(Object.fromEntries(urlSearchParams))
}

/** --- runMiddleWare() ------------------------------------------------------------------------ */
/** -i- https://nextjs.org/docs/api-routes/api-middlewares
 ** Helper method to wait for a middleware to execute before continuing
 ** And to throw an error when an error happens in a middleware */
export const runMiddleWare = (req: NextApiRequest, res: NextApiResponse, fn: MiddlewareFnType) => {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) return reject(result)
      return resolve(result)
    })
  })
}

/** --- fireGetAndForget() --------------------------------------------------------------------- */
/** -i- Fires a GET request & ignores whether it succeeds or not (for e.g. webhooks)
 ** https://stackoverflow.com/a/63594903/8789673 */
export const fireGetAndForget = (url: string, config?: AxiosRequestConfig) => {
  try {
    // Fire request
    axios.get(url, config).catch(Boolean)
    // Resolve without waiting for response
    return true
  } catch (err) {
    // Do nothing to avoid unhandled promise rejections
  }
}

/** --- firePostAndForget() -------------------------------------------------------------------- */
/** -i- Fires a POST request & ignores whether it succeeds or not (for e.g. webhooks)
 ** https://stackoverflow.com/a/63594903/8789673 */
export const firePostAndForget = (url: string, data: unknown, config?: AxiosRequestConfig) => {
  try {
    // Fire request
    axios.post(url, data, config).catch(Boolean)
    // Resolver without waiting for response
    return true
  } catch (err) {
    // Do nothing to avoid unhandled promise rejections
  }
}
