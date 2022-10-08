import { ApolloServer } from 'apollo-server-micro'
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core'
// Schemas
import { aetherGraphSchema, ResolverMapType } from 'aetherspace/schemas'
// Resolvers
import * as resolvers from 'registries/resolvers.generated'

/* --- Debug ----------------------------------------------------------------------------------- */

// const graphqlHandler = (req: any, res: any) => {
//   const schema = aetherGraphSchema(resolvers as unknown as ResolverMapType)
//   return res.status(200).json({
//     queries: Object.keys(schema.resolvers.Query || {}),
//     mutations: Object.keys(schema.resolvers.Mutations || {}),
//     schema: schema.typeDefs,
//   })
// }

/* --- /api/graphql ---------------------------------------------------------------------------- */

// Build executable GraphQL schema from resolvers
const schema = aetherGraphSchema(resolvers as unknown as ResolverMapType)

// Create Apollo Server with schema
const apolloServer = new ApolloServer({
  typeDefs: schema.typeDefs,
  resolvers: schema.resolvers,
  context: ({ req, res }) => ({ req, res }),
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground],
  introspection: true,
})

// @ts-ignore
await apolloServer.start() // Required to make ApolloServer work
const graphqlHandler = apolloServer.createHandler({ path: '/api/graphql' })

/* --- API Config ------------------------------------------------------------------------------ */

// Config needs to be exported because we are changing default values in Next.JS API https://nextjs.org/docs/api-routes/api-middlewares
// This is required for GraphQL to work properly  https://blog.logrocket.com/building-a-graphql-server-in-next-js/
export const config = {
  api: {
    bodyParser: false,
  },
}

/* --- Exports --------------------------------------------------------------------------------- */

export default graphqlHandler
