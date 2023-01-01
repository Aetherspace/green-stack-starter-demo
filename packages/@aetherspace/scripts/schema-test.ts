import { ats, AetherSchemaType } from '../schemas'
import { aetherSchema, makeSchemaDeepPartial, makeSchemaPartial, makeSchemaRequired } from '../schemas/zodSchemas'
import { z } from 'zod'

enum TEST_ENUM {
    A = 'A',
    B = 'B',
}

const id = ats.id().optional().default('some-id')
const ids = ats.array(ats.id())
const str = ats.string().nullable().docs('example', 'description')
const day = ats.date().optional().docs('01/01/2022', 'The start of the year')
const num = ats.number().docs(5)
const bln = ats.boolean().optional()
const opt = ats.enum<TEST_ENUM>(Object.values(TEST_ENUM))
const obj = ats.object('StringObject', { str })
const col = ats.array(ats.object('IDObject', { id }))
const coll = ats.collection('IDObject', { id })

// -- Build Original Schema --

const originalSchema = ats.schema('MySchema', {
    id,
    ids,
    str,
    day,
    num,
    bln,
    opt,
    obj,
    col,
    // coll,
})
type OriginalSchemaType = typeof originalSchema['TYPE'] // Hover to preview

// -- Test Utilities --

const omittedSchema = ats.omit('Minimal', originalSchema, ['obj', 'col'])
type OmittedSchemaType = typeof omittedSchema['TYPE']

const extendedSchema = ats.extend('Extended', omittedSchema, {
    extra: ats.string().nullish(),
})
type ExtendedSchemaType = typeof extendedSchema['TYPE'] // Hover to preview

const partialSchema = ats.partial('Partial', extendedSchema)
type PartialSchemaType = typeof partialSchema['TYPE'] // Hover to preview

const pickedSchema = ats.pick('Picked', partialSchema, ['id', 'str', 'day'])
type PickedSchemaType = typeof pickedSchema['TYPE'] // Hover to preview

// -- Test Results --

const finalSchema = originalSchema // pickedSchema // partialSchema // extendedSchema // omittedSchema // originalSchema
type FinalSchemaType = typeof finalSchema['TYPE'] // Hover to preview

console.log('--- ATS ---\n', JSON.stringify(finalSchema, null, 4))
// ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓

// {
//     "type": "object",
//     "schema": {
//         "id": {
//             "type": "string",
//             "schema": null,
//             "aetherType": "AetherID",
//             "defaultValue": "some-id",
//             "example": "some-id"
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
//             "isNullable": true,
//             "aetherType": "AetherString",
//             "example": "example",
//             "description": "description"
//         },
//         "day": {
//             "type": "date",
//             "schema": null,
//             "isOptional": true,
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
//             "isOptional": true,
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
//         "extra": {
//             "type": "string",
//             "schema": null,
//             "isNullable": true,
//             "isOptional": true,
//             "aetherType": "AetherString"
//         }
//     },
//     "aetherType": "AetherSchema",
//     "schemaName": "Extended"
// }

/* --- parseType() ----------------------------------------------------------------------------- */

// const schemaTypeMap = Object.freeze({
//     boolean: 'AetherBoolean',
//     number: 'AetherNumber',
//     string: 'AetherString',
//     date: 'AetherDate',
//     object: 'AetherSchema',
//     array: 'AetherArray',
// })

// const parseType = (propDef: Record<string, any>, propSchema: Record<string, unknown> = {}) => {
//     // @ts-ignore
//     const { type: propType, enum: propEnum, anyOf } = propDef
//     if (Array.isArray(propType)) {
//         propSchema.isNullable = propType.includes('null')
//         const leftoverType = propType.filter((type: string) => type !== 'null')[0]
//         propSchema.aetherType = schemaTypeMap[leftoverType]
//         propSchema.type = leftoverType
//     } else if (propDef.format === 'date-time') {
//         propSchema.aetherType = 'AetherDate'
//         propSchema.type = 'date'
//     } else if (propEnum) {
//         propSchema.aetherType = 'AetherEnum'
//         propSchema.type = 'enums'
//         propSchema.schema = propEnum.reduce((acc, enumVal) => ({ ...acc, [enumVal]: enumVal }), {})
//     } else {
//         propSchema.aetherType = schemaTypeMap[propType]
//         propSchema.type = propType
//     }
//     // Return
//     return propSchema
// }

// /* --- parseProp() ----------------------------------------------------------------------------- */

