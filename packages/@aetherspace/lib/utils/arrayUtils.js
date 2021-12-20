"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.arrFromSet = exports.addSetItem = void 0;
/* --- addSetItem() ------------------------------------------------------------------------------ */
// -i- Adds an item to array if it doens't exist already
var addSetItem = function (arr, item) {
    if (!arr.map(function (itm) { return JSON.stringify(itm); }).includes(JSON.stringify(item)))
        arr.push(item);
    return arr;
};
exports.addSetItem = addSetItem;
/* --- arrFromSet() ------------------------------------------------------------------------------ */
// -i- Deduplicates items in an array
var arrFromSet = function (arr) { return Array.from(new Set(arr)); };
exports.arrFromSet = arrFromSet;
