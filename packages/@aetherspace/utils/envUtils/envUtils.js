"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEnvVar = exports.setPublicEnvVars = void 0;
var expo_constants_1 = __importDefault(require("expo-constants"));
/* --- setGlobal() ----------------------------------------------------------------------------- */
// -i- Set a global variable on the "globalThis" object
var setGlobal = function (key, val) {
    globalThis[key] = val;
};
/* --- getGlobal() ----------------------------------------------------------------------------- */
// -i- Get a global variable on the "globalThis" object
var getGlobal = function (key) { return globalThis[key]; };
/* --- setGlobalEnvVars() ---------------------------------------------------------------------- */
// -i- Set a series of global env vars to enable retrieving them via getEnvVar() later
// -i- You may want to do this in any _app.tsx / _app.js files due to @expo/next-adapter clearing process.env
var __PUBLIC_ENV = '__PUBLIC_ENV';
var setPublicEnvVars = function (publicEnvVars) {
    setGlobal(__PUBLIC_ENV, __assign(__assign({}, getGlobal(__PUBLIC_ENV)), publicEnvVars));
};
exports.setPublicEnvVars = setPublicEnvVars;
/* --- getEnvVar() ----------------------------------------------------------------------------- */
// -i- Get expo / public env var
var getEnvVar = function (key) {
    var possibleKeys = [key, "NEXT_PUBLIC_" + key, "EXPO_PUBLIC_" + key, "EXPO_" + key, "REACT_NATIVE_" + key]; // @ts-ignore
    var checkEnv = function (k) { var _a, _b, _c; return process.env[k] || ((_b = (_a = expo_constants_1.default.manifest) === null || _a === void 0 ? void 0 : _a.extra) === null || _b === void 0 ? void 0 : _b[k]) || ((_c = getGlobal(__PUBLIC_ENV)) === null || _c === void 0 ? void 0 : _c[k]); };
    return possibleKeys.map(checkEnv).find(function (envVar) { return typeof envVar !== 'undefined'; });
};
exports.getEnvVar = getEnvVar;
