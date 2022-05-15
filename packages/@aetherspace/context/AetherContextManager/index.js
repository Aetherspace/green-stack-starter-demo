"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useAetherContext = exports.AetherContextManager = void 0;
var AetherContextManager_1 = __importDefault(require("./AetherContextManager"));
exports.AetherContextManager = AetherContextManager_1.default;
var useAetherContext_1 = require("./useAetherContext");
Object.defineProperty(exports, "useAetherContext", { enumerable: true, get: function () { return useAetherContext_1.useAetherContext; } });
__exportStar(require("./AetherContextManager"), exports);
exports.default = AetherContextManager_1.default;
