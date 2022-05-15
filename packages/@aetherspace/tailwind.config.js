"use strict";
var plugin = require('twrnc').plugin;
module.exports = {
    plugins: [
        plugin(function (_a) {
            var addUtilities = _a.addUtilities;
            addUtilities({
                'roboto': {
                    fontFamily: 'Roboto',
                },
                'roboto-light': {
                    fontFamily: 'RobotoLight',
                    fontWeight: '300',
                },
                'roboto-bold': {
                    fontFamily: 'RobotoBold',
                    fontWeight: '700',
                },
                'roboto-black': {
                    fontFamily: 'RobotoBlack',
                    fontWeight: '900',
                }
            });
        })
    ]
};
