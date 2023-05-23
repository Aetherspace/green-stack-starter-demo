import { startServerAndCreateNextHandler } from '@as-integrations/next'
import { ApolloServer } from '@apollo/server'
import { writeFileSync } from 'fs'
import { printSchema } from 'graphql'
// Schemas
import { schemaDefs, schema } from 'app/graphql/schema'

/* --- Save schema ----------------------------------------------------------------------------- */

// Save graphql schema to next root?
if (process.env.NODE_ENV === 'development') {
  const schemaDefinitions = printSchema(schema)
  writeFileSync('./schema.graphql', schemaDefinitions)
}

/* --- Apollo Server --------------------------------------------------------------------------- */

const server = new ApolloServer({
  typeDefs: schemaDefs.typeDefs,
  resolvers: schemaDefs.resolvers,
  plugins: [],
  introspection: true,
})

const handler = startServerAndCreateNextHandler(server)

/* --- /api/labs/graphql ----------------------------------------------------------------------- */

export const GET = (req: Request) => handler(req)

export const POST = (req: Request) => handler(req)
