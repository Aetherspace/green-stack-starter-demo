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
// https://docs.expo.dev/versions/latest/react-native/image/
// https://necolas.github.io/react-native-web/docs/image/
var react_1 = __importStar(require("react"));
var react_native_1 = require("react-native");
// Context
var AetherContextManager_1 = require("../../context/AetherContextManager");
// Hooks
var hooks_1 = require("../../hooks");
// Utils
var utils_1 = require("../../utils");
/* --- <AetherImage/> -------------------------------------------------------------------------- */
var AetherImage = react_1.forwardRef(function (props, ref) {
    // Context
    var assets = AetherContextManager_1.useAetherContext().assets;
    // Props
    var source = react_1.useMemo(function () {
        if (!props.src)
            return props.source;
        if (props.src.includes('http'))
            return { uri: props.src };
        return assets[utils_1.getAssetKey(props.src)];
    }, [props.source, props.src]);
    // -- Styles --
    var _ = props.src, componentProps = __rest(props, ["src"]);
    var bindStyles = hooks_1.useAetherStyles(props);
    // -- Render --
    return <react_native_1.Image {...componentProps} ref={ref} source={source} {...bindStyles} accessibilityIgnoresInvertColors/>;
});
/* --- Exports --------------------------------------------------------------------------------- */
exports.default = Object.assign(AetherImage, {
    TYPE: undefined,
});
