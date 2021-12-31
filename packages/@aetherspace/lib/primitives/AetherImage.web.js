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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// https://necolas.github.io/react-native-web/docs/image/
// https://nextjs.org/docs/api-reference/next/image
var react_1 = __importStar(require("react"));
var image_1 = __importDefault(require("next/image"));
// Context
var AetherContextManager_1 = require("../context/AetherContextManager");
// Components
var AetherView_1 = __importDefault(require("./AetherView")); // @ts-ignore
var AetherImage_tsx_1 = __importDefault(require("./AetherImage.tsx"));
;
/* --- <AetherImage/> -------------------------------------------------------------------------- */
var AetherImage = function (props) {
    // Props
    var tw = props.tw, style = props.style, width = props.width, height = props.height, quality = props.quality, priority = props.priority, loading = props.loading;
    var bindStyles = { style: style, tw: tw };
    var source = props.source;
    var src = props.src || (source === null || source === void 0 ? void 0 : source.uri);
    // Context
    var _a = AetherContextManager_1.useAetherContext(), isNextJS = _a.isNextJS, isExpo = _a.isExpo;
    // -- Memoizations --
    var imgProps = react_1.useMemo(function () {
        if (width && height)
            return { width: width, height: height, layout: 'responsive' };
        return { layout: 'fill' };
    }, []);
    // -- Render --
    if (!isNextJS || isExpo)
        return <AetherImage_tsx_1.default {...bindStyles} src={src}/>;
    return (<AetherView_1.default {...bindStyles}>
            <image_1.default src={src} {...imgProps} quality={quality} priority={priority} loading={loading}/>
        </AetherView_1.default>);
};
/* --- Exports --------------------------------------------------------------------------------- */
exports.default = AetherImage;
