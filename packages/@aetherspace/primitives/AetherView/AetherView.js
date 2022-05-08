"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// https://docs.expo.dev/versions/latest/react-native/view/
// https://necolas.github.io/react-native-web/docs/view/
var react_1 = __importDefault(require("react"));
var react_native_1 = require("react-native");
// Hooks
var hooks_1 = require("../../hooks");
;
/* --- <AetherView/> --------------------------------------------------------------------------- */
var AetherView = function (props) {
    // Styles
    var bindStyles = hooks_1.useAetherStyles(props);
    // Render
    return <react_native_1.View {...bindStyles}/>;
};
/* --- Exports --------------------------------------------------------------------------------- */
exports.default = Object.assign(AetherView, {
    TYPE: undefined,
});
