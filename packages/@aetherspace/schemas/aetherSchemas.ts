import * as ss from 'superstruct'
import { z } from 'zod'
import zodToJsonSchema from 'zod-to-json-schema'
import type {
  ObjectSchema,
  ObjectType,
  StructSchema,
  Simplify,
  Optionalize,
} from 'superstruct/lib/utils'

import type { JSONSchema7 } from 'json-schema'

/* ### ZOD ##################################################################################### */
/* ### ZOD ##################################################################################### */
/* ### ZOD ##################################################################################### */

/* --- Constants ------------------------------------------------------------------------------- */

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

/* --- Types ----------------------------------------------------------------------------------- */

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

export type DropFirst<T extends unknown[]> = T extends [any, ...infer U] ? U : never

/* --- Helpers --------------------------------------------------------------------------------- */

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

// /* --- Schema Builders ------------------------------------------------------------------------- */

// // Allow extending schema
// // const extendSchema = <EK extends string, EZ extends zod.ZodRawShape>(key: EK, zodExtDef: EZ) => {
// //   return aetherSchema(key, { ...zodExtDef, ...zodSchemaDef })
// // }

// type AetherZodSchema = zod.ZodObject<zod.ZodRawShape> | AssignType<zod.ZodObject<zod.ZodRawShape>>

// // Allow picking schema
// const pickSchema = <
//   SCHEMA extends AetherZodSchema,
//   KEY extends string,
//   PICKS extends Parameters<SCHEMA['pick']>[0]
// >(
//   schema: SCHEMA,
//   key: KEY,
//   picks: PICKS
// ) => {
//   const pickedSchema = schema.pick(picks).describe(key)
//   return assignMethods(key, pickedSchema)
// }

// // Allow omitting schema
// const omitSchema = <
//   SCHEMA extends AetherZodSchema,
//   KEY extends string,
//   OMITS extends Parameters<SCHEMA['pick']>[0]
// >(
//   schema: SCHEMA,
//   key: KEY,
//   omits: OMITS
// ) => {
//   const omittedSchema = schema.omit(omits).describe(key)
//   return assignMethods(key, omittedSchema)
// }

// // Allow requiring schema
// const requiredSchema = <SCHEMA extends AetherZodSchema, KEY extends string>(
//   schema: SCHEMA,
//   key: KEY
// ) => {
//   const requiredSchema = schema.required().describe(key)
//   return assignMethods(key, requiredSchema)
// }

// // Allow partial schema
// const partialSchema = <SCHEMA extends AetherZodSchema, KEY extends string>(
//   schema: SCHEMA,
//   key: KEY
// ) => {
//   const partialSchema = schema.partial().describe(key)
//   return assignMethods(key, partialSchema)
// }

// // Allow deep partials
// const deepPartialSchema = <SCHEMA extends AetherZodSchema, KEY extends string>(
//   schema: SCHEMA,
//   key: KEY
// ) => {
//   const partialSchema = schema.deepPartial().describe(key)
//   return assignMethods(key, partialSchema)
// }

// class AssignHelper<
//   SCHEMA extends AetherZodSchema,
//   KEY extends string,
//   PICKS extends Parameters<SCHEMA['pick']>[0] = Parameters<SCHEMA['pick']>[0]
// > {
//   pickSchema = (...args: [SCHEMA, KEY, PICKS]) => pickSchema<SCHEMA, KEY, PICKS>(...args)
//   omitSchema = (...args: [SCHEMA, KEY, PICKS]) => omitSchema<SCHEMA, KEY, PICKS>(...args)
//   requiredSchema = (...args: [SCHEMA, KEY]) => requiredSchema<SCHEMA, KEY>(...args)
//   partialSchema = (...args: [SCHEMA, KEY]) => partialSchema<SCHEMA, KEY>(...args)
//   deepPartialSchema = (...args: [SCHEMA, KEY]) => deepPartialSchema<SCHEMA, KEY>(...args)
// }

