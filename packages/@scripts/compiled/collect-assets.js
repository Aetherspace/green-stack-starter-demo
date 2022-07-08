"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var glob_1 = __importDefault(require("glob"));
var fs_1 = __importDefault(require("fs"));
// Utils
var stringUtils_1 = require("aetherspace/utils/stringUtils");
/* --- collectAssets --------------------------------------------------------------------------- */
var collectAssets = function () {
    try {
        var excludeJS = function (pth) { return ['.js', '.json'].every(function (ext) { return !pth.includes(ext); }); };
        var excludeDirs = function (pth) { return pth.split('/').pop().includes('.'); };
        var assetPaths = glob_1.default.sync('../../apps/next/public/**/*').filter(excludeJS).filter(excludeDirs);
        console.log(assetPaths);
        var assetRegistry = assetPaths.reduce(function (acc, assetPath) {
            var requirePath = assetPath.replace('../../apps/', '../../apps/');
            var relSrcPath = assetPath.replace('apps/next/public', '');
            var assetKey = (0, stringUtils_1.getAssetKey)(relSrcPath);
            console.log(assetKey, requirePath, relSrcPath);
            var exportLine = "export const ".concat(assetKey, " = require('").concat(requirePath, "');");
            return "".concat(acc).concat(exportLine, "\n");
        }, '// -i- Auto generated with "yarn collect-assets"\n');
        fs_1.default.writeFileSync('../../features/app-core/assets.generated.ts', assetRegistry);
        console.log('-i- Successfully created asset registries at:\n', '✅ features/app-core/assets.generated.ts');
        process.exit(0);
    }
    catch (err) {
        console.error(err);
        process.exit(1);
    }
};
/* --- init ------------------------------------------------------------------------------------ */
collectAssets();
