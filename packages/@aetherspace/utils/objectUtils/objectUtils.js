"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizeObjectProps = exports.getFromSources = exports.getProp = exports.setProp = exports.objectifier = void 0;
// Utils
var numberUtils_1 = require("../numberUtils");
/* --- objectifier() --------------------------------------------------------------------------- */
// -i- Utility method to get and set nested objects that may or may not exist
// -i- (Drop in replacement for optional chaining until we add support for it)
var objectifier = function (contextTree, parts, create) {
    if (create === void 0) { create = false; }
    var branch = contextTree;
    var current;
    var index = 0;
    // Go as deep into obj as the number of parts
    while (index < parts.length) {
        current = parts[index];
        try {
            // Skip null & undefined + check if the next branch actually exists
            var propExists = typeof (branch === null || branch === void 0 ? void 0 : branch[current]) !== 'undefined';
            branch = branch && propExists ? branch[current] : branch && create ? (branch[current] = {}) : undefined;
        }
        catch (err) {
            branch = undefined;
        }
        index++;
    }
    // Return result
    return branch;
};
exports.objectifier = objectifier;
/* --- setProp() ------------------------------------------------------------------------------ */
// -i- Set potentially nested property by keys like 'a.b.c'
// -!- Mutates the object directly, but also returns it again
var setProp = function (obj, key, val) {
    var parts = key.split('.');
    var last = parts.pop();
    var result = exports.objectifier(obj, parts, true);
    if (result && last)
        result[last] = val;
    return obj;
};
exports.setProp = setProp;
/* --- getProp() ------------------------------------------------------------------------------ */
// -i- Retrieve potentially nested property by keys like 'prop.subProp.valueYouWant'
// -i- (Drop in replacement for optional chaining until we add support for it)
var getProp = function (obj, key) {
    if (!key)
        return undefined;
    var parts = key.split('.');
    var last = parts.pop();
    var result = !!obj && exports.objectifier(obj, parts, false);
    return result && last ? result[last] : undefined;
};
exports.getProp = getProp;
/* --- getFromSources() ------------------------------------------------------------------------ */
// -i- Get a property from a preferred source of options (= objects)
var getFromSources = function (key, sources) {
    var result = sources.map(function (srcObj) { return srcObj === null || srcObj === void 0 ? void 0 : srcObj[key]; }).filter(Boolean)[0];
    return result;
};
exports.getFromSources = getFromSources;
/* --- normalizeObjectProps() ------------------------------------------------------------------ */
// -i- Parses object properties like "1" to 1, and "true" to true
var normalizeObjectProps = function (objToValidate, ignoredKeys) {
    if (objToValidate === void 0) { objToValidate = {}; }
    if (ignoredKeys === void 0) { ignoredKeys = []; }
    var obj = {};
    Object.keys(objToValidate).forEach(function (pKey) {
        var val = objToValidate[pKey];
        // Normalize 'true' / 'false' to their boolean values
        if (['true', 'false'].includes(val))
            val = JSON.parse(val);
        // Normalize stringified numbers to actual number
        else
            val = Array.isArray(val) || !numberUtils_1.isValidNumber(val) ? val : +val;
        // In case of nested objects, use recursion
        if (typeof val === 'object' && val !== null && !Array.isArray(val)) {
            val = exports.normalizeObjectProps(val, ignoredKeys);
        }
        // Add value under same key to obj
        obj[pKey] = ignoredKeys.includes(pKey) ? objToValidate[pKey] : val;
    });
    return obj;
};
exports.normalizeObjectProps = normalizeObjectProps;
