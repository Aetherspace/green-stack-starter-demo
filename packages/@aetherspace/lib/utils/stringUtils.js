"use strict";
/* --- Case Utils ------------------------------------------------------------------------------ */
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAssetKey = exports.uppercaseFirstChar = exports.camelToDash = exports.camelToSnake = exports.dashToSnake = exports.dashToCamel = exports.snakeToDash = exports.snakeToCamel = void 0;
var snakeToCamel = function (str) { return str.replace(/(_\w)/g, function (m) { return m[1].toUpperCase(); }); };
exports.snakeToCamel = snakeToCamel;
var snakeToDash = function (str) { return str.replace(/_/g, '-'); };
exports.snakeToDash = snakeToDash;
var dashToCamel = function (str) { return str.replace(/(-\w)/g, function (m) { return m[1].toUpperCase(); }); };
exports.dashToCamel = dashToCamel;
var dashToSnake = function (str) { return str.replace(/-/g, '_'); };
exports.dashToSnake = dashToSnake;
var camelToSnake = function (str) { return str.replace(/[\w]([A-Z])/g, function (m) { return m[0] + "_" + m[1]; }).toLowerCase(); };
exports.camelToSnake = camelToSnake;
var camelToDash = function (str) { return str.replace(/[\w]([A-Z])/g, function (m) { return m[0] + "-" + m[1]; }).toLowerCase(); };
exports.camelToDash = camelToDash;
/* --- uppercaseFirstChar() -------------------------------------------------------------------- */
// -i- Uppercase the first character of a string
var uppercaseFirstChar = function (str) { return str.charAt(0).toUpperCase() + str.slice(1); };
exports.uppercaseFirstChar = uppercaseFirstChar;
/* --- getAssetKey() --------------------------------------------------------------------------- */
// -i- Transform a file path like '/imgs/someImage.png' into an object key like 'ImgsSomeImagePng'
var getAssetKey = function (srcAttrPath) {
    var _a = srcAttrPath.split('.'), src = _a[0], ext = _a[1];
    var srcParts = src.split('/');
    var key = __spreadArray(__spreadArray([], srcParts), [ext]).reduce(function (acc, part) { return "" + acc + exports.uppercaseFirstChar(part); }, '');
    return exports.dashToCamel(key);
};
exports.getAssetKey = getAssetKey;
