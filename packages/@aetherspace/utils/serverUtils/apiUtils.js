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
exports.firePostAndForget = exports.fireGetAndForget = exports.runMiddleWare = exports.getApiParams = exports.getApiParam = void 0;
var axios_1 = __importDefault(require("axios"));
// Utils
var jsonUtils_1 = require("../jsonUtils");
/* --- getApiParam() --------------------------------------------------------------------------- */
// -i- Gets a specific property by key from supplied api sources
var getApiParam = function (key, apiSources) {
    var _a, _b;
    var cookies = apiSources.cookies, query = apiSources.query, params = apiSources.params, body = apiSources.body, args = apiSources.args, context = apiSources.context;
    var result = [params, query, body, args, context, cookies].map(function (src) { return src === null || src === void 0 ? void 0 : src[key]; }).filter(Boolean)[0];
    if (!result && ((_a = cookies === null || cookies === void 0 ? void 0 : cookies.get) === null || _a === void 0 ? void 0 : _a.call(cookies, key)))
        return jsonUtils_1.parseIfJSON((_b = cookies === null || cookies === void 0 ? void 0 : cookies.get) === null || _b === void 0 ? void 0 : _b.call(cookies, key));
    return result;
};
exports.getApiParam = getApiParam;
/* --- getApiParams() -------------------------------------------------------------------------- */
// -i- Get multiple api params from supplied api sources
var getApiParams = function (keys, apiSources) {
    var paramKeys = typeof keys === 'string' ? keys.split(' ') : keys;
    return paramKeys.reduce(function (apiParams, paramKey) {
        var _a;
        return __assign(__assign({}, apiParams), (_a = {}, _a[paramKey] = exports.getApiParam(paramKey, apiSources), _a));
    }, {});
};
exports.getApiParams = getApiParams;
/* --- runMiddleWare() ------------------------------------------------------------------------- */
// -i- https://nextjs.org/docs/api-routes/api-middlewares
// -i- Helper method to wait for a middleware to execute before continuing
// -i- And to throw an error when an error happens in a middleware
var runMiddleWare = function (req, res, fn) {
    return new Promise(function (resolve, reject) {
        fn(req, res, function (result) {
            if (result instanceof Error)
                return reject(result);
            return resolve(result);
        });
    });
};
exports.runMiddleWare = runMiddleWare;
/* --- fireGetAndForget() ----------------------------------------------------------------------- */
// -i- https://stackoverflow.com/a/63594903/8789673
var fireGetAndForget = function (url, config) {
    try {
        // Fire request
        axios_1.default.get(url, config).catch(Boolean);
        // Resolve without waiting for response
        return true;
    }
    catch (err) {
        // Do nothing to avoid unhandled promise rejections
    }
};
exports.fireGetAndForget = fireGetAndForget;
/* --- firePostAndForget() --------------------------------------------------------------------- */
// -i- https://stackoverflow.com/a/63594903/8789673
var firePostAndForget = function (url, data, config) {
    try {
        // Fire request
        axios_1.default.post(url, data, config).catch(Boolean);
        // Resolver without waiting for response
        return true;
    }
    catch (err) {
        // Do nothing to avoid unhandled promise rejections
    }
};
exports.firePostAndForget = firePostAndForget;
