"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
// https://docs.expo.dev/versions/latest/react-native/pressable/
// https://necolas.github.io/react-native-web/docs/pressable/
var react_1 = __importStar(require("react"));
var react_native_1 = require("react-native");
// Hooks
var hooks_1 = require("../../hooks");
/* --- <AetherPressable/> ---------------------------------------------------------------------- */
var AetherPressable = react_1.forwardRef(function (props, ref) {
    // Styles
    var bindStyles = hooks_1.useAetherStyles(props);
    // Render
    return <react_native_1.Pressable {...props} ref={ref} {...bindStyles}/>;
});
/* --- Exports --------------------------------------------------------------------------------- */
exports.default = Object.assign(AetherPressable, {
    TYPE: undefined,
});
