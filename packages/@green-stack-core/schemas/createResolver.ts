import type {
  NextApiRequest,
  NextApiResponse,
  GetServerSidePropsContext,
  GetStaticPathsContext,
  GetStaticPropsContext,
} from 'next'
import { getApiParams, getHeaderContext } from '../utils/apiUtils'
import { parseUrlParamsObject } from '../utils/objectUtils'
import { z } from './index'

/* --- Types ----------------------------------------------------------------------------------- */

export type ResolverConfigType = {
    logErrors?: boolean
    respondErrors?: boolean
    allowFail?: boolean
    onError?: (err: any) => unknown | void
    [key: string]: any
  }
  
  export type ResolverInputType<ArgsInput = any> = {
    req?: NextApiRequest | Request | GetServerSidePropsContext['req']
    res?: NextApiResponse | Response | GetServerSidePropsContext['res']
    nextSsrContext?: GetServerSidePropsContext
    nextStaticPathsContext?: GetStaticPathsContext
    nextStaticPropsContext?: GetStaticPropsContext
    parent?: any
    args?: ArgsInput
    params?: { [key: string]: ArgsInput[keyof ArgsInput] | unknown }
    context?: any
    info?: any
    cookies?: NextApiRequest['cookies']
    config?: ResolverConfigType
    [key: string]: ArgsInput[keyof ArgsInput] | unknown
  }
  
  export type ResolverExecutionParamsType<ArgsInput = any, ResOutput = any, ResInput = any> = {
    args: ArgsInput
    handleError: (err: any, sendResponse?: boolean) => unknown | void
    parseArgs: (args: ArgsInput) => ArgsInput
    withDefaults: (response: ResInput) => ResOutput
    context: Record<string, unknown> & {
        req: NextApiRequest | Request | GetServerSidePropsContext['req']
    },
    user?: Record<string, unknown> | null
    config: ResolverConfigType
    req?: NextApiRequest | Request | GetServerSidePropsContext['req']
    res?: NextApiResponse | Response | GetServerSidePropsContext['res']
  }

/** --- createResolver() ----------------------------------------------------------------------- */
/** -i- Wrap a server side resolver function for easy use in both graphQL & rest endpoints + provide error handling */
export const createResolver = <
    ArgsOverride = null, // Args type override
    ResOverride = null, // Response type override
    ArgsShape extends z.ZodRawShape = any,
    ResShape extends z.ZodRawShape = any,
    ArgsInput = ArgsOverride extends null ? z.ZodObject<ArgsShape>['_input'] : ArgsOverride,
    ResOutput = ResOverride extends null ? z.ZodObject<ResShape>['_output'] : ResOverride,
    ResInput = ResOverride extends null ? z.ZodObject<ResShape>['_input'] : ResOverride,
>(
    resolverFn: (ctx: ResolverExecutionParamsType<ArgsInput, ResOutput, ResInput>) => Promise<ResOutput | unknown>,
    options: {
        paramKeys?: string,
        inputSchema: z.ZodObject<ArgsShape>,
        outputSchema: z.ZodObject<ResShape>,
        isMutation?: boolean
    },
) => {
    // Extract options
    const { paramKeys, inputSchema, outputSchema, isMutation } = options
    // Build Resolver
    const resolverWrapper = (ctx?: ResolverInputType<ArgsInput>): Promise<ResOutput> => {
        const { req, res, nextSsrContext, parent, args, context, info, cookies: _, ...resolverContext } = ctx || {} // prettier-ignore
        const { logErrors, respondErrors, allowFail, onError, ...restParams } = resolverContext
        // Collect params from all possible sources
        const { body, method } = (req as NextApiRequest) || {}
        const schemaParamKeys = Object.keys(inputSchema?.shape ?? {})
        const apiParamKeys = [ctx?.paramKeys, paramKeys || schemaParamKeys].flat().filter(Boolean).join(' ') // prettier-ignore
        const query = { ...nextSsrContext?.query, ...(req as NextApiRequest)?.query }
        const params = { ...restParams, ...nextSsrContext?.params, ...context, ...ctx?.params } // @ts-ignore
        const cookies = nextSsrContext?.req?.cookies || req?.cookies || ctx?.cookies
        const relatedArgs = apiParamKeys ? getApiParams(apiParamKeys, { query, params, body, args, context }) : {} // prettier-ignore
        const normalizedArgs = parseUrlParamsObject(relatedArgs)
        // Build config from all possible sources
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
        // Context normalization
        const headerContext = getHeaderContext(req)
        const fullContext = { ...headerContext, ...config, req: config.req || req } // Always override header context with config
        const user = fullContext?.user as Record<string, unknown> | undefined | null
        // Error handling
        const handleError = (err: any$FixMe, sendResponse = false) => {
            const isRichError = typeof err === 'object' && !!err.errors
            const errorObj = isRichError ? err : { errors: [err] }
            const { code = 500 } = errorObj
            // Log errors?
            if (config?.logErrors) console.error(errorObj)
            // Build custom error?
            if (typeof config?.onError === 'function' && config.allowFail) {
                config.onError(errorObj)
            } else if (typeof config?.onError === 'function') {
                return config.onError(errorObj)
            }
            // Allow errors?
            if (config.allowFail || config.onError === 'return') {
                return { success: false, ...errorObj }
            }
            // Respond?
            if (!!res && sendResponse && !config.allowFail) {
                return (res as NextApiResponse).status(code).json(errorObj)
            } else {
                throw new Error(isRichError ? errorObj : err)
            }
        }
        // Validation helpers
        const parseArgs = (args: ArgsInput) => inputSchema.parse(args) as ArgsInput
        const withDefaults = (response: ResInput) => {
            return outputSchema.applyDefaults(response as any$Ignore) as ResOutput
        }
        // Return resolver
        return resolverFn({
            req: fullContext.req,
            res,
            args: normalizedArgs as ArgsInput,
            user,
            context: fullContext,
            config,
            handleError,
            parseArgs,
            withDefaults,
        }) as unknown as Promise<ResOutput>
    }
    // Return Resolver
    return Object.assign(resolverWrapper, {
        argSchema: inputSchema,
        resSchema: outputSchema,
        _input: undefined as ArgsInput,
        _output: undefined as ResOutput,
        isMutation,
    })
}
