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
exports.useTextContext = void 0;
// https://docs.expo.dev/versions/latest/react-native/text/
// https://necolas.github.io/react-native-web/docs/text/
var react_1 = __importStar(require("react"));
var react_native_1 = require("react-native");
// Hooks
var hooks_1 = require("../../hooks");
/* --- Context --------------------------------------------------------------------------------- */
var DEFAULT_TEXT_CONTEXT = { color: null };
var TextContext = react_1.createContext(DEFAULT_TEXT_CONTEXT);
var useTextContext = function () { return react_1.useContext(TextContext); };
exports.useTextContext = useTextContext;
/* --- useAetherText --------------------------------------------------------------------------- */
var useAetherText = function (_a) {
    var _b;
    var children = _a.children, props = __rest(_a, ["children"]);
    // Styles
    var bindStyles = hooks_1.useAetherStyles(props);
    // Context
    var contextColor = exports.useTextContext(); // @ts-ignore
    var textColor = ((_b = bindStyles.style) === null || _b === void 0 ? void 0 : _b.color) || contextColor; // remember color for children
    // -- Return --
    return __assign(__assign({}, props), { textColor: textColor, textContent: children, bindStyles: bindStyles });
};
/* --- <AetherText/> --------------------------------------------------------------------------- */
var AetherText = react_1.forwardRef(function (props, ref) {
    // Hooks
    var _a = useAetherText(props), textColor = _a.textColor, textContent = _a.textContent, bindStyles = _a.bindStyles;
    // Render
    return textColor ? (<TextContext.Provider value={{ color: textColor }}>
      <react_native_1.Text {...bindStyles}>{textContent}</react_native_1.Text>
    </TextContext.Provider>) : (<react_native_1.Text {...props} ref={ref} {...bindStyles}>
      {textContent}
    </react_native_1.Text>);
});
/* --- Exports --------------------------------------------------------------------------------- */
exports.default = Object.assign(AetherText, {
    TYPE: undefined,
});
