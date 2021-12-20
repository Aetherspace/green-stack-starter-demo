"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useAetherContext = exports.AetherContext = exports.AetherContextManager = void 0;
// Defaults
var AetherContextManager_1 = require("./AetherContextManager");
Object.defineProperty(exports, "AetherContextManager", { enumerable: true, get: function () { return __importDefault(AetherContextManager_1).default; } });
Object.defineProperty(exports, "AetherContext", { enumerable: true, get: function () { return AetherContextManager_1.AetherContext; } });
Object.defineProperty(exports, "useAetherContext", { enumerable: true, get: function () { return AetherContextManager_1.useAetherContext; } });
