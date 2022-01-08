"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getInitialProps = exports.style = void 0;
// Based on https://github.com/expo/expo-cli/blob/master/packages/next-adapter/document.js
var react_1 = __importDefault(require("react"));
var react_native_1 = require("react-native");
var document_1 = __importStar(require("next/document"));
// Styles
var styles_1 = require("./styles");
/* --- Styles ---------------------------------------------------------------------------------- */
exports.style = "\n/**\n * Building on the RNWeb reset:\n * https://github.com/necolas/react-native-web/blob/master/packages/react-native-web/src/exports/StyleSheet/initialRules.js\n */\nhtml, body, #__next {\n  width: 100%;\n  /* To smooth any scrolling behavior */\n  -webkit-overflow-scrolling: touch;\n  margin: 0px;\n  padding: 0px;\n  /* Allows content to fill the viewport and go beyond the bottom */\n  min-height: 100%;\n}\n#__next {\n  flex-shrink: 0;\n  flex-basis: auto;\n  flex-direction: column;\n  flex-grow: 1;\n  display: flex;\n  flex: 1;\n}\nhtml {\n  scroll-behavior: smooth;\n  /* Prevent text size change on orientation change https://gist.github.com/tfausak/2222823#file-ios-8-web-app-html-L138 */\n  -webkit-text-size-adjust: 100%;\n  height: 100%;\n}\nbody {\n  display: flex;\n  /* Allows you to scroll below the viewport; default value is visible */\n  overflow-y: auto;\n  overscroll-behavior-y: none;\n  text-rendering: optimizeLegibility;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n  -ms-overflow-style: scrollbar;\n}\n";
/* --- Initial Props --------------------------------------------------------------------------- */
var getInitialProps = function (ctx) {
    // React Native Styling
    react_native_1.AppRegistry.registerComponent('Main', function () { return document_1.Main; });
    var initialProps = ctx.defaultGetInitialProps(ctx); // @ts-ignore
    var getStyleElement = react_native_1.AppRegistry.getApplication('Main').getStyleElement;
    // Render to HTML & collect styles
    var page = ctx.renderPage();
    // Aetherspace SSR Media Queries
    var aetherQueries = styles_1.getInjectables();
    // List all styles
    var styles = (<>
            <exports.style dangerouslySetInnerHTML={{ __html: exports.style }}/>
            <exports.style type="text/css" dangerouslySetInnerHTML={{ __html: aetherQueries.css }}/>
            {getStyleElement()}
        </>);
    // Return initialProps + Styles
    return __assign(__assign(__assign({}, page), initialProps), { styles: styles });
};
exports.getInitialProps = getInitialProps;
/* --- <Document/> ----------------------------------------------------------------------------- */
var Document = /** @class */ (function (_super) {
    __extends(Document, _super);
    function Document() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Document.prototype.render = function () {
        return (<document_1.Html>
                <document_1.Head>
                    <meta httpEquiv="X-UA-Compatible" content="IE=edge"/>
                </document_1.Head>
                <body>
                    <document_1.Main />
                    <document_1.NextScript />
                </body>
            </document_1.Html>);
    };
    return Document;
}(document_1.default));
Document.getInitialProps = exports.getInitialProps;
/* --- Exports --------------------------------------------------------------------------------- */
exports.default = Document;
