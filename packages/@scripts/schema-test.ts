import * as ss from 'superstruct';
import { ats } from 'aetherspace/lib/schemas';

enum TEST_ENUM {
    A = 'A',
    B = 'B',
}

const id = ats.string().default('a');
const ids = ats.array(ats.string());
const str = ats.string().nullable().docs('example', 'description');
const day = ats.date().optional().docs('01/01/2022', 'The start of the year');
const num = ats.number().docs(5);
const bln = ats.boolean().optional();
const opt = ats.enum<TEST_ENUM>(Object.values(TEST_ENUM));
const obj = ats.object({ str });
const col = ats.array(ats.object({ id }));
const coll = ats.collection({ id });

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
});

type typeTest = typeof superSchema['TYPE'];

const propTest = superSchema.schema.bln;

const test = {};
if (ss.is(test, superSchema)) console.log(JSON.stringify(superSchema, null, 4));
else console.log(JSON.stringify(superSchema, null, 4));

// {
//     "type": "object",
//     "schema": {
//         "id": {
//             "type": "string",
//             "schema": null,
//             "default": "a",
//             "aetherType": "AetherString"
//         },
//         "ids": {
//             "type": "array",
//             "schema": {
//                 "type": "string",
//                 "schema": null,
//                 "aetherType": "AetherString"
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
//             "aetherType": "aetherSchema"
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
//                         "aetherType": "AetherString"
//                     }
//                 },
//                 "aetherType": "aetherSchema"
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
//                         "aetherType": "AetherString"
//                     }
//                 },
//                 "aetherType": "aetherSchema"
//             },
//             "aetherType": "AetherArray"
//         }
//     },
//     "aetherType": "aetherSchema",
//     "schemaName": "MySchema"
// }
