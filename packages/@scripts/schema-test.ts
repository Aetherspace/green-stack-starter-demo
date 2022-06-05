// import * as ss from 'superstruct'
import { ats } from 'aetherspace/schemas'

enum TEST_ENUM {
    A = 'A',
    B = 'B',
}

const id = ats.id().default('a')
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

// @ts-ignore
type typeTest = typeof superSchema['TYPE']

console.log(JSON.stringify(superSchema, null, 4))

// ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓

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
