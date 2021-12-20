"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidNumber = exports.hasLeadingZeroes = exports.roundPrice = exports.roundDownTo = exports.roundUpTo = exports.roundTo = void 0;
// Utils
var round = Math.round, ceil = Math.ceil, floor = Math.floor;
/* --- roundTo() ------------------------------------------------------------------------------- */
// -i- Uses scientific string notation to round numbers (up or down) to specific decimals
var roundTo = function (value, decimals, roundFn) {
    if (decimals === void 0) { decimals = 0; }
    if (roundFn === void 0) { roundFn = round; }
    return +(roundFn(value + "e+" + decimals) + "e-" + decimals);
};
exports.roundTo = roundTo;
var roundUpTo = function (value, decimals) {
    if (decimals === void 0) { decimals = 0; }
    return exports.roundTo(value, decimals, ceil);
};
exports.roundUpTo = roundUpTo;
var roundDownTo = function (value, decimals) {
    if (decimals === void 0) { decimals = 0; }
    return exports.roundTo(value, decimals, floor);
};
exports.roundDownTo = roundDownTo;
/* --- roundPrice() ---------------------------------------------------------------------------- */
// -i- Round for USD / EUR / GBP price formatting
var roundPrice = function (priceVal) { return exports.roundTo(priceVal, 2); };
exports.roundPrice = roundPrice;
/* --- hasLeadingZeroes() ---------------------------------------------------------------------- */
// -i- Detect leading zeroes in "numbers"
var hasLeadingZeroes = function (numString) {
    return Number(numString).toString() !== numString;
};
exports.hasLeadingZeroes = hasLeadingZeroes;
/* --- isValidNumber() ------------------------------------------------------------------------- */
// -i- check if a string is a valid number, excluding leading zeroes
// -i- Allowed: numbers & number strings "0", "1", "250", "0.123"
// -i- Catches: non numbers & leading zeroes "0568"
// -i- JavaScript ¯\_(ツ)_/¯
var isValidNumber = function (numCandidate) { return (![true, false, null].includes(numCandidate) &&
    !Array.isArray(numCandidate) &&
    !Number.isNaN(+numCandidate) &&
    !exports.hasLeadingZeroes(numCandidate)); };
exports.isValidNumber = isValidNumber;
