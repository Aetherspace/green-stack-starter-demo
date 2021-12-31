"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// https://docs.expo.dev/versions/latest/react-native/pressable/
// https://necolas.github.io/react-native-web/docs/pressable/
var react_1 = __importDefault(require("react"));
var react_native_1 = require("react-native");
// Hooks
var hooks_1 = require("../hooks");
;
/* --- <AetherPressable/> ---------------------------------------------------------------------- */
var AetherPressable = function (props) {
    // Styles
    var bindStyles = hooks_1.useAetherStyles(props);
    // Render
    return <react_native_1.Pressable {...bindStyles}/>;
};
/* --- Exports --------------------------------------------------------------------------------- */
exports.default = AetherPressable;
