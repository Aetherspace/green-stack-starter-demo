import * as ss from 'superstruct'
import { ObjectSchema, ObjectType, StructSchema } from 'superstruct/lib/utils'

/* --- Types ----------------------------------------------------------------------------------- */

export type AetherSchemaType = ss.Struct<any, any>
export type Infer<T extends AetherSchemaType> = T['TYPE'] // Same as superstruct's Infer type
export type Describe<T> = ss.Struct<T, StructSchema<T>> // Same as superstruct's Describe type

// -i- Use to extend individual schema entries
export type SchemaEntry<T extends AetherSchemaType> = {
  type: string
  aetherType: string
  schema: T['schema'] | null
  optional: boolean
  nullable: boolean
  default: unknown
  example: T['TYPE']
  description: string
}

export type SchemaPluginMap = {
  // -- Primitives --
  AetherString: (name: string, schema: SchemaEntry<ReturnType<typeof aetherString>>) => unknown
  AetherNumber: (name: string, schema: SchemaEntry<ReturnType<typeof aetherNumber>>) => unknown
  AetherBoolean: (name: string, schema: SchemaEntry<ReturnType<typeof aetherBoolean>>) => unknown
  // -- Single values --
  AetherId: (name: string, schema: SchemaEntry<ReturnType<typeof aetherID>>) => unknown
  AetherColor: (name: string, schema: SchemaEntry<ReturnType<typeof aetherColor>>) => unknown
  AetherDate: (name: string, schema: SchemaEntry<ReturnType<typeof aetherDate>>) => unknown
  AetherEnum: (name: string, schema: SchemaEntry<ReturnType<typeof aetherEnum>>) => unknown
  // -- Objectlikes --
  AetherSchema: (name: string, schema: SchemaEntry<ReturnType<typeof aetherSchema>>) => unknown
  AetherObject: (name: string, schema: SchemaEntry<ReturnType<typeof aetherObject>>) => unknown
  // -- Arraylikes --
  AetherArray: (name: string, schema: SchemaEntry<ReturnType<typeof aetherArray>>) => unknown
  AetherCollection: (name: string, schema: SchemaEntry<ReturnType<typeof aetherCollection>>) => unknown
}

/* --- Helpers --------------------------------------------------------------------------------- */

const assignDescriptors = <R>(schema: R, aetherType: string, schemaName?: string) => {
  return Object.assign(schema, {
    // Chain command for docs, indicating example value & description to schema property (e.g. for Storybook)
    docs: (example, description?: string) => Object.assign(schema, { example, description }),
    // Chain command for indicating default value + add example & description for docs
    default: (defaultVal, example?: any, description?: string) => {
      return Object.assign(schema, {
        default: defaultVal,
        ...(example ? { example } : null),
        ...(description ? { description } : null),
      })
    },
    // Assign type to schema object for later interpretation
    aetherType,
    // Assign schemaName (if known) to object for later interpretation
    ...(schemaName ? { schemaName } : null),
  })
}

const makeOptionalable = <T, S, ST extends ss.Struct<T, S>>(schema: ST, aetherType: string, schemaName?: string) => {
  return Object.assign(schema, {
    // Chain command to indicate the field can be nullable (e.g. in GraphQL)
    nullable: () => {
      const newSchema = Object.assign(ss.nullable(schema), { nullable: true })
      return assignDescriptors(newSchema, aetherType, schemaName)
    },
    // Chain command to indicate the field can be omitted / undefined (e.g. in Docs)
    optional: (nullable?: boolean) => {
      const newSchema = Object.assign(ss.optional(schema), { optional: true })
      if (!nullable) return assignDescriptors(newSchema, aetherType, schemaName)
      return assignDescriptors(Object.assign(ss.nullable(newSchema), { nullable: true }), aetherType, schemaName); // prettier-ignore
    },
  })
}

const aetherWrapper = <A extends any[], T, S>(struct: (...args: A) => ss.Struct<T, S>, aetherType: string) => {
  return (...args: A) => {
    // Add chain commands for extending with default or documentation descriptions
    const schema = assignDescriptors(struct(...args), aetherType)
    // Add chain commands for nullable & optional fields or properties
    return makeOptionalable<T, S, typeof schema>(schema, aetherType)
  }
}

/* --- Primitive Schema Types ------------------------------------------------------------------ */

export const aetherID = aetherWrapper(ss.string, 'AetherID')
export const aetherColor = aetherWrapper(ss.string, 'AetherColor')
export const aetherString = aetherWrapper(ss.string, 'AetherString')
export const aetherNumber = aetherWrapper(ss.number, 'AetherNumber')
export const aetherBoolean = aetherWrapper(ss.boolean, 'AetherBoolean')
export const aetherDate = aetherWrapper(ss.date, 'AetherDate')

export const aetherEnum = <T extends string = string>(values: readonly T[]) => {
  const schema = assignDescriptors(ss.enums<T>(values), 'AetherEnum')
  return makeOptionalable<T, typeof schema['schema'], typeof schema>(schema, 'AetherEnum')
}

/* --- Advanced Schema Types ------------------------------------------------------------------- */

export const aetherSchema = <S extends ObjectSchema>(schemaName: string, objSchema: S) => {
  const aetherSchema = assignDescriptors(ss.object(objSchema), 'aetherSchema', schemaName)
  return makeOptionalable<ObjectType<S>, typeof aetherSchema['schema'], typeof aetherSchema>(
    aetherSchema,
    'AetherSchema',
    schemaName
  )
}

export const aetherObject = <S extends ObjectSchema>(objSchema: S) => aetherSchema('', objSchema)

export const aetherArray = <T extends ss.Struct<any>>(Element: T) => {
  const arraySchema = assignDescriptors(ss.array<T>(Element), 'AetherArray')
  return makeOptionalable<ss.Infer<T>[], typeof arraySchema['schema'], typeof arraySchema>(arraySchema, 'AetherSchema')
}

export const aetherCollection = <S extends ObjectSchema>(objSchema: S) => {
  const entrySchema = aetherObject(objSchema)
  return aetherArray(entrySchema)
}

/* --- Exports --------------------------------------------------------------------------------- */

export const AetherSchemaTypes = {
  // -- Primitives --
  string: aetherString,
  number: aetherNumber,
  boolean: aetherBoolean,
  // -- Single values --
  id: aetherID,
  color: aetherColor,
  date: aetherDate,
  enum: aetherEnum,
  // -- Objectlikes --
  schema: aetherSchema,
  object: aetherObject,
  // -- Arraylikes --
  array: aetherArray,
  collection: aetherCollection,
}

export const ats = {
  ...AetherSchemaTypes,
  is: ss.is,
  validate: ss.validate,
  assert: ss.assert,
}

export default ats
