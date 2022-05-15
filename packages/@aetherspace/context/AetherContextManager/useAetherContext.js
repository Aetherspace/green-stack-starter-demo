"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useAetherContext = void 0;
var react_1 = require("react");
var AetherContextManager_1 = require("./AetherContextManager");
/* --- useAetherContext() ---------------------------------------------------------------------- */
var useAetherContext = function () { return react_1.useContext(AetherContextManager_1.AetherContext); };
exports.useAetherContext = useAetherContext;
