// Types
import type {
  NextApiRequest,
  NextApiResponse,
  GetServerSidePropsContext,
  GetStaticPathsContext,
  GetStaticPropsContext,
} from 'next'
import type { AetherSchemaType, Infer } from '../../schemas'
// Utils
import { getApiParams, runMiddleWare, MiddlewareFnType } from './apiUtils'
import { normalizeObjectProps, isEmpty } from '../index'

/* --- Types ----------------------------------------------------------------------------------- */

export type ResolverInputType<AT = any> = {
  req?: NextApiRequest | GetServerSidePropsContext['req']
  res?: NextApiResponse | GetServerSidePropsContext['res']
  nextSsrContext?: GetServerSidePropsContext
  nextStaticPathsContext?: GetStaticPathsContext
  nextStaticPropsContext?: GetStaticPropsContext
  parent?: any
  args?: AT
  params?: { [key: string]: AT[keyof AT] | unknown }
  context?: any
  info?: any
  cookies?: NextApiRequest['cookies']
  config?: {
    logErrors?: boolean
    respondErrors?: boolean
    allowFail?: boolean
    logHandler?: (logs: string[]) => Promise<any>
    onError?: (err: any) => unknown | void
    [key: string]: any
  }
  [key: string]: AT[keyof AT] | unknown
}

export type ResolverExecutionParamsType<AT = any> = {
  args: AT
  logs: string[]
  addLog: (log: string) => void
  saveLogs: (logHandler?: (logs: string[]) => Promise<any>) => Promise<void>
  handleError: (err: any, sendResponse?: boolean) => unknown | void
  config: {
    logErrors?: boolean
    respondErrors?: boolean
    logHandler?: (logs: string[]) => Promise<any>
    onError?: (err: any) => unknown | void
    allowFail?: boolean
    [key: string]: any
  }
  res?: NextApiResponse | GetServerSidePropsContext['res']
}

export type AetherArgs<T extends unknown & { ARGS_TYPE: unknown }> = T['ARGS_TYPE']
export type AetherResponse<T extends unknown & { RESP_TYPE: unknown }> = T['RESP_TYPE']

/* --- aetherResolver() ------------------------------------------------------------------------ */
// -i- Wrap a server side resolver function for easy use in both graphQL & rest endpoints + provide error handling
export const aetherResolver = <
  TSAT = null, // Args type override
  TSRT = null, // Response type override
  AST extends AetherSchemaType = any, // Args schema
  RST extends AetherSchemaType = any, // Response schema
  AT = TSAT extends null ? Infer<AST> : TSAT, // Args Type (Use override?)
  RT = TSRT extends null ? Infer<RST> : TSRT // Resp Type (Use override?)
>(
  resolverFn: (ctx: ResolverExecutionParamsType<AT>) => Promise<RT | unknown>,
  options?: {
    paramKeys?: string
    argsSchema?: AST
    responseSchema?: RST
  }
) => {
  // Extract options
  const { paramKeys, argsSchema, responseSchema } = options || {}
  // Build Resolver
  const resolverWrapper = (ctx?: ResolverInputType<AT>): Promise<RT> => {
    const { req, res, nextSsrContext, parent, args, context, info, cookies: _, ...resolverContext } = ctx || {}
    const { logErrors, respondErrors, allowFail, onError, ...restParams } = resolverContext
    // Collect params from all possible sources
    const { body, method } = (req as NextApiRequest) || {}
    const schemaParamKeys = Object.keys(argsSchema?.schema ?? {})
    const apiParamKeys = [ctx?.paramKeys, paramKeys || schemaParamKeys].flat().filter(Boolean).join(' ')
    const query = { ...nextSsrContext?.query, ...(req as NextApiRequest)?.query }
    const params = { ...restParams, ...nextSsrContext?.params, ...context, ...ctx?.params }
    const cookies = nextSsrContext?.req?.cookies || req?.cookies || ctx?.cookies
    const relatedArgs = apiParamKeys ? getApiParams(apiParamKeys, { query, params, body, args, context }) : {}
    const normalizedArgs = normalizeObjectProps(relatedArgs)
    // Build config
    const errorConfig = { logErrors, respondErrors, onError, allowFail }
    const config = { ...restParams, ...context, ...errorConfig, cookies, method, parent, info, ...ctx?.config }
    // Log handling
    const logs = [] as string[]
    const addLog = (log: string) => {
      if (normalizedArgs.shouldSaveLogs) console.log(log) // Save log in server logfile as well
      logs.push(log)
    }
    const saveLogs = async (logHandler) => await (logHandler?.(logs) ?? ctx?.config?.logHandler?.(logs))
    // Error handling
    const handleError = (err, sendResponse = false) => {
      const isRichError = typeof err === 'object' && !!err.errors
      const errorObj = isRichError ? err : { errors: [err] }
      const { code = 500 } = errorObj
      if (config?.logErrors) console.error(errorObj)
      if (typeof config?.onError === 'function' && config.allowFail) config.onError(errorObj)
      else if (typeof config?.onError === 'function') return config.onError(errorObj)
      if (config.allowFail || config.onError === 'return') return { success: false, ...errorObj }
      if (!!res && sendResponse && !config.allowFail) return (res as NextApiResponse).status(code).json(errorObj)
      else throw new Error(isRichError ? errorObj : err)
    }
    // Return resolver
    return resolverFn({
      res,
      args: normalizedArgs as AT,
      config,
      logs,
      addLog,
      saveLogs,
      handleError,
    }) as unknown as Promise<RT>
  }
  // Return Resolver
  return Object.assign(resolverWrapper, {
    argSchema: argsSchema || {},
    resSchema: responseSchema || {}, // @ts-ignore
    ARGS_TYPE: undefined as AT, // @ts-ignore
    RESP_TYPE: undefined as RT,
  })
}

/* --- makeNextApiHandler() -------------------------------------------------------------------- */
// -i- Codegen: Build next.js api request from an aether resolver
export const makeNextApiHandler =
  <AT, RT>(
    resolver: (ctx?: ResolverInputType<AT>) => Promise<RT>,
    options?: {
      middleware?: MiddlewareFnType[]
      config?: ResolverInputType['config']
    }
  ) =>
  async (req: NextApiRequest, res: NextApiResponse) => {
    const middleware = options?.middleware || []
    const config = options?.config || {}
    try {
      let middlewareArgs = {}
      if (!isEmpty(middleware)) {
        const middlewareResults = await Promise.all(middleware.map((mw) => runMiddleWare(req, res, mw)))
        middlewareResults.filter(Boolean).map((middlewareResult) => {
          if (typeof middlewareResult === 'object') middlewareArgs = { ...middlewareArgs, ...middlewareResult }
        })
      }
      const responseData = await resolver({ ...middlewareArgs, req, res, config })
      return res.status(200).json(responseData)
    } catch (err) {
      console.error(err)
      return res.status(500).json({ success: false, errors: [err] })
    }
  }

/* --- Exports --------------------------------------------------------------------------------- */

export default aetherResolver
