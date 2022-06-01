import { AetherSchemaType, SchemaPluginMap } from './aetherSchemas'

/* --- aetherSchemaPlugin() --------------------------------------------------------------------- */

const aetherSchemaPlugin = <T>(aetherSchema: AetherSchemaType, schemaMap: SchemaPluginMap): { [key: string]: T } => {
  return Object.entries(aetherSchema.schema).reduce((result, [schemaKey, schemaEntry]) => {
    // @ts-ignore
    const mappedSchemaFn = schemaMap[schemaEntry?.aetherType]
    if (typeof mappedSchemaFn !== 'function') return result
    return { ...result, [schemaKey]: mappedSchemaFn?.(schemaKey, schemaEntry) }
  }, {})
}

/* --- Exports --------------------------------------------------------------------------------- */

export { aetherSchemaPlugin }
export default aetherSchemaPlugin
