"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isEmpty = void 0;
var isEmpty = function (val, failOnEmptyStrings) {
    if (failOnEmptyStrings === void 0) { failOnEmptyStrings = true; }
    if (val == null)
        return true; // treat null & undefined as "empty"
    if (typeof val === 'string' && !val.length && failOnEmptyStrings)
        return true;
    if (typeof val === 'object' && !Object.values(val).length)
        return true; // objects & arrays
    return false; // not empty
};
exports.isEmpty = isEmpty;
