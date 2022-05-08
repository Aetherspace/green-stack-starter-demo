"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseIfJSON = exports.validateJSON = void 0;
/* --- validateJSON() ------------------------------------------------------------------------------ */
// -i- Checks whether a json string is valid
var validateJSON = function (maybeJSON) {
    try {
        JSON.parse(maybeJSON);
        return true;
    }
    catch (e) {
        return false;
    }
};
exports.validateJSON = validateJSON;
/* --- parseIfJSON() ---------------------------------------------------------------------- */
// Attempt to parse a string if it's valid JSON
var parseIfJSON = function (maybeJSON) {
    return exports.validateJSON(maybeJSON) ? JSON.parse(maybeJSON) : maybeJSON;
};
exports.parseIfJSON = parseIfJSON;
