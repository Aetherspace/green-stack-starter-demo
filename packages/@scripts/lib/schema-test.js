"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var s = __importStar(require("superstruct"));
var schemas_1 = require("aetherspace/lib/schemas");
var TEST_ENUM;
(function (TEST_ENUM) {
    TEST_ENUM["A"] = "A";
    TEST_ENUM["B"] = "B";
})(TEST_ENUM || (TEST_ENUM = {}));
var id = schemas_1.ats.string().default('a');
var ids = schemas_1.ats.array(schemas_1.ats.string());
var str = schemas_1.ats.string().nullable().docs('example', 'description');
var num = schemas_1.ats.number().nullable();
var bln = schemas_1.ats.boolean().optional();
var opt = schemas_1.ats.enum(Object.values(TEST_ENUM));
var obj = schemas_1.ats.object({ str: str });
var col = schemas_1.ats.collection({ id: id });
var coll = s.array(s.object({ bln: bln }));
var superSchema = schemas_1.ats.schema({
    id: id,
    ids: ids,
    str: str,
    num: num,
    bln: bln,
    opt: opt,
    obj: obj,
    col: col,
    coll: coll,
});
var propTest = superSchema.schema.bln;
var test = {};
if (s.is(test, superSchema))
    console.log(JSON.stringify(superSchema, null, 4));
else
    console.log(JSON.stringify(superSchema, null, 4));
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
