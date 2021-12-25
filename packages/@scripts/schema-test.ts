import * as s from 'superstruct';
import { ats } from 'aetherspace/lib/schemas';

enum TEST_ENUM {
    A = 'A',
    B = 'B',
}

const id = ats.string().default('a');
const ids = ats.array(ats.string());
const str = ats.string().nullable().docs('example', 'description');
const num = ats.number().nullable();
const bln = ats.boolean().optional();
const opt = ats.enum<TEST_ENUM>(Object.values(TEST_ENUM));
const obj = ats.object({ str });
const col = ats.collection({ id });
const coll = s.array(s.object({ bln }));

const superSchema = ats.schema({
    id,
    ids,
    str,
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
if (s.is(test, superSchema)) console.log(JSON.stringify(superSchema, null, 4));
else console.log(JSON.stringify(superSchema, null, 4));

// {
//     "type": "object",
//     "schema": {
//         "id": {
//             "type": "string",
//             "schema": null,
//             "default": "a"
//         },
//         "ids": {
//             "type": "array",
//             "schema": {
//                 "type": "string",
//                 "schema": null
//             }
//         },
//         "str": {
//             "type": "string",
//             "schema": null,
//             "nullable": true,
//             "example": "example",
//             "description": "description"
//         },
//         "num": {
//             "type": "number",
//             "schema": null,
//             "nullable": true
//         },
//         "bln": {
//             "type": "boolean",
//             "schema": null,
//             "optional": true
//         },
//         "opt": {
//             "type": "enums",
//             "schema": {
//                 "A": "A",
//                 "B": "B"
//             }
//         },
//         "obj": {
//             "type": "object",
//             "schema": {
//                 "str": {
//                     "type": "string",
//                     "schema": null,
//                     "nullable": true,
//                     "example": "example",
//                     "description": "description"
//                 }
//             }
//         },
//         "col": {
//             "type": "array",
//             "schema": {
//                 "type": "object",
//                 "schema": {
//                     "id": {
//                         "type": "string",
//                         "schema": null,
//                         "default": "a"
//                     }
//                 }
//             }
//         },
//         "coll": {
//             "type": "array",
//             "schema": {
//                 "type": "object",
//                 "schema": {
//                     "bln": {
//                         "type": "boolean",
//                         "schema": null,
//                         "optional": true
//                     }
//                 }
//             }
//         }
//     }
// }
