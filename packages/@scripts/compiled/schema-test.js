"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import * as ss from 'superstruct'
var schemas_1 = require("aetherspace/schemas");
var TEST_ENUM;
(function (TEST_ENUM) {
    TEST_ENUM["A"] = "A";
    TEST_ENUM["B"] = "B";
})(TEST_ENUM || (TEST_ENUM = {}));
var id = schemas_1.ats.id().default('a');
var ids = schemas_1.ats.array(schemas_1.ats.id());
var str = schemas_1.ats.string().nullable().docs('example', 'description');
var day = schemas_1.ats.date().optional().docs('01/01/2022', 'The start of the year');
var num = schemas_1.ats.number().docs(5);
var bln = schemas_1.ats.boolean().optional();
var opt = schemas_1.ats.enum(Object.values(TEST_ENUM));
var obj = schemas_1.ats.object('StringObject', { str: str });
var col = schemas_1.ats.array(schemas_1.ats.object('IDObject', { id: id }));
var coll = schemas_1.ats.collection('IDObject', { id: id });
var superSchema = schemas_1.ats.schema('MySchema', {
    id: id,
    ids: ids,
    str: str,
    day: day,
    num: num,
    bln: bln,
    opt: opt,
    obj: obj,
    col: col,
    coll: coll,
});
console.log(JSON.stringify(superSchema, null, 4));
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
