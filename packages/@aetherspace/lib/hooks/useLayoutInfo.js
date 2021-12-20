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
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
/* --- useLayoutInfo() ------------------------------------------------------------------------- */
var useLayoutInfo = function () {
    // State
    var _a = react_1.useState({}), layoutInfo = _a[0], setLayoutInfo = _a[1];
    // -- Handler --
    var measureView = function (componentKey) { return function (_a) {
        var _b;
        var nativeEvent = _a.nativeEvent;
        var layout = nativeEvent.layout;
        var x = layout.x, y = layout.y, width = layout.width, height = layout.height;
        setLayoutInfo(__assign(__assign({}, layoutInfo), (_b = {}, _b[componentKey] = { x: x, y: y, width: width, height: height }, _b)));
    }; };
    // -- Return --
    return { layoutInfo: layoutInfo, measureView: measureView };
};
/* --- Export ---------------------------------------------------------------------------------- */
exports.default = useLayoutInfo;
