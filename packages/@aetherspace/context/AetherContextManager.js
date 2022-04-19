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
Object.defineProperty(exports, "__esModule", { value: true });
exports.useAetherContext = exports.AetherContext = exports.DEFAULT_AETHER_CONTEXT = void 0;
var react_1 = __importStar(require("react"));
var react_native_1 = require("react-native");
// Primitives
var primitives_1 = require("../primitives");
// Hooks
var hooks_1 = require("../hooks");
/* --- AetherContext --------------------------------------------------------------------------- */
exports.DEFAULT_AETHER_CONTEXT = { assets: {}, icons: {}, linkContext: {} };
exports.AetherContext = react_1.createContext(exports.DEFAULT_AETHER_CONTEXT);
/* --- <AetherContextManager/> ----------------------------------------------------------------- */
var AetherContextManager = function (props) {
    var _a, _b;
    // Props
    var children = props.children, isNextJS = props.isNextJS, isExpo = props.isExpo, isDesktop = props.isDesktop;
    // Layout
    var _c = hooks_1.useLayoutInfo(), layoutInfo = _c.layoutInfo, measureOnLayout = _c.measureOnLayout;
    // Assets
    var assets = react_1.useMemo(function () { return props.assets || exports.DEFAULT_AETHER_CONTEXT.assets; }, []);
    // Icons
    var icons = react_1.useMemo(function () { return props.icons || exports.DEFAULT_AETHER_CONTEXT.icons; }, []);
    // Links (used for mobile navigation only)
    var linkContext = react_1.useMemo(function () { return props.linkContext || exports.DEFAULT_AETHER_CONTEXT.linkContext; }, []);
    // Styles
    var _d = react_1.useState({}), globalStyles = _d[0], setGlobalStyles = _d[1];
    // -- Handlers --
    var registerStyles = function (newStyles) { return setGlobalStyles(function (currStyles) { return (__assign(__assign({}, newStyles), currStyles)); }); };
    // -- ContextValue --
    var appWidth = ((_a = layoutInfo.app) === null || _a === void 0 ? void 0 : _a.width) || react_native_1.Dimensions.get('window').width;
    var appHeight = ((_b = layoutInfo.app) === null || _b === void 0 ? void 0 : _b.width) || react_native_1.Dimensions.get('window').height;
    var contextValue = react_1.useMemo(function () {
        var _a, _b, _c, _d, _e, _f, _g;
        var breakpoints = {
            sm: ((_a = props.breakpoints) === null || _a === void 0 ? void 0 : _a.sm) || 640,
            md: ((_b = props.breakpoints) === null || _b === void 0 ? void 0 : _b.md) || 768,
            lg: ((_c = props.breakpoints) === null || _c === void 0 ? void 0 : _c.lg) || 1024,
            xl: ((_d = props.breakpoints) === null || _d === void 0 ? void 0 : _d.xl) || 1280,
            xxl: ((_e = props.breakpoints) === null || _e === void 0 ? void 0 : _e.xxl) || 1536,
            phones: 1,
            tablets: ((_f = props.breakpoints) === null || _f === void 0 ? void 0 : _f.md) || 768,
            laptops: ((_g = props.breakpoints) === null || _g === void 0 ? void 0 : _g.lg) || 1024,
        };
        var flags = {
            isWeb: react_native_1.Platform.OS === 'web',
            isMobile: react_native_1.Platform.OS !== 'web' && !isDesktop,
            isAndroid: react_native_1.Platform.OS === 'android',
            isIOS: react_native_1.Platform.OS === 'ios',
            isServer: react_native_1.Platform.OS === 'web' && typeof window === 'undefined',
            isXS: !!appWidth && appWidth < breakpoints.sm,
            isSM: !!appWidth && appWidth >= breakpoints.sm && appWidth < breakpoints.md,
            isMD: !!appWidth && appWidth >= breakpoints.md && appWidth < breakpoints.lg,
            isLG: !!appWidth && appWidth >= breakpoints.lg && appWidth < breakpoints.xl,
            isXL: !!appWidth && appWidth >= breakpoints.xl && appWidth < breakpoints.xxl,
            isXXL: !!appWidth && appWidth >= breakpoints.xxl,
            isMobileWeb: props.isMobileWeb,
            isTabletWeb: props.isTabletWeb,
            isPhoneSize: !!appWidth && appWidth < breakpoints.sm,
            isTabletSize: !!appWidth && appWidth >= breakpoints.sm && appWidth <= breakpoints.lg,
            isLaptopSize: !!appWidth && appWidth >= breakpoints.md,
        };
        var mediaPrefixObj = {
            sm: !!appWidth && appWidth >= breakpoints.sm,
            md: !!appWidth && appWidth >= breakpoints.md,
            lg: !!appWidth && appWidth >= breakpoints.lg,
            xl: !!appWidth && appWidth >= breakpoints.xl,
            xxl: !!appWidth && appWidth >= breakpoints.xxl,
            phones: flags.isPhoneSize || flags.isMobileWeb,
            tablets: flags.isTabletSize || flags.isTabletWeb,
            laptops: flags.isLaptopSize,
        };
        var twPrefixObj = __assign(__assign({}, mediaPrefixObj), { web: flags.isWeb, mobile: flags.isMobile, android: flags.isAndroid, ios: flags.isIOS, server: flags.isServer, next: isNextJS, expo: isExpo, desktop: isDesktop });
        var twPrefixes = Object.entries(twPrefixObj).filter(function (_a) {
            var val = _a[1];
            return !!val;
        }).map(function (_a) {
            var k = _a[0];
            return k;
        });
        var mediaPrefixes = Object.keys(mediaPrefixObj);
        return __assign(__assign({}, flags), { assets: assets, icons: icons, linkContext: linkContext, isNextJS: isNextJS, isExpo: isExpo, isDesktop: isDesktop, breakpoints: breakpoints, twPrefixes: twPrefixes, mediaPrefixes: mediaPrefixes, styles: globalStyles, registerStyles: registerStyles });
    }, [react_native_1.Platform.OS, appWidth, typeof window === 'undefined']);
    // -- Render --
    return (<exports.AetherContext.Provider value={contextValue}>
            <primitives_1.AetherView tw={['w-full h-full', props.tw].filter(Boolean).join(' ')} style={props.style} onLayout={measureOnLayout('app')}>
                {children}
            </primitives_1.AetherView>
        </exports.AetherContext.Provider>);
};
/* --- useAetherContext() ---------------------------------------------------------------------- */
var useAetherContext = function () { return react_1.useContext(exports.AetherContext); };
exports.useAetherContext = useAetherContext;
/* --- Exports --------------------------------------------------------------------------------- */
exports.default = AetherContextManager;