// const parseProp = (propKey: string, propDef: Record<string, any>, parseContext: { required: string[] }) => {
//     // @ts-ignore
//     const { type: propType, enum: propEnum, default: propDefault, description } = propDef
//     const required = parseContext?.required
//     let propSchema = {} as Record<string, unknown>
//     // Determine if optional
//     propSchema.isOptional = required ? (!required.includes(propKey)) : true
//     // Determine types
//     propSchema = parseType(propDef, propSchema)
//     // Handle descriptions
//     if (description && propSchema.type !== 'object') propSchema.description = description
//     // Handle defaults
//     if (propDefault) propSchema.defaultValue = propDefault
//     // Handle objects
//     if (propType === 'object') {
//         propSchema = { ...propSchema, ...parseSchema(propDef as ReturnType<typeof zodToJsonSchema>) }
//     }
//     // Handle arrays
//     if (propSchema.aetherType === 'AetherArray') {
//         propSchema.schema = parseProp(propKey, propDef.items as Record<string, unknown>, parseContext)
//     }
//     // Return parsed schema
//     return propSchema
// }

// /* --- parseSchema() --------------------------------------------------------------------------- */

// const parseSchema = (schema: ReturnType<typeof zodToJsonSchema>) => {
//     // @ts-ignore
//     const { type, description, properties, required } = schema
//     // Do nothing when not an object
//     if (type !== 'object') return {}
//     // Build aether schema
//     const resultSchema = {} as Record<string, any>
//     resultSchema.aetherType = 'AetherSchema'
//     resultSchema.type = type
//     resultSchema.schemaName = description
//     // console.log({ description })
//     // Parse properties
//     resultSchema.schema = Object.entries(properties).reduce((atSchema, [propKey, propDef]) => {
//         const propSchema = parseProp(propKey, propDef as Record<string, unknown>, { required })
//         // Abort if unknown
//         if (!propSchema.aetherType) {
//             console.warn(`Unknown prop type: ${propKey} (${propSchema.type})`, propSchema)
//             return atSchema
//         }
//         // Return prop definition
//         return { ...atSchema, [propKey]: propSchema }
//     }, {})
//     // Return parsed schema
//     return resultSchema
// }

// /* --- Zod ------------------------------------------------------------------------------------- */

// const aetherSchema = <K extends string, Z extends z.ZodRawShape>(key: K, zodSchemaDef: Z) => {
//     const zodSchema = z.object(zodSchemaDef)
//     const assignMethods = <AK extends string, ZO extends z.ZodObject<z.ZodRawShape>>(key: AK, schemaObj: ZO) => {
//         return Object.assign(schemaObj, {
//             key,
//             name: key,
//             describe: null as never,
//             extendSchema: <EK extends string, EZ extends z.ZodRawShape>(key: EK, zodExtDef: EZ) => {
//                 return aetherSchema(key, { ...zodExtDef, ...zodSchemaDef })
//             },
//             pickSchema: <PK extends string, PZ extends Parameters<typeof zodSchema.pick>[0]>(key: PK, picks: PZ) => {
//                 const pickedSchema = zodSchema.pick(picks).describe(key)
//                 return assignMethods(key, pickedSchema)
//             },
//             omitSchema: <OK extends string, OZ extends Parameters<typeof zodSchema.omit>[0]>(key: OK, omits: OZ) => {
//                 const omittedSchema = zodSchema.omit(omits).describe(key)
//                 return assignMethods(key, omittedSchema)
//             },
//             requiredSchema: <RK extends string>(key: RK) => {
//                 const requiredSchema = zodSchema.required().describe(key)
//                 return assignMethods(key, requiredSchema)
//             },
//             partialSchema: <PK extends string>(key: PK) => {
//                 const partialSchema = zodSchema.partial().describe(key)
//                 return assignMethods(key, partialSchema)
//             },
//             deepPartialSchema: <PK extends string>(key: PK) => {
//                 const partialSchema = zodSchema.deepPartial().describe(key)
//                 return assignMethods(key, partialSchema)
//             },
//             introspect: () => {
//                 return {
//                     result: parseSchema(zodToJsonSchema(schemaObj)),
//                     jsonSchema: zodToJsonSchema(schemaObj),
//                 }
//             },
//         })
//     }
//     return assignMethods(key, zodSchema.describe(key))
// }

const Primitives = aetherSchema('Primitives', {
    bln: z.boolean().optional().describe('A boolean'),
    str: z.string().optional().nullable().default('default').describe('A string'),
    num: z.number().optional().nullable().default(0).describe('A number'),
})

