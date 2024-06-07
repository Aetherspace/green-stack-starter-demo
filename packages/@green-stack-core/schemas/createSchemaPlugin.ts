import { z, SCHEMA_TYPE, Metadata } from './index'

/* --- Types ----------------------------------------------------------------------------------- */

export type SchemaTypeMap = {
    [key in SCHEMA_TYPE]?: (schemaKey: string, fieldMeta: Metadata) => unknown
}

export type SchemaPluginMap<S extends z.ZodRawShape> = SchemaTypeMap & {
    [key in keyof S]?: (schemaKey: string, fieldMeta: Metadata) => unknown
}

/** --- createSchemaPlugin() ------------------------------------------------------------------- */
/** -i- Maps a schema as single source of truth to another data structure
 *  @param schema - The schema to map to a new structure
 *  @param schemaTypeMap - Object providing a builder fn for possible baseType, zodType or schemaKey
 *  @example ```
 *  createSchemaPlugin(UserSchema, {
 *      // e.g. Base Types (can be overridden by more specific types)
 *      String: createDef(MongoString),
 *      // e.g. Zod Types (more specific, overrides base types)
 *      ZodBoolean: createDef(MongoBool),
 *      // e.g. Schema Property keys (most specific, highest priority)
 *      userID: createDef(MongoObjectID),
 *  })
 *  ``` */
export const createSchemaPlugin = <
    S extends z.ZodRawShape,
    P extends SchemaPluginMap<S>
>(
    schema: z.ZodObject<S>,
    schemaTypeMap: P
) => {
    const metadata = schema.introspect() as Metadata<Record<string, Metadata>>
    const mappedSchema = Object.entries(metadata.schema!).reduce((result, [schemaKey, fieldMeta]) => {
        const { baseType, zodType } = fieldMeta
        // Figure out the builder to use, going from least specific to most specific
        let mappedSchemaBuilder
        if (schemaTypeMap[baseType]) mappedSchemaBuilder = schemaTypeMap[baseType]
        if (schemaTypeMap[zodType]) mappedSchemaBuilder = schemaTypeMap[zodType]
        if (schemaTypeMap[schemaKey]) mappedSchemaBuilder = schemaTypeMap[schemaKey]
        // Skip if no builder was found
        if (!mappedSchemaBuilder) return result
        // Return mapped schema with new key
        const newStructure = mappedSchemaBuilder(schemaKey, fieldMeta)
        return { ...result, [schemaKey]: newStructure }
    }, {})
    // Return mapped schema
    return mappedSchema as {
        [K in keyof S]: SchemaPluginMap<S>[K] extends (schemaKey: string, fieldMeta: Metadata) => infer R ? R : unknown
    }
}
