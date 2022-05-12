// Schemas
import { ats } from 'aetherspace/schemas'
// Resolvers
import { aetherResolver, makeNextApiHandler, AetherArgs, AetherResp } from 'aetherspace/utils/serverUtils'

/* --- Schemas --------------------------------------------------------------------------------- */

const echoArgsResolverArgsSchema = ats.schema('TestResolverArgs', {
  id: ats.id(),
  str: ats.string().nullable(),
  num: ats.number().default(0),
  bln: ats.boolean().optional(),
  arr: ats.array(ats.id()).optional(),
  obj: ats.object({ prop: ats.string() }).optional(),
  col: ats.collection({ _id: ats.id() }).optional(),
})

const echoArgsResolversResponseSchema = ats.schema('TestResolverResponse', {
  args: ats.object(echoArgsResolverArgsSchema.schema),
})

/* --- Resolver -------------------------------------------------------------------------------- */

export const echoArgsResolver = aetherResolver(
  async ({ args }) => {
    return { args } as typeof echoArgsResolversResponseSchema['TYPE']
  },
  {
    argsSchema: echoArgsResolverArgsSchema,
    responseSchema: echoArgsResolversResponseSchema,
  }
)

/* --- Types ----------------------------------------------------------------------------------- */

export type echoArgsResolverArgsType = AetherArgs<typeof echoArgsResolver>
export type echoArgsResolverRespType = AetherResp<typeof echoArgsResolver>

/* --- /api/echo ------------------------------------------------------------------------------- */

export default makeNextApiHandler(echoArgsResolver)
