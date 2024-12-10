#!/usr/bin/env node --experimental-specifier-resolution=node
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'node:url'
import { loadFilesSync } from '@graphql-tools/load-files'
import { mergeTypeDefs } from '@graphql-tools/merge'
import { print } from 'graphql'
import { createGraphSchemaDefs } from '../schemas/createGraphSchemaDefs'
import * as resolvers from '@app/registries/resolvers.generated'

/* --- Constants ------------------------------------------------------------------------------- */

const currentDir = path.dirname(fileURLToPath(import.meta.url))
const schemaPath = path.resolve(currentDir, '../../../features/@app-core/graphql', 'schema.graphql')
const typeDefsPath = path.resolve(currentDir, '../../../features/@app-core/graphql', 'typeDefs.ts')

const disclaimer = `-i- This file was generated using the 'npx turbo run @green-stack/core#build:schema' script. Don't modify it manually.\n`

const CUSTOM_SCALARS = ['scalar Date', 'scalar JSON', 'scalar JSONObject'] as const

/** --- createSchemaDefinitions() -------------------------------------------------------------- */
/** -i- Combine all custom and other (e.g. generated) .graphql schema definitions */
export const createSchemaDefinitions = (extraResolvers: any[] = []) => {
    const rootDir = path.resolve(currentDir, '../../..')
    const schemaPathPattern = `${rootDir}/(features|packages)/**/!(schema).graphql`
    const customGraphQLDefinitions = loadFilesSync(schemaPathPattern)
    return mergeTypeDefs([
        ...CUSTOM_SCALARS,
        ...customGraphQLDefinitions,
        ...extraResolvers,
    ])
}

/* --- Script ---------------------------------------------------------------------------------- */

const buildSchemaDefinitions = async () => {
    // @ts-ignore
    const { graphqlSchemaDefs } = createGraphSchemaDefs(resolvers)
    const schemaDefinitions = createSchemaDefinitions([graphqlSchemaDefs])
    const typeDefsString = print(schemaDefinitions)
    fs.writeFileSync(schemaPath, `## ${disclaimer}\n${typeDefsString}\n`)
    fs.writeFileSync(typeDefsPath, `// ${disclaimer}\nexport const typeDefs = \`${typeDefsString}\`\n`)
}

buildSchemaDefinitions()
