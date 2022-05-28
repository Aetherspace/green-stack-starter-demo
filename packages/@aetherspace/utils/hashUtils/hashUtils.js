"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uuid = exports.createKey = exports.hashCode = void 0;
/* --- hashCode() ------------------------------------------------------------------------------ */
// -i- Turns any string into a short unique identifier / number
var hashCode = function (str) { return Array.from(str).reduce(function (s, c) { return Math.imul(31, s) + c.charCodeAt(0); }, 0); };
exports.hashCode = hashCode;
/* --- createKey() ----------------------------------------------------------------------------- */
// -i- Creates a react key by strigifying an object
// -i- Used for invalidating keys (creating new component instance) when needing to synch state & props
var createKey = function (obj, hash) {
    if (hash === void 0) { hash = true; }
    var keyString = JSON.stringify(obj).replace(/([\s.*+?^=!:$,<>{}()|[\]/\\"])/g, '');
    return hash ? exports.hashCode(keyString) : keyString;
};
exports.createKey = createKey;
/* --- uuid() ---------------------------------------------------------------------------------- */
// -i- Create a unique id
var uuid = function () {
    var d = new Date().getTime();
    // @ts-ignore
    if (typeof window !== 'undefined' && window.performance && window.performance.now)
        d += performance.now();
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0; // eslint-disable-line no-bitwise
        d = Math.floor(d / 16);
        return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16); // eslint-disable-line no-bitwise
    });
};
exports.uuid = uuid;
