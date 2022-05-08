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
var react_1 = __importStar(require("react"));
var hooks_1 = require("../hooks");
/* --- aetherify() ----------------------------------------------------------------------------- */
// -i- Wraps with useAetherStyles(), which will add server-side media query support to avoid layout shift on web
// -i- Inspired by https://github.com/nandorojo/moti/blob/master/packages/core/src/motify.tsx
var aetherify = function (Component) {
    // Use higher order component to attach aether style support
    var withAetherStyles = function () {
        // Turn into component with aether style support
        var Aetherified = react_1.forwardRef(function Aether(_a, ref) {
            var tw = _a.tw, twID = _a.twID, style = _a.style, props = __rest(_a, ["tw", "twID", "style"]);
            // -i- useAetherStyles() will add server-side media query support to avoid layout shift on web
            var bindStyles = hooks_1.useAetherStyles(__assign({ tw: tw, twID: twID, style: style }, props));
            return <Component {...bindStyles} ref={ref}/>;
        });
        // Apply updated display name
        Aetherified.displayName = "Aether." + (Component.displayName || Component.name || 'NoName');
        // Return aetherified component
        return Aetherified;
    };
    // Return function wrapper
    return withAetherStyles;
};
/* --- Exports --------------------------------------------------------------------------------- */
exports.default = aetherify;
