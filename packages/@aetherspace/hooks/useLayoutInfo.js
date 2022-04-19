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
exports.useLayoutInfo = void 0;
var react_1 = require("react");
/* --- useLayoutInfo() ------------------------------------------------------------------------- */
// -i- Save & use layout info for components under string keys, e.g.:
//
//      import useLayoutInfo from '../useLayoutInfo()'
//
//      const { measureOnLayout, layoutInfo } = useLayoutInfo()
//
//      <View onLayout={measureOnLayout('MyCustomView')} />
//
//      const viewHeight = layoutInfo.MyCustomView?.height
//
var useLayoutInfo = function () {
    // State
    var _a = react_1.useState({}), layoutInfo = _a[0], setLayoutInfo = _a[1]; // prettier-ignore
    // -- Handlers --
    var measureOnLayout = function (componentKey, callback) {
        return function (_a) {
            var _b;
            var nativeEvent = _a.nativeEvent;
            var layout = nativeEvent.layout;
            var x = layout.x, y = layout.y, width = layout.width, height = layout.height;
            var layoutMeasurements = __assign(__assign({}, layoutInfo[componentKey]), { // preserve 'pageX' & 'pageY' if available
                x: x, y: y, width: width, height: height });
            setLayoutInfo(__assign(__assign({}, layoutInfo), (_b = {}, _b[componentKey] = layoutMeasurements, _b)));
            if (callback)
                callback(layoutMeasurements);
        };
    };
    var measureRef = function (componentKey, callback) {
        return function () {
            var _a;
            var measurements = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                measurements[_i] = arguments[_i];
            }
            var x = measurements[0], y = measurements[1], width = measurements[2], height = measurements[3], pageX = measurements[4], pageY = measurements[5];
            var refMeasurements = { x: x, y: y, width: width, height: height, pageX: pageX, pageY: pageY };
            setLayoutInfo(__assign(__assign({}, layoutInfo), (_a = {}, _a[componentKey] = refMeasurements, _a)));
            if (callback)
                callback(refMeasurements);
        };
    };
    // -- Return --
    return { layoutInfo: layoutInfo, measureOnLayout: measureOnLayout, measureRef: measureRef };
};
exports.useLayoutInfo = useLayoutInfo;
