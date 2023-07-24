import { AetherSchemaType, SchemaPluginMap } from './aetherSchemas'

/** --- aetherSchemaPlugin() ------------------------------------------------------------------- */
/** -i- Map an aetherSchema definition to another data structure
 ** using mapping functions defined per aetherType
 ** e.g. ```aetherSchemaPlugin(schemaDef, { AetherString: createDefinition('String'), ... })``` */
const aetherSchemaPlugin = <T>(
  aetherSchema: AetherSchemaType<T>,
  schemaMap: SchemaPluginMap
): { [key: string]: T } => {
  return Object.entries(aetherSchema?.schema || {}).reduce((result, [schemaKey, schemaEntry]) => {
    // @ts-ignore
    const mappedSchemaFn = schemaMap[schemaEntry?.aetherType]
    // Skip if no mapping is found
    if (typeof mappedSchemaFn !== 'function') return result
    // Return mapped schema with new key
    return { ...result, [schemaKey]: mappedSchemaFn?.(schemaKey, schemaEntry) }
  }, {})
}

/* --- Exports --------------------------------------------------------------------------------- */

export { aetherSchemaPlugin }
export default aetherSchemaPlugin
