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
        var nextAppPaths = glob_1.default.sync('../../apps/*-next');
        nextAppPaths.forEach(function (nextAppPath) {
            var excludeJS = function (pth) { return ['.js', '.json'].every(function (ext) { return !pth.includes(ext); }); };
            var excludeDirs = function (pth) { return pth.split('/').pop().includes('.'); };
            var assetPaths = glob_1.default.sync(nextAppPath + "/public/**/*").filter(excludeJS).filter(excludeDirs);
            var assetRegistry = assetPaths.reduce(function (acc, assetPath) {
                var requirePath = assetPath.replace('../../apps/', '../');
                var relSrcPath = assetPath.replace(nextAppPath + "/public", '');
                var assetKey = stringUtils_1.getAssetKey(relSrcPath);
                var exportLine = "export const " + assetKey + " = require('" + requirePath + "');";
                return "" + acc + exportLine + "\n";
            }, '// -i- Auto generated with "yarn collect-assets"\n');
            var appPath = nextAppPath.replace('-next', '');
            fs_1.default.writeFileSync(appPath + "/assets.generated.ts", assetRegistry);
        });
        var appPaths = nextAppPaths.map(function (nextAppPath) { return nextAppPath.replace('../../', '../'); });
        var resultLogs = appPaths.map(function (appPath) { return "\u2705 " + appPath.replace('-next', '') + "/assets.ts"; });
        console.log('-i- Successfully created asset registries at:\n', resultLogs.join('\n'));
        process.exit(0);
    }
    catch (err) {
        console.error(err);
        process.exit(1);
    }
};
/* --- init ------------------------------------------------------------------------------------ */
collectAssets();
