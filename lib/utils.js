"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.padStart = exports.padEnd = exports.DATE_TIME_FORMAT_RE = void 0;
/**
 * DateTime Regular Expression
 */
const DATE_TIME_FORMAT_RE = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{1,6})?(?<timezone>(?:Z|(?:[-\+]\d{2}:\d{2})))?$/;
exports.DATE_TIME_FORMAT_RE = DATE_TIME_FORMAT_RE;
/**
 * Pads the current number with a given string (possibly repeated) so that the resulting string reaches a given length.
 * The padding is applied from the end (right) of the current string.
 *
 * @param maxLength The length of the resulting string once the current string has been padded.
 *        If this parameter is smaller than the current string's length, the current string will be returned as it is.
 *
 * @param fillString The string to pad the current string with.
 *        If this string is too long, it will be truncated and the left-most part will be applied.
 *        The default value for this parameter is " " (U+0020).
 */
function padEnd(maxLength = 2, fillString = "0") {
    // @ts-ignore
    const stringifiedNumber = this.toString();
    return stringifiedNumber.padEnd(maxLength, fillString);
}
exports.padEnd = padEnd;
/**
 * Pads the current number with a given string (possibly repeated) so that the resulting string reaches a given length.
 * The padding is applied from the start (left) of the current string.
 *
 * @param maxLength The length of the resulting string once the current string has been padded.
 *        If this parameter is smaller than the current string's length, the current string will be returned as it is.
 *
 * @param fillString The string to pad the current string with.
 *        If this string is too long, it will be truncated and the left-most part will be applied.
 *        The default value for this parameter is " " (U+0020).
 */
function padStart(maxLength = 2, fillString = "0") {
    // @ts-ignore
    const stringifiedNumber = this.toString();
    return stringifiedNumber.padStart(maxLength, fillString);
}
exports.padStart = padStart;