const Advanced = Primitives.extendSchema('Advanced', {
    enum: z.enum(['A', 'B']).nullish().describe('An enum'),
    ids: z.array(z.string()).optional().nullable().describe('An array of IDs'),
    tuple: z.tuple([z.string(), z.number()]),
})

const Todo = aetherSchema('Todo', {
    id: z.string().default('some-todo-id').describe('The ID of the Todo'),
    status: z.enum(['active', 'completed']).default('active').describe('The status of the Todo'),
})

const ExtendedTodos = Advanced.extendSchema('ExtendedTodos', {
    mainTodo: Todo,
    todos: z.array(Todo).describe('An array of Todos'),
    amount: z.number().min(0).max(10).int().describe('Amount of todos'),
})

const PartialTodos = makeSchemaPartial(ExtendedTodos, 'PartialTodos')
const DeepPartialTodos = makeSchemaDeepPartial(ExtendedTodos, 'DeepPartialTodos')
const RequiredTodos = makeSchemaRequired(ExtendedTodos, 'RequiredTodos')

const PickedTodos = ExtendedTodos.pickSchema('PickedTodos', { mainTodo: true, amount: true, todos: true })
const OmittedTodos = ExtendedTodos.omitSchema('OmittedTodos', { mainTodo: true, amount: true, todos: true })

type PrimitivesTypes = z.infer<typeof Primitives>
type AdvancedTypes = z.infer<typeof Advanced>
type TodoTypes = z.infer<typeof Todo>
type ExtendedTodosTypes = z.infer<typeof ExtendedTodos>
type PartialTodosTypes = z.infer<typeof PartialTodos>
type DeepPartialTodosTypes = z.infer<typeof DeepPartialTodos>
type RequiredTodosTypes = z.infer<typeof RequiredTodos>
type PickedTodosTypes = z.infer<typeof PickedTodos>
type OmittedTodosTypes = z.infer<typeof OmittedTodos>

const ComparedSchema = aetherSchema('ComparedSchema', {
    id: z.string().default('some-id').describe('An ID'),
    ids: z.array(z.string()).describe('A list of IDs'),
    str: z.string().nullable().describe('A string'),
    day: z.date().optional().describe('A date'),
    num: z.number().describe('A number'),
    bln: z.boolean().optional().describe('A boolean'),
    opt: z.enum(['A', 'B']).describe('An enum'),
    obj: aetherSchema('StringObject', {
        str: z.string().nullable().describe('A string'),
    }),
    col: z.array(aetherSchema('IDObject', {
        id: z.string().describe('An ID'),
    }))
})

type ComparedSchemaType = z.infer<typeof ComparedSchema>

const zodJSON = ComparedSchema.introspect()

console.log('--- ZOD ---\n', JSON.stringify(zodJSON, null, 4))

// ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓

// { 
//     "type": "object",
//     "properties": {
//         "id": {
//             "type": "string",
//             "default": "some-id"
//         },
//         "ids": {
//             "type": "array",
//             "items": {
//                 "type": "string"
//             },
//             "description": "A list of IDs"
//         },
//         "str": {
//             "type": [
//                 "string",
//                 "null"
//             ]
//         },
//         "day": {
//             "type": "string",
//             "format": "date-time"
//         },
//         "num": {
//             "anyOf": [
//                 {
//                     "anyOf": [
//                         {
//                             "not": {}
//                         },
//                         {
//                             "type": "number"
//                         }
//                     ]
//                 },
//                 {
//                     "type": "null"
//                 }
//             ]
//         },
//         "bln": {
//             "type": "boolean",
//             "default": false
//         },
//         "enum": {
//             "type": "string",
//             "enum": [
//                 "A",
//                 "B"
//             ]
//         },
//         "tuple": {
//             "type": "array",
//             "minItems": 2,
//             "maxItems": 2,
//             "items": [
//                 {
//                     "type": "string"
//                 },
//                 {
//                     "type": "number"
//                 }
//             ]
//         },
//         "obj": {
//             "type": "object",
//             "properties": {
//                 "str": {
//                     "type": "string"
//                 }
//             },
//             "required": [
//                 "str"
//             ],
//             "additionalProperties": false
//         }
//     },
//     "required": [
//         "ids",
//         "str",
//         "enum",
//         "tuple",
//         "obj"
//     ],
//     "additionalProperties": false,
//     "description": "A test schema",
//     "$schema": "http://json-schema.org/draft-07/schema#"
// }
