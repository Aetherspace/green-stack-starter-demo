// import * as ss from 'superstruct'
import { ats } from '../schemas'

enum TEST_ENUM {
    A = 'A',
    B = 'B',
}

const id = ats.id().default('some-id')
const ids = ats.array(ats.id())
const str = ats.string().nullable().docs('example', 'description')
const day = ats.date().optional().docs('01/01/2022', 'The start of the year')
const num = ats.number().docs(5)
const bln = ats.boolean().optional()
const opt = ats.enum<TEST_ENUM>(Object.values(TEST_ENUM))
const obj = ats.object('StringObject', { str })
const col = ats.array(ats.object('IDObject', { id }))
const coll = ats.collection('IDObject', { id })

const superSchema = ats.schema('MySchema', {
    id,
    ids,
    str,
    day,
    num,
    bln,
    opt,
    obj,
    col,
    coll,
})

// -- Test Utilities --

const minimalSchema = ats.omit('Minimal', superSchema, ['obj', 'col', 'coll'])

const extendedSchema = ats.extend('Extended', minimalSchema, {
    extra: ats.string().nullish(),
})

const finalSchema = extendedSchema

// -- Test Results --

// Hover over this type to preview the schema
type typeTest = typeof finalSchema['TYPE']

console.log(JSON.stringify(finalSchema, null, 4))
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
