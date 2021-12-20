"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var react_native_1 = require("react-native");
// Hooks
var hooks_1 = require("../hooks");
;
/* --- <AetherView/> --------------------------------------------------------------------------- */
var AetherView = function (props) {
    // Styles
    var bindStyles = hooks_1.useAetherStyles(props);
    // Render
    return <react_native_1.View {...bindStyles}/>;
};
/* --- Exports --------------------------------------------------------------------------------- */
exports.default = AetherView;
