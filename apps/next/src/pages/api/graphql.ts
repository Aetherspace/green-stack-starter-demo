import { NextApiRequest, NextApiResponse } from 'next'
// Schemas
import { aetherGraphSchema, ResolverMapType } from 'aetherspace/schemas'
// Resolvers
import * as resolvers from 'app/registries/resolvers.generated'

/* --- /api/graphql ----------------------------------------------------------------------------- */

const graphqlHandler = (req: NextApiRequest, res: NextApiResponse) => {
  const schema = aetherGraphSchema(resolvers as unknown as ResolverMapType)
  return res.status(200).json({
    resolvers: Object.keys(resolvers),
    schema,
  })
}

/* --- Exports --------------------------------------------------------------------------------- */

export default graphqlHandler
