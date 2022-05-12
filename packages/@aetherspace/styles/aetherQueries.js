"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getInjectableMediaQueries = exports.addMediaQuery = void 0;
// Utils
var utils_1 = require("../utils");
/* --- SSR Media Queries ----------------------------------------------------------------------- */
// -i- Loosely based on: https://gist.github.com/EyMaddis/35ae3b269e4658527a1f8e374bd434ac#file-lib_cssinjection-ts
var mediaQueries = {};
var AETHER_QUERIES = 'AetherQueries';
/* --- getUnit() ------------------------------------------------------------------------------- */
var getUnit = function (classKey) {
    var unit = '';
    if (['margin', 'padding'].some(function (cssKey) { return classKey.includes(cssKey); }))
        unit = 'px';
    return unit;
};
/* --- addMediaQuery() ------------------------------------------------------------------------- */
var addMediaQuery = function (breakpoint, styles) {
    var styleId = breakpoint + "-" + utils_1.createKey(styles); // @ts-ignore
    // Build CSS rules from style object
    var breakpointSelector = "@media only screen and (min-width: " + breakpoint + "px)";
    var breakpointRules = Object.entries(styles).map(function (_a) {
        var cssProperty = _a[0], styleVal = _a[1];
        return utils_1.camelToDash(cssProperty) + ": " + styleVal + getUnit(cssProperty) + " !important;";
    });
    var breakpointCSS = breakpointSelector + " { [id~=\"" + styleId + "\"] { " + breakpointRules.join(' ') + " } }";
    // Save css to global styles object
    mediaQueries[styleId] = breakpointCSS;
    // Return styleId to be included in `[id]` prop
    return styleId;
};
exports.addMediaQuery = addMediaQuery;
/* --- getInjectableMediaQueries() ------------------------------------------------------------- */
var getInjectableMediaQueries = function () { return ({
    id: AETHER_QUERIES,
    css: Object.values(mediaQueries).join('\n'),
}); };
exports.getInjectableMediaQueries = getInjectableMediaQueries;
