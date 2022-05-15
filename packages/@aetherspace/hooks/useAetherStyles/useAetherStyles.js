"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
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
var react_1 = require("react");
var useAetherContext_1 = require("../../context/AetherContextManager/useAetherContext");
// Styles
var styles_1 = require("../../styles");
/* --- useAetherStyles() ----------------------------------------------------------------------- */
var useAetherStyles = function (props) {
    // Props
    var style = props.style, tw = props.tw, nativeProps = __rest(props, ["style", "tw"]);
    var twStrings = Array.isArray(tw) ? tw.filter(Boolean).join(' ') : tw;
    // Context
    var _a = useAetherContext_1.useAetherContext(), tailwind = _a.tailwind, isWeb = _a.isWeb, _b = _a.breakpoints, breakpoints = _b === void 0 ? {} : _b, _c = _a.twPrefixes, twPrefixes = _c === void 0 ? [] : _c, _d = _a.mediaPrefixes, mediaPrefixes = _d === void 0 ? [] : _d;
    // -- Styles --
    var _e = react_1.useMemo(function () {
        var breakpointIds = '';
        // Return nothing when no style related props were set
        if (!style && !twStrings)
            return [null, breakpointIds];
        // Return regular styles when no tailwind classes were passed
        if (!twStrings)
            return [style, breakpointIds];
        // Determine tailwind styles to be used
        var twClasses = twStrings.split(' ').sort(function (a) { return (a.includes(':') ? 1 : -1); });
        var usedClasses = twClasses.reduce(function (classes, twClass, i) {
            if (!twClass.includes(':'))
                return "" + classes + (i === 0 ? '' : ' ') + twClass;
            var _a = twClass.split(':'), twPrefix = _a[0], className = _a[1];
            if (isWeb && mediaPrefixes.includes(twPrefix)) {
                var breakpointStyles = tailwind(templateObject_1 || (templateObject_1 = __makeTemplateObject(["", ""], ["", ""])), className) || {};
                var breakpointId = styles_1.addMediaQuery(breakpoints[twPrefix], breakpointStyles);
                breakpointIds = "" + breakpointIds + (!breakpointIds ? '' : ' ') + breakpointId;
            }
            return twPrefixes.includes(twPrefix) ? "" + classes + (i === 0 ? '' : ' ') + className : classes;
        }, '');
        // @ts-ignore
        var memoStyles = __assign(__assign({}, tailwind(templateObject_2 || (templateObject_2 = __makeTemplateObject(["", ""], ["", ""])), usedClasses)), style);
        return [memoStyles, breakpointIds];
    }, [style, twStrings, twPrefixes.join()]), styles = _e[0], mediaIds = _e[1];
    // -- bindStyles --
    var bindStyles = __assign(__assign({ style: styles }, nativeProps), (mediaIds ? { nativeID: mediaIds } : {}));
    // -- Return --
    return bindStyles;
};
/* --- Exports --------------------------------------------------------------------------------- */
exports.default = useAetherStyles;
var templateObject_1, templateObject_2;
