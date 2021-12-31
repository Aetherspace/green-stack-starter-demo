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
exports.useAetherNav = void 0;
var react_1 = __importStar(require("react"));
var react_native_1 = require("react-native");
var expo_next_react_navigation_1 = require("expo-next-react-navigation");
var Linking = __importStar(require("expo-linking"));
var WebBrowser = __importStar(require("expo-web-browser"));
// Primitives
var primitives_1 = require("../primitives");
// Utils
var utils_1 = require("../utils");
;
;
;
;
/* --- useAetherNav() -------------------------------------------------------------------------- */
var useAetherNav = function () {
    // Hooks
    var _a = expo_next_react_navigation_1.useRouting(), navigate = _a.navigate, expoNextReactNavRoutingResources = __rest(_a, ["navigate"]);
    // Vars
    var APP_LINKS = react_1.useMemo(function () { var _a; return ((_a = utils_1.getEnvVar('APP_LINKS')) === null || _a === void 0 ? void 0 : _a.split('|')) || []; }, []);
    var webDomain = APP_LINKS.filter(function (link) { return link.includes('://'); })[0];
    // -- Handlers --
    var getDestination = function (path) {
        var internalDomainMatch = APP_LINKS.find(function (appUrl) { return path.includes(appUrl); });
        if (internalDomainMatch)
            return path.replace(internalDomainMatch + "/", '');
        return path;
    };
    var openLink = function (path, isBlank) {
        if (isBlank === void 0) { isBlank = false; }
        var destination = getDestination(path);
        var isInternalLink = !destination.includes('://');
        var webDestination = (isInternalLink && react_native_1.Platform.OS !== 'web') ? "" + webDomain + destination : path;
        var isBrowserEnv = react_native_1.Platform.OS === 'web' && typeof window !== 'undefined' && !!window.open;
        var openURL = isBrowserEnv ? function (url) { return window.open(url, '_blank'); } : Linking.openURL;
        if (isInternalLink && !isBlank)
            return navigate({ routeName: destination });
        if (isBlank || isBrowserEnv)
            return openURL(webDestination); // "open in a new tab" or mobile browser
        WebBrowser.openBrowserAsync(webDestination); // Open external links in internal browser?
    };
    // -- Return --
    return __assign(__assign({}, expoNextReactNavRoutingResources), { navigate: navigate, webDomain: webDomain, getDestination: getDestination, openLink: openLink });
};
exports.useAetherNav = useAetherNav;
/* --- <AetherLink/> --------------------------------------------------------------------------- */
var AetherLink = function (props) {
    // Props
    var children = props.children, href = props.href, to = props.to, routeName = props.routeName, style = props.style, tw = props.tw, twID = props.twID, asText = props.asText, restProps = __rest(props, ["children", "href", "to", "routeName", "style", "tw", "twID", "asText"]);
    var bindStyles = __assign({ style: style, tw: tw, twID: twID }, restProps);
    // Hooks
    var _a = exports.useAetherNav(), openLink = _a.openLink, getDestination = _a.getDestination;
    var destination = getDestination((href || to || routeName));
    // Memos
    var TextComponent = react_1.useMemo(function () { return primitives_1.AetherText; }, []);
    var ViewComponent = react_1.useMemo(function () { return primitives_1.AetherView; }, []);
    // Vars
    var isBlank = props.target === '_blank' || props.isBlank;
    var isText = asText || props.isText || typeof children === 'string';
    // -- Handler --
    var onLinkPress = function () { return openLink(destination, isBlank); };
    // -- Render as Text --
    if (isText)
        return <TextComponent {...bindStyles} onPress={onLinkPress}>{children}</TextComponent>;
    // -- Render as View --
    return (<expo_next_react_navigation_1.Link {...props} routeName={destination} touchableOpacityProps={{ onPressIn: onLinkPress }}>
            <ViewComponent {...bindStyles}>
                {children}
            </ViewComponent>
        </expo_next_react_navigation_1.Link>);
};
/* --- Exports --------------------------------------------------------------------------------- */
exports.default = AetherLink;
