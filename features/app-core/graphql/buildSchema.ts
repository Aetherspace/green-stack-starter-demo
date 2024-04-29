#!/usr/bin/env node --experimental-specifier-resolution=node
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'node:url'
import { loadFilesSync } from '@graphql-tools/load-files'
import { mergeTypeDefs } from '@graphql-tools/merge'
import { print } from 'graphql'

/* --- Constants ------------------------------------------------------------------------------- */

const currentDir = path.dirname(fileURLToPath(import.meta.url))
const schemaPath = path.resolve(currentDir, 'schema.graphql')
const typeDefsPath = path.resolve(currentDir, 'typeDefs.ts')

/** --- createSchemaDefinitions() -------------------------------------------------------------- */
/** -i- Combine all custom and other (e.g. generated) graphql schema definitions */
export const createSchemaDefinitions = () => {
    const rootDir = path.resolve(currentDir, '../../..')
    const schemaPathPattern = `${rootDir}/(features|packages)/**/!(schema).graphql`
    const customGraphQLDefinitions = loadFilesSync(schemaPathPattern)
    return mergeTypeDefs([
        ...customGraphQLDefinitions,
        /* other typedefs? */
    ])
}

/* --- Script ---------------------------------------------------------------------------------- */

const buildSchemaDefinitions = async () => {
    const schemaDefinitions = createSchemaDefinitions()
    const typeDefsString = print(schemaDefinitions)
    fs.writeFileSync(schemaPath, typeDefsString)
    fs.writeFileSync(typeDefsPath, `export const typeDefs = \`${typeDefsString}\``)
}

buildSchemaDefinitions()
