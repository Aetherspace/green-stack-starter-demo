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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeNextApiHandler = exports.aetherResolver = void 0;
// Utils
var apiUtils_1 = require("./apiUtils");
var index_1 = require("../index");
/* --- aetherResolver() ------------------------------------------------------------------------ */
// -i- Wrap a server side resolver function for easy use in both graphQL & rest endpoints + provide error handling
var aetherResolver = function (resolverFn, options) {
    // Extract options
    var _a = options || {}, paramKeys = _a.paramKeys, argsSchema = _a.argsSchema, responseSchema = _a.responseSchema;
    // Build Resolver
    var resolverWrapper = function (ctx) {
        var _a, _b, _c;
        var _d = ctx || {}, req = _d.req, res = _d.res, nextSsrContext = _d.nextSsrContext, parent = _d.parent, args = _d.args, context = _d.context, info = _d.info, _ = _d.cookies, resolverContext = __rest(_d, ["req", "res", "nextSsrContext", "parent", "args", "context", "info", "cookies"]);
        var logErrors = resolverContext.logErrors, respondErrors = resolverContext.respondErrors, allowFail = resolverContext.allowFail, onError = resolverContext.onError, restParams = __rest(resolverContext
        // Collect params from all possible sources
        , ["logErrors", "respondErrors", "allowFail", "onError"]);
        // Collect params from all possible sources
        var _e = req || {}, body = _e.body, method = _e.method;
        var schemaParamKeys = Object.keys((_a = argsSchema === null || argsSchema === void 0 ? void 0 : argsSchema.schema) !== null && _a !== void 0 ? _a : {});
        var apiParamKeys = [ctx === null || ctx === void 0 ? void 0 : ctx.paramKeys, paramKeys || schemaParamKeys].flat().filter(Boolean).join(' ');
        var query = __assign(__assign({}, nextSsrContext === null || nextSsrContext === void 0 ? void 0 : nextSsrContext.query), (_b = req) === null || _b === void 0 ? void 0 : _b.query);
        var params = __assign(__assign(__assign(__assign({}, restParams), nextSsrContext === null || nextSsrContext === void 0 ? void 0 : nextSsrContext.params), context), ctx === null || ctx === void 0 ? void 0 : ctx.params);
        var cookies = ((_c = nextSsrContext === null || nextSsrContext === void 0 ? void 0 : nextSsrContext.req) === null || _c === void 0 ? void 0 : _c.cookies) || (req === null || req === void 0 ? void 0 : req.cookies) || (ctx === null || ctx === void 0 ? void 0 : ctx.cookies);
        var relatedArgs = apiParamKeys ? apiUtils_1.getApiParams(apiParamKeys, { query: query, params: params, body: body, args: args, context: context }) : {};
        var normalizedArgs = index_1.normalizeObjectProps(relatedArgs);
        // Build config
        var errorConfig = { logErrors: logErrors, respondErrors: respondErrors, onError: onError, allowFail: allowFail };
        var config = __assign(__assign(__assign(__assign(__assign({}, restParams), context), errorConfig), { cookies: cookies, method: method, parent: parent, info: info }), ctx === null || ctx === void 0 ? void 0 : ctx.config);
        // Log handling
        var logs = [];
        var addLog = function (log) {
            if (normalizedArgs.shouldSaveLogs)
                console.log(log); // Save log in server logfile as well
            logs.push(log);
        };
        var saveLogs = function (logHandler) { return __awaiter(void 0, void 0, void 0, function () { var _a, _b, _c; return __generator(this, function (_d) {
            switch (_d.label) {
                case 0: return [4 /*yield*/, ((_a = logHandler === null || logHandler === void 0 ? void 0 : logHandler(logs)) !== null && _a !== void 0 ? _a : (_c = (_b = ctx === null || ctx === void 0 ? void 0 : ctx.config) === null || _b === void 0 ? void 0 : _b.logHandler) === null || _c === void 0 ? void 0 : _c.call(_b, logs))
                    // Error handling
                ];
                case 1: return [2 /*return*/, _d.sent()
                    // Error handling
                ];
            }
        }); }); };
        // Error handling
        var handleError = function (err, sendResponse) {
            if (sendResponse === void 0) { sendResponse = false; }
            var isRichError = typeof err === 'object' && !!err.errors;
            var errorObj = isRichError ? err : { errors: [err] };
            var _a = errorObj.code, code = _a === void 0 ? 500 : _a;
            if (config === null || config === void 0 ? void 0 : config.logErrors)
                console.error(errorObj);
            if (typeof (config === null || config === void 0 ? void 0 : config.onError) === 'function' && config.allowFail)
                config.onError(errorObj);
            else if (typeof (config === null || config === void 0 ? void 0 : config.onError) === 'function')
                return config.onError(errorObj);
            if (config.allowFail || config.onError === 'return')
                return __assign({ success: false }, errorObj);
            if (!!res && sendResponse && !config.allowFail)
                return res.status(code).json(errorObj);
            else
                throw new Error(isRichError ? errorObj : err);
        };
        // Return resolver
        return resolverFn({
            res: res,
            args: normalizedArgs,
            config: config,
            logs: logs,
            addLog: addLog,
            saveLogs: saveLogs,
            handleError: handleError,
        });
    };
    // Return Resolver
    return Object.assign(resolverWrapper, {
        argSchema: argsSchema || {},
        resSchema: responseSchema || {},
        ARGS_TYPE: undefined,
        RESP_TYPE: undefined,
    });
};
exports.aetherResolver = aetherResolver;
/* --- makeNextApiHandler() -------------------------------------------------------------------- */
// -i- Codegen: Build next.js api request from an aether resolver
var makeNextApiHandler = function (resolver, options) {
    return function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var middleware, config, middlewareArgs_1, middlewareResults, responseData, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    middleware = (options === null || options === void 0 ? void 0 : options.middleware) || [];
                    config = (options === null || options === void 0 ? void 0 : options.config) || {};
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 5, , 6]);
                    middlewareArgs_1 = {};
                    if (!!index_1.isEmpty(middleware)) return [3 /*break*/, 3];
                    return [4 /*yield*/, Promise.all(middleware.map(function (mw) { return apiUtils_1.runMiddleWare(req, res, mw); }))];
                case 2:
                    middlewareResults = _a.sent();
                    middlewareResults.filter(Boolean).map(function (middlewareResult) {
                        if (typeof middlewareResult === 'object')
                            middlewareArgs_1 = __assign(__assign({}, middlewareArgs_1), middlewareResult);
                    });
                    _a.label = 3;
                case 3: return [4 /*yield*/, resolver(__assign(__assign({}, middlewareArgs_1), { req: req, res: res, config: config }))];
                case 4:
                    responseData = _a.sent();
                    return [2 /*return*/, res.status(200).json(responseData)];
                case 5:
                    err_1 = _a.sent();
                    console.error(err_1);
                    return [2 /*return*/, res.status(500).json({ success: false, errors: [err_1] })];
                case 6: return [2 /*return*/];
            }
        });
    }); };
};
exports.makeNextApiHandler = makeNextApiHandler;
/* --- Exports --------------------------------------------------------------------------------- */
exports.default = exports.aetherResolver;
