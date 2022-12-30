import { z as zod } from 'zod'
import zodToJsonSchema from 'zod-to-json-schema'
import type { JSONSchema7 } from 'json-schema'

/* --- Types ----------------------------------------------------------------------------------- */

const SCHEMA_MAP = Object.freeze({
  boolean: 'AetherBoolean',
  number: 'AetherNumber',
  string: 'AetherString',
  date: 'AetherDate',
  object: 'AetherSchema',
  array: 'AetherArray',
  color: 'AetherColor',
  id: 'AetherId',
})

export type AetherZodType<T = any> = {
  type: keyof typeof SCHEMA_MAP
  aetherType: typeof SCHEMA_MAP[keyof typeof SCHEMA_MAP]
  description?: string
  defaultValue?: T
  schemaName?: string
  isOptional?: boolean
  isNullable?: boolean
  schema?: AetherZodType | Record<string, any>
}

export type ZodObjectSchema = zod.ZodObject<zod.ZodRawShape>
export type ZodExtendedSchema = ZodObjectSchema & { zodSchema: ZodObjectSchema }

export type DropFirst<T extends unknown[]> = T extends [any, ...infer U] ? U : never

/** --- parseType() ---------------------------------------------------------------------------- */
/** -i- Add correct fields like type & aetherType while converting a JSON schema prop definition to aetherspace prop definition. */
const parseType = (propDef: JSONSchema7, propSchema: Record<string, unknown> = {}) => {
  // @ts-ignore
  const { type: propType, enum: propEnum, anyOf } = propDef
  if (Array.isArray(propType)) {
    propSchema.isNullable = propType.includes('null')
    const leftoverType = propType.filter((type: string) => type !== 'null')[0]
    propSchema.aetherType = SCHEMA_MAP[leftoverType]
    propSchema.type = leftoverType
  } else if (propDef.format === 'date-time') {
    propSchema.aetherType = 'AetherDate'
    propSchema.type = 'date'
  } else if (propEnum) {
    propSchema.aetherType = 'AetherEnum'
    propSchema.type = 'enums'
    propSchema.schema = propEnum.reduce(
      (acc, enumVal) => ({
        ...(acc as Record<string, string | number>),
        [enumVal as string]: enumVal,
      }),
      {}
    )
  } else {
    propSchema.aetherType = SCHEMA_MAP[propType!]
    propSchema.type = propType
  }
  // Return
  return propSchema
}

/** --- parseProp() ---------------------------------------------------------------------------- */
/** -i- Convert a JSON schema prop definition to an aetherspace prop definition */
const parseProp = (propKey: string, propDef: JSONSchema7, parseContext: { required: string[] }) => {
  // @ts-ignore
  const { type: propType, default: propDefault, description } = propDef
  const required = parseContext?.required
  let propSchema = {} as Record<string, unknown>
  // Determine if optional
  propSchema.isOptional = required ? !required.includes(propKey) : true
  // Determine types
  propSchema = parseType(propDef, propSchema)
  // Handle descriptions
  if (description && propSchema.type !== 'object') propSchema.description = description
  // Handle defaults
  if (propDefault) propSchema.defaultValue = propDefault
  // Handle objects
  if (propType === 'object') {
    propSchema = { ...propSchema, ...parseSchema(propDef as JSONSchema7) }
  }
  // Handle arrays
  if (propSchema.aetherType === 'AetherArray') {
    propSchema.schema = parseProp(propKey, propDef.items as Record<string, unknown>, parseContext)
  }
  // Return parsed schema
  return propSchema
}

/** --- parseSchema() -------------------------------------------------------------------------- */
/** -i- Convert a JSON schema object to an aetherspace compatible schema */
const parseSchema = (schema: JSONSchema7) => {
  // @ts-ignore
  const { type, description, properties, required = [] } = schema
  // Do nothing when not an object
  if (type !== 'object') return {}
  // Build aether schema
  const resultSchema = {} as Record<string, any>
  resultSchema.aetherType = 'AetherSchema'
  resultSchema.type = type
  resultSchema.schemaName = description
  // Parse properties
  resultSchema.schema = Object.entries(properties!).reduce((atSchema, [propKey, propDef]) => {
    const propSchema = parseProp(propKey, propDef as Record<string, unknown>, { required })
    // Abort if unknown
    if (!propSchema.aetherType) {
      console.warn(`Unknown prop type: ${propKey} (${propSchema.type})`, propSchema)
      return atSchema
    }
    // Return prop definition
    return { ...atSchema, [propKey]: propSchema }
  }, {})
  // Return parsed schema
  return resultSchema
}

/** --- assignDefs() --------------------------------------------------------------------------- */
/** -i- Add key & schema definition to zod object */
const assignDefs = <S extends zod.ZodRawShape>(
  zodSchema: zod.ZodObject<S>,
  key: string,
  schemaDef: S
) => {
  return Object.assign(zodSchema, { key, schemaDef })
}

// -!- DON'T USE .describe() in helpers, it will break the schema definition
/** --- aetherSchema() ------------------------------------------------------------------------- */
/** -i- Defines your datastructure (Props, Args, Models) as a zod powered single source of truth */
export const aetherSchema = <S extends zod.ZodRawShape>(key: string, schemaDef: S) => {
  // Attach key & schema definition
  const zodSchema = assignDefs(zod.object(schemaDef), key, schemaDef)
  // Attach transform methods
  return Object.assign(zodSchema.describe(key), {
    extendSchema: <E extends zod.ZodRawShape>(key: string, newProps: E) => {
      return aetherSchema(key, { ...schemaDef, ...newProps })
    },
  })
}

/* --- Test ------------------------------------------------------------------------------------ */

const typeDef = {
  id: zod.string(),
  name: zod.string().optional(),
  age: zod.number().int(),
}

const extDef = {
  email: zod.string().email(),
}

const ZodTest = zod.object(typeDef)
type ZodTest = zod.infer<typeof ZodTest>
const AetherTest = aetherSchema('AetherTest', typeDef)
type AetherTest = zod.infer<typeof AetherTest>

const ZodExtended = ZodTest.extend(extDef)
type ZodExtended = zod.infer<typeof ZodExtended>
const AetherExtended = AetherTest.extendSchema('AetherExtended', extDef)
type AetherExtended = zod.infer<typeof AetherExtended>
