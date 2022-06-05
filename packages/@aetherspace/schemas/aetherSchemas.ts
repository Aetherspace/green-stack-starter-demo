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
  optional?: boolean
  nullable?: boolean
  default?: unknown
  example?: T['TYPE']
  description?: string
  schemaName?: string
}

export type SchemaPluginMap = {
  // -- Primitives --
  AetherString: (name: string, schema: SchemaEntry<ReturnType<typeof AetherString>>) => unknown
  AetherNumber: (name: string, schema: SchemaEntry<ReturnType<typeof AetherNumber>>) => unknown
  AetherBoolean: (name: string, schema: SchemaEntry<ReturnType<typeof AetherBoolean>>) => unknown
  // -- Single values --
  AetherId: (name: string, schema: SchemaEntry<ReturnType<typeof AetherID>>) => unknown
  AetherColor: (name: string, schema: SchemaEntry<ReturnType<typeof AetherColor>>) => unknown
  AetherDate: (name: string, schema: SchemaEntry<ReturnType<typeof AetherDate>>) => unknown
  AetherEnum: (name: string, schema: SchemaEntry<ReturnType<typeof AetherEnum>>) => unknown
  // -- Objectlikes --
  AetherSchema: (name: string, schema: SchemaEntry<ReturnType<typeof AetherSchema>>) => unknown
  AetherObject: (name: string, schema: SchemaEntry<ReturnType<typeof AetherSchema>>) => unknown
  // -- Arraylikes --
  AetherArray: (name: string, schema: SchemaEntry<ReturnType<typeof AetherArray>>) => unknown
  AetherCollection: (name: string, schema: SchemaEntry<ReturnType<typeof AetherCollection>>) => unknown
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

const AetherID = aetherWrapper(ss.string, 'AetherID')
const AetherColor = aetherWrapper(ss.string, 'AetherColor')
const AetherString = aetherWrapper(ss.string, 'AetherString')
const AetherNumber = aetherWrapper(ss.number, 'AetherNumber')
const AetherBoolean = aetherWrapper(ss.boolean, 'AetherBoolean')
const AetherDate = aetherWrapper(ss.date, 'AetherDate')

const AetherEnum = <T extends string = string>(values: readonly T[]) => {
  const schema = assignDescriptors(ss.enums<T>(values), 'AetherEnum')
  return makeOptionalable<T, typeof schema['schema'], typeof schema>(schema, 'AetherEnum')
}

/* --- Advanced Schema Types ------------------------------------------------------------------- */

const AetherSchema = <S extends ObjectSchema>(schemaName: string, objSchema: S) => {
  const schema = assignDescriptors(ss.object(objSchema), 'AetherSchema', schemaName)
  return makeOptionalable<ObjectType<S>, typeof schema['schema'], typeof schema>(schema, 'AetherSchema', schemaName)
}

const AetherArray = <T extends ss.Struct<any>>(Element: T) => {
  const arraySchema = assignDescriptors(ss.array<T>(Element), 'AetherArray')
  return makeOptionalable<ss.Infer<T>[], typeof arraySchema['schema'], typeof arraySchema>(arraySchema, 'AetherSchema')
}

const AetherCollection = <S extends ObjectSchema>(schemaName: string, objSchema: S) => {
  const entrySchema = AetherSchema(schemaName, objSchema)
  return AetherArray(entrySchema)
}

/* --- Exports --------------------------------------------------------------------------------- */

export const AetherSchemaTypes = {
  // -- Primitives --
  string: AetherString,
  number: AetherNumber,
  boolean: AetherBoolean,
  // -- Single values --
  id: AetherID,
  color: AetherColor,
  date: AetherDate,
  enum: AetherEnum,
  // -- Objectlikes --
  schema: AetherSchema,
  object: AetherSchema,
  // -- Arraylikes --
  array: AetherArray,
  collection: AetherCollection,
}

export const ats = {
  ...AetherSchemaTypes,
  is: ss.is,
  validate: ss.validate,
  assert: ss.assert,
}

export default ats

/* --- Examples -------------------------------------------------------------------------------- */

// enum TEST_ENUM {
//   A = 'A',
//   B = 'B',
// }
// console.log(ats.schema('MySchema', {
//   id: ats.id().default('a')
//   ids: ats.array(ats.id())
//   str: ats.string().nullable().docs('example', 'description')
//   day: ats.date().optional().docs('01/01/2022', 'The start of the year')
//   num: ats.number().docs(5)
//   bln: ats.boolean().optional()
//   opt: ats.enum<TEST_ENUM>(Object.values(TEST_ENUM))
//   obj: ats.object('StringObject', { str: ats.str })
//   col: ats.array(ats.object('IDObject', { id: ats.id }))
//   coll: ats.collection('IDObject', { id: ats.id })
// }))

// ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓           (e.g. by testing with "yarn workspace scripts schema-test")

// {
//     "type": "object",
//     "schema": {
//         "id": {
//             "type": "string",
//             "schema": null,
//             "default": "a",
//             "aetherType": "AetherID"
//         },
//         "ids": {
//             "type": "array",
//             "schema": {
//                 "type": "string",
//                 "schema": null,
//                 "aetherType": "AetherID"
//             },
//             "aetherType": "AetherArray"
//         },
//         "str": {
//             "type": "string",
//             "schema": null,
//             "nullable": true,
//             "aetherType": "AetherString",
//             "example": "example",
//             "description": "description"
//         },
//         "day": {
//             "type": "date",
//             "schema": null,
//             "optional": true,
//             "aetherType": "AetherDate",
//             "example": "01/01/2022",
//             "description": "The start of the year"
//         },
//         "num": {
//             "type": "number",
//             "schema": null,
//             "aetherType": "AetherNumber",
//             "example": 5
//         },
//         "bln": {
//             "type": "boolean",
//             "schema": null,
//             "optional": true,
//             "aetherType": "AetherBoolean"
//         },
//         "opt": {
//             "type": "enums",
//             "schema": {
//                 "A": "A",
//                 "B": "B"
//             },
//             "aetherType": "AetherEnum"
//         },
//         "obj": {
//             "type": "object",
//             "schema": {
//                 "str": {
//                     "type": "string",
//                     "schema": null,
//                     "nullable": true,
//                     "aetherType": "AetherString",
//                     "example": "example",
//                     "description": "description"
//                 }
//             },
//             "aetherType": "AetherSchema",
//             "schemaName": "StringObject"
//         },
//         "col": {
//             "type": "array",
//             "schema": {
//                 "type": "object",
//                 "schema": {
//                     "id": {
//                         "type": "string",
//                         "schema": null,
//                         "default": "a",
//                         "aetherType": "AetherID"
//                     }
//                 },
//                 "aetherType": "AetherSchema",
//                 "schemaName": "IDObject"
//             },
//             "aetherType": "AetherArray"
//         },
//         "coll": {
//             "type": "array",
//             "schema": {
//                 "type": "object",
//                 "schema": {
//                     "id": {
//                         "type": "string",
//                         "schema": null,
//                         "default": "a",
//                         "aetherType": "AetherID"
//                     }
//                 },
//                 "aetherType": "AetherSchema",
//                 "schemaName": "IDObject"
//             },
//             "aetherType": "AetherArray"
//         }
//     },
//     "aetherType": "AetherSchema",
//     "schemaName": "MySchema"
// }