// type AssignType<SCHEMA extends AetherZodSchema> = SCHEMA & {
//   key?: string
//   name?: string
//   describe?: never
//   pickSchema?: (
//     ...args: DropFirst<Parameters<typeof pickSchema>>
//   ) => ReturnType<AssignHelper<SCHEMA, typeof args[0], typeof args[1]>['pickSchema']>
//   omitSchema?: (
//     ...args: DropFirst<Parameters<typeof omitSchema>>
//   ) => ReturnType<AssignHelper<SCHEMA, typeof args[0], typeof args[1]>['omitSchema']>
//   requiredSchema?: (
//     ...args: DropFirst<Parameters<typeof requiredSchema>>
//   ) => ReturnType<AssignHelper<SCHEMA, typeof args[0]>['requiredSchema']>
//   partialSchema?: (
//     ...args: DropFirst<Parameters<typeof partialSchema>>
//   ) => ReturnType<AssignHelper<SCHEMA, typeof args[0]>['partialSchema']>
//   deepPartialSchema?: (
//     ...args: DropFirst<Parameters<typeof deepPartialSchema>>
//   ) => ReturnType<AssignHelper<SCHEMA, typeof args[0]>['deepPartialSchema']>
// }

// // Assign methods
// const assignMethods = <KEY extends string, SCHEMA extends AetherZodSchema>(
//   key: KEY,
//   schema: SCHEMA
// ) => {
//   return Object.assign(schema, {
//     key,
//     name: key,
//     describe: null as never,
//     // extendSchema,
//     pickSchema: (...args: DropFirst<Parameters<typeof pickSchema>>) => {
//       return pickSchema(schema, ...args)
//     },
//     omitSchema: (...args: DropFirst<Parameters<typeof omitSchema>>) => {
//       return omitSchema(schema, ...args)
//     },
//     requiredSchema: (...args: DropFirst<Parameters<typeof requiredSchema>>) => {
//       return requiredSchema(schema, ...args)
//     },
//     partialSchema: (...args: DropFirst<Parameters<typeof partialSchema>>) => {
//       return partialSchema(schema, ...args)
//     },
//     deepPartialSchema: (...args: DropFirst<Parameters<typeof deepPartialSchema>>) => {
//       return deepPartialSchema(schema, ...args)
//     },
//     introspect: () => {
//       return {
//         result: parseSchema(zodToJsonSchema(schema) as JSONSchema7),
//         jsonSchema: zodToJsonSchema(schema),
//       }
//     },
//   })
// }

// /* --- aetherSchema() -------------------------------------------------------------------------- */

// const aetherSchema = <K extends string, Z extends zod.ZodRawShape>(key: K, zodSchemaDef: Z) => {
//   const zodSchema = zod.object(zodSchemaDef)
//   return assignMethods(key, zodSchema.describe(key))
// }

// const TestSchema = aetherSchema('TestSchema', {
//   name: zod.string().optional(),
// })
// type Test = zod.infer<typeof TestSchema>

// // const PickSchema = TestSchema.pickSchema('PickSchema', { test: true })
// const PickSchema = pickSchema(TestSchema, 'PickSchema', { name: true })
// type Pick = zod.infer<typeof PickSchema>

// /* --- Zod ------------------------------------------------------------------------------------- */

// type ZodExtended = typeof zod & {
//   schema: typeof aetherSchema
//   id: zod.ZodString
//   color: zod.ZodString
// }

// const z = Object.assign(zod, {
//   schema: aetherSchema,
//   id: zod.string(),
//   color: zod.string().regex(/^(#|0x)?[0-9a-fA-F]{6}$/, 'color'),
// }) as ZodExtended

// /* --- Exports --------------------------------------------------------------------------------- */

// export { aetherSchema, z }

/* ### ATS ##################################################################################### */
/* ### ATS ##################################################################################### */
/* ### ATS ##################################################################################### */

/* --- Types ----------------------------------------------------------------------------------- */

export type AetherSchemaType<T = any, S = any> = ss.Struct<T, S>
export type Infer<T extends AetherSchemaType> = T['TYPE'] // Same as superstruct's Infer type
export type Describe<T> = ss.Struct<T, StructSchema<T>> // Same as superstruct's Describe type

export type { Simplify, Optionalize, ObjectSchema, ObjectType, StructSchema }

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
  AetherCollection: (name: string, schema: SchemaEntry<ReturnType<typeof AetherCollection>>) => unknown // prettier-ignore
}

