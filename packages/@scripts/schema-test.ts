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
// const col = ats.collection({ id });
const coll = ss.array(ss.object({ bln }));

const superSchema = ats.schema('MySchema', {
    id,
    ids,
    str,
    day,
    num,
    bln,
    opt,
    obj,
    // col,
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
