// Schemas
import { ats } from 'aetherspace/schemas'
// Resolvers
import { aetherResolver, makeNextApiHandler, AetherArgs, AetherResponse } from 'aetherspace/utils/serverUtils'

/* --- Schemas --------------------------------------------------------------------------------- */

export const TestResolverArgs = ats.schema('TestResolverArgs', {
  id: ats.id(),
  str: ats.string().nullable(),
  num: ats.number().default(0),
  bln: ats.boolean().optional(),
  arr: ats.array(ats.id()).optional(),
  obj: ats.object('MyObject', { prop: ats.string() }).optional(),
  col: ats.collection('CollectionObject', { _id: ats.id() }).optional(),
})

export const TestResolverResponse = ats.schema('TestResolverResponse', {
  args: ats.object('Arguments', TestResolverArgs.schema),
})

const resolverConfig = {
  argsSchema: TestResolverArgs,
  responseSchema: TestResolverResponse,
}

/* --- testResolver() -------------------------------------------------------------------------- */

export const testResolver = aetherResolver(async ({ args }) => ({ args }), resolverConfig)

/* --- Exports --------------------------------------------------------------------------------- */

export type TestResolverArgsType = AetherArgs<typeof testResolver>
export type TestResolverRespType = AetherResponse<typeof testResolver>
export default makeNextApiHandler(testResolver)