/* --- Helpers --------------------------------------------------------------------------------- */

const assignDescriptors = <R extends AetherSchemaType>(
  schema: R,
  aetherType: string,
  schemaName?: string
) => {
  return Object.assign(schema, {
    // Chain command for docs, indicating example value & description to schema property (e.g. for Storybook)
    docs: (example, description?: string) => Object.assign(schema, { example, description }),
    // Chain command for indicating default value + add example & description for docs
    default: (defaultValue, description?: string, example?: any) => {
      return Object.assign(schema, {
        defaultValue,
        example: example || defaultValue,
        ...(description ? { description } : null),
      })
    },
    // Assign type to schema object for later interpretation
    aetherType,
    // Assign schemaName (if known) to object for later interpretation
    ...(schemaName ? { schemaName } : null),
  })
}

const makeOptionalable = <T, S, ST extends ss.Struct<T, S>>(
  schema: ST,
  aetherType: string,
  schemaName?: string
) => {
  return Object.assign(schema, {
    // Chain command to indicate the field can be nullable (e.g. in GraphQL)
    nullable: () => {
      const nullableSchema = Object.assign(ss.nullable(schema), { isNullable: true })
      return assignDescriptors(nullableSchema, aetherType, schemaName)
    },
    // Chain command to indicate the field can be nullish (= null or undefined)
    nullish: () => {
      const nullableSchema = Object.assign(ss.nullable(schema), { isNullable: true })
      const nullishSchema = Object.assign(ss.optional(nullableSchema), {
        isNullable: true,
        isOptional: true,
      })
      return assignDescriptors(nullishSchema, aetherType, schemaName)
    },
    // Chain command to indicate the field can be omitted / undefined (e.g. in Docs)
    optional: () => {
      const optionalSchema = Object.assign(ss.optional(schema), { isOptional: true })
      return assignDescriptors(optionalSchema, aetherType, schemaName)
    },
  })
}

const makeExtendable = <S extends ObjectSchema>(schema: ss.Struct<ObjectType<S>, S>) => {
  return Object.assign(schema, {
    // Extend the schema with additional properties
    extend: <SE extends ObjectSchema>(newSchemaName: string, extraPropsSchema: SE) => {
      const newSchema = extendSchema(newSchemaName, schema, extraPropsSchema)
      return makeExtendable(newSchema)
    },
    // Extend the schema by omitting properties
    omit: <K extends keyof S>(newSchemaName: string, keys: K[]) => {
      const newSchema = omitSchemaProps(newSchemaName, schema, keys)
      return makeExtendable(newSchema)
    },
    // Make the entire schema partial
    partial: (newSchemaName: string) => {
      return makePartialSchema(newSchemaName, schema)
    },
    // Create new schema with specific properties from the original
    pick: <K extends keyof S>(newSchemaName: string, keys: K[]) => {
      const newSchema = pickSchemaProps(newSchemaName, schema, keys)
      return makeExtendable(newSchema)
    },
  })
}

const aetherWrapper = <A extends any[], T, S>(
  struct: (...args: A) => ss.Struct<T, S>,
  aetherType: string
) => {
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
  const optschema = makeOptionalable<ObjectType<S>, typeof schema['schema'], typeof schema>(schema, 'AetherSchema', schemaName) // prettier-ignore
  return makeExtendable(optschema)
}

const AetherArray = <T extends ss.Struct<any>>(Element: T) => {
  const arraySchema = assignDescriptors(ss.array<T>(Element), 'AetherArray')
  return makeOptionalable<ss.Infer<T>[], typeof arraySchema['schema'], typeof arraySchema>(arraySchema, 'AetherArray') // prettier-ignore
}

const AetherCollection = <S extends ObjectSchema>(schemaName: string, objSchema: S) => {
  const entrySchema = AetherSchema(schemaName, objSchema)
  return AetherArray(entrySchema)
}

/* --- Utilities ------------------------------------------------------------------------------- */

