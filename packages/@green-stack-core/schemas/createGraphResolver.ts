import { z } from '../schemas'
import type { RequestContext } from '@app/middleware/createRequestContext'
 
/** --- createGraphResolver() ------------------------------------------------------------------ **/
/** -i- Codegen: Build a graphQL resolver from a schema resolver */
export const createGraphResolver = <
    ArgsShape extends z.ZodRawShape,
    ResShape extends z.ZodRawShape,
    ArgsInput = z.ZodObject<ArgsShape>['_input'],
    ResOutput = z.ZodObject<ResShape>['_output'],
>(
    resolver: ((input: { args: ArgsInput, context: RequestContext }) => Promise<ResOutput>) & {
        argSchema: z.ZodObject<ArgsShape>,
        resSchema: z.ZodObject<ResShape>,
        isMutation?: boolean
    },
) => {
    const wrappedResolver = async (parent: unknown, { args }: { args: ArgsInput }, context: RequestContext, info: unknown) => {
        return resolver({ args, context: { ...context, parent, info } })
    }
    return Object.assign(wrappedResolver, {
        argSchema: resolver.argSchema,
        resSchema: resolver.resSchema,
        _input: undefined as ArgsInput,
        _output: undefined as ResOutput,
        isMutation: resolver.isMutation,
    })
}
