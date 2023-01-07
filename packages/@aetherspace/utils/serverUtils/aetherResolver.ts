// Types
import type {
  NextApiRequest,
  NextApiResponse,
  GetServerSidePropsContext,
  GetStaticPathsContext,
  GetStaticPropsContext,
} from 'next'
import { ApolloError } from 'apollo-server-micro'
import { z } from 'zod'
// Schemas
import '../../schemas/aetherSchemas'
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

export type AetherArguments<T extends unknown & { ARGS_TYPE: unknown }> = T['ARGS_TYPE']
export type AetherResponse<T extends unknown & { RESP_TYPE: unknown }> = T['RESP_TYPE']

/** --- aetherResolver() ----------------------------------------------------------------------- **/
/** -i- Wrap a server side resolver function for easy use in both graphQL & rest endpoints + provide error handling */
export const aetherResolver = <
  TSAT = null, // Args type override
  TSRT = null, // Response type override
  AST extends z.ZodRawShape = any, // Args schema
  RST extends z.ZodRawShape = any, // Response schema
  AT = TSAT extends null ? z.infer<z.ZodObject<AST>> : TSAT, // Args Type (Use override?)
  RT = TSRT extends null ? z.infer<z.ZodObject<RST>> : TSRT // Resp Type (Use override?)
>(
  resolverFn: (ctx: ResolverExecutionParamsType<AT>) => Promise<RT | unknown>,
  options: {
    paramKeys?: string
    argsSchema: z.ZodObject<AST>
    responseSchema: z.ZodObject<RST>
    isMutation?: boolean
  }
) => {
  // Extract options
  const { paramKeys, argsSchema, responseSchema, isMutation } = options
  // Build Resolver
  const resolverWrapper = (ctx?: ResolverInputType<AT>): Promise<RT> => {
    const { req, res, nextSsrContext, parent, args, context, info, cookies: _, ...resolverContext } = ctx || {} // prettier-ignore
    const { logErrors, respondErrors, allowFail, onError, ...restParams } = resolverContext
    // Collect params from all possible sources
    const { body, method } = (req as NextApiRequest) || {}
    const schemaParamKeys = Object.keys(argsSchema?.shape ?? {})
    const apiParamKeys = [ctx?.paramKeys, paramKeys || schemaParamKeys].flat().filter(Boolean).join(' ') // prettier-ignore
    const query = { ...nextSsrContext?.query, ...(req as NextApiRequest)?.query }
    const params = { ...restParams, ...nextSsrContext?.params, ...context, ...ctx?.params }
    const cookies = nextSsrContext?.req?.cookies || req?.cookies || ctx?.cookies
    const relatedArgs = apiParamKeys ? getApiParams(apiParamKeys, { query, params, body, args, context }) : {} // prettier-ignore
    const normalizedArgs = normalizeObjectProps(relatedArgs)
    // Build config
    const errorConfig = { logErrors, respondErrors, onError, allowFail }
    const config = {
      ...restParams,
      ...context,
      ...errorConfig,
      cookies,
      method,
      parent,
      info,
      ...ctx?.config,
    }
    // Log handling
    const logs = [] as string[]
    const addLog = (log: string) => {
      if (normalizedArgs.shouldSaveLogs) console.log(log) // Save log in server logfile as well
      logs.push(log)
    }
    const saveLogs = async (logHandler) => await (logHandler?.(logs) ?? ctx?.config?.logHandler?.(logs)) // prettier-ignore
    // Error handling
    const handleError = (err, sendResponse = false) => {
      const isRichError = typeof err === 'object' && !!err.errors
      const errorObj = isRichError ? err : { errors: [err] }
      const { code = 500 } = errorObj
      if (config?.logErrors) console.error(errorObj)
      if (typeof config?.onError === 'function' && config.allowFail) config.onError(errorObj)
      else if (typeof config?.onError === 'function') return config.onError(errorObj)
      if (config.allowFail || config.onError === 'return') return { success: false, ...errorObj }
      if (!!res && sendResponse && !config.allowFail) return (res as NextApiResponse).status(code).json(errorObj) // prettier-ignore
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
    argSchema: argsSchema,
    resSchema: responseSchema,
    ARGS_TYPE: undefined as AT,
    RESP_TYPE: undefined as RT,
    isMutation,
  })
}

/** --- makeGraphQLResolver() ------------------------------------------------------------------ **/
/** -i- Codegen: Build a graphQL resolver from aether an resolver */
export const makeGraphQLResolver = <AT, RT, AST extends z.ZodRawShape, RST extends z.ZodRawShape>(
  resolver: ((ctx?: ResolverInputType<AT>) => Promise<RT>) & { argSchema: z.ZodObject<AST>; resSchema: z.ZodObject<RST> },
  options?: {
    config?: ResolverInputType['config']
  }
) => {
  const wrappedResolver = async (parent, args, context, info) => {
    const config = options?.config || {}
    try {
      // Execute resolver
      const responseData = await resolver({ parent, args: args.args, context, info, config })
      // Return response
      return responseData
    } catch (err) {
      // Handle errors
      console.error(err) // @ts-ignore
      throw new ApolloError(err.message || err.toString())
    }
  }
  return Object.assign(wrappedResolver, {
    argSchema: resolver.argSchema.introspect(),
    resSchema: resolver.resSchema.introspect(),
    ARGS_TYPE: resolver['ARGS_TYPE'] as AT,
    RESP_TYPE: resolver['RESP_TYPE'] as AT,
  })
}

/** --- makeNextApiHandler() ------------------------------------------------------------------- **/
/** -i- Codegen: Build next.js api request from an aether resolver */
export const makeNextApiHandler = <AT, RT, AST, RST>(
  resolver: ((ctx?: ResolverInputType<AT>) => Promise<RT>) & { argSchema: AST; resSchema: RST },
  options?: {
    middleware?: MiddlewareFnType[]
    config?: ResolverInputType['config']
  }
) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const middleware = options?.middleware || []
    const config = options?.config || {}
    try {
      let middlewareArgs = {}
      if (!isEmpty(middleware)) {
        const middlewarePromises = middleware.map((mw) => runMiddleWare(req, res, mw))
        const middlewareResults = await Promise.all(middlewarePromises)
        middlewareResults.filter(Boolean).map((middlewareResult) => {
          if (typeof middlewareResult === 'object') {
            middlewareArgs = { ...middlewareArgs, ...middlewareResult }
          }
        })
      }
      const responseData = await resolver({ ...middlewareArgs, req, res, config })
      return res.status(200).json(responseData)
    } catch (err) {
      console.error(err)
      return res.status(500).json({ success: false, errors: [err] })
    }
  }
}

/* --- Exports --------------------------------------------------------------------------------- */

export default aetherResolver