const extendSchema = <A extends ObjectSchema, B extends ObjectSchema>(
  schemaName: string,
  originalSchema: ss.Struct<ObjectType<A>, A>,
  newProperties: B
) => {
  // Create new schema by extending original schema with new properties using superstruct's assign() method
  const schema = assignDescriptors(ss.assign(originalSchema, ss.object(newProperties)), 'AetherSchema', schemaName) // prettier-ignore
  return makeOptionalable<typeof schema['TYPE'], typeof schema['schema'], typeof schema>(schema, 'AetherSchema', schemaName) // prettier-ignore
}

const omitSchemaProps = <S extends ObjectSchema, K extends keyof S>(
  schemaName: string,
  originalSchema: ss.Struct<ObjectType<S>, S>,
  keys: K[]
) => {
  const schema = assignDescriptors(ss.omit(originalSchema, keys), 'AetherSchema', schemaName)
  return makeOptionalable<typeof schema['TYPE'], typeof schema['schema'], typeof schema>(schema, 'AetherSchema', schemaName) // prettier-ignore
}

const makePartialSchema = <S extends ObjectSchema>(
  schemaName: string,
  originalSchema: ss.Struct<ObjectType<S>, S>
) => {
  const schema = assignDescriptors(ss.partial(originalSchema), 'AetherSchema', schemaName)
  for (const key in schema.schema) {
    const { aetherType, isNullable } = originalSchema.schema[key] as AetherSchemaType['schema'][string] // prettier-ignore
    schema.schema[key] = Object.assign(schema.schema[key], { aetherType, isNullable, isOptional: true }) // prettier-ignore
  }
  return makeOptionalable<typeof schema['TYPE'], typeof schema['schema'], typeof schema>(schema, 'AetherSchema', schemaName) // prettier-ignore
}

const pickSchemaProps = <S extends ObjectSchema, K extends keyof S>(
  schemaName: string,
  originalSchema: ss.Struct<ObjectType<S>, S>,
  keys: K[]
) => {
  const schema = assignDescriptors(ss.pick(originalSchema, keys), 'AetherSchema', schemaName)
  for (const key in schema.schema) {
    const { aetherType, isOptional, isNullable } = originalSchema.schema[key] as AetherSchemaType['schema'][string] // prettier-ignore
    schema.schema[key] = Object.assign(schema.schema[key], { aetherType, isOptional, isNullable }) // prettier-ignore
  }
  return makeOptionalable<typeof schema['TYPE'], typeof schema['schema'], typeof schema>(schema, 'AetherSchema', schemaName) // prettier-ignore
}

/* --- Helpers --------------------------------------------------------------------------------- */

export const applySchema = <S extends AetherSchemaType>(
  obj: Record<string, unknown> | Infer<S>,
  schema: S,
  applyExamples = false
): Infer<S> => {
  // Loop over schemaConfig
  const objWithDefaults = Object.entries(schema.schema).reduce((acc, entries) => {
    // Extract schema entries
    const [name, fieldConfig] = entries as [string, { defaultValue?: any; example?: any, type: string }] // prettier-ignore
    // Detect if we should nest
    const isObjectSchema = ['object', 'schema'].includes(fieldConfig.type)
    // Always apply the same for nested objects
    if (isObjectSchema) {
      return {
        ...acc,
        [name]: applySchema(obj?.[name] || {}, fieldConfig as AetherSchemaType, applyExamples),
      }
    }
    // Keep existing value if present
    if (obj?.[name]) return obj[name]
    // Apply example value instead? (docs)
    if (applyExamples) return { ...acc, [name]: fieldConfig.example || fieldConfig.defaultValue } // prettier-ignore
    // Apply default value
    return { ...acc, [name]: fieldConfig.defaultValue }
  }, {})
  // Build final object
  return { ...obj, ...objWithDefaults }
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
  // -- Utilities --
  extend: extendSchema,
  assign: extendSchema,
  omit: omitSchemaProps,
  pick: pickSchemaProps,
  partial: makePartialSchema,
}

export const ats = {
  ...AetherSchemaTypes,
  is: ss.is,
  validate: ss.validate,
  assert: ss.assert,
  applySchema,
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

// ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓           (e.g. by testing with "yarn turbo run aetherspace#schema-test")

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
