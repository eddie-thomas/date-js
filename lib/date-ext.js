"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _a, _DateExt_timezoneOffsetMilliseconds, _DateExt_convertMillisecondTimezoneOffsetToISOFormat, _DateExt_getLocaleTimezoneOffsetMilliseconds, _DateExt_parseISOTimezone, _DateExt_testISOString;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateExt = void 0;
const utils_1 = require("./utils");
Number.prototype.padEnd = utils_1.padEnd;
Number.prototype.padStart = utils_1.padStart;
// -----------------------------------------------
/**
 * Date Extension Sub-class
 *
 * The below @ explains why the timezones are multiplied by -1
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getTimezoneOffset#negative_values_and_positive_values
 *
 * @todo
 * - Write in the UTC converted `getter` methods. Did the `getDateString` to show example
 */
class DateExt extends Date {
    // Does not allow all inputs as original Date object
    constructor(date = new Date()) {
        var _b;
        /** Get the date as an ISO 8601 standard */
        const isoString = date instanceof Date ? date.toISOString() : date;
        __classPrivateFieldGet(DateExt, _a, "m", _DateExt_testISOString).call(DateExt, isoString);
        const matches = isoString.match(utils_1.DATE_TIME_FORMAT_RE);
        const timezone = (_b = matches === null || matches === void 0 ? void 0 : matches.groups) === null || _b === void 0 ? void 0 : _b.timezone;
        const timezoneMilliseconds = (timezone && __classPrivateFieldGet(DateExt, _a, "m", _DateExt_parseISOTimezone).call(DateExt, timezone)) ||
            __classPrivateFieldGet(DateExt, _a, "m", _DateExt_getLocaleTimezoneOffsetMilliseconds).call(DateExt);
        // We have a valid ISO date
        super(timezone ? isoString.replace(timezone, "") : isoString);
        /**
         * The timezone offset of the date passed in, in milliseconds, multiplied by -1
         */
        _DateExt_timezoneOffsetMilliseconds.set(this, void 0);
        // Set milliseconds of offset
        __classPrivateFieldSet(this, _DateExt_timezoneOffsetMilliseconds, timezoneMilliseconds, "f");
    }
    /**
     * @summary We are keeping this date as
     * @returns The known date with the timezone
     */
    toISOString() {
        return `${this.getFullYear()}-${(this.getMonth() + 1).padStart()}-${this.getDate().padStart()}T${this.getHours().padStart()}:${this.getMinutes().padStart()}:${this.getSeconds().padStart()}.${this.getMilliseconds().padStart(3)}${__classPrivateFieldGet(DateExt, _a, "m", _DateExt_convertMillisecondTimezoneOffsetToISOFormat).call(DateExt, __classPrivateFieldGet(this, _DateExt_timezoneOffsetMilliseconds, "f"))}`;
    }
}
exports.DateExt = DateExt;
_a = DateExt, _DateExt_timezoneOffsetMilliseconds = new WeakMap(), _DateExt_convertMillisecondTimezoneOffsetToISOFormat = function _DateExt_convertMillisecondTimezoneOffsetToISOFormat(offset) {
    const hrs = offset / 1000 / 60 / 60;
    const dir = hrs > 0 ? "-" : "+";
    const min = Math.floor((hrs % 1) * 60).padStart();
    return dir + Math.abs(hrs).padStart() + ":" + min;
}, _DateExt_getLocaleTimezoneOffsetMilliseconds = function _DateExt_getLocaleTimezoneOffsetMilliseconds() {
    // Minutes multiplied by `60` to get to seconds, then `1000` to get to milliseconds
    return new Date().getTimezoneOffset() * 60 * 1000;
}, _DateExt_parseISOTimezone = function _DateExt_parseISOTimezone(timezone) {
    const matches = timezone.match(/^(?<dir>[-\+])(?<hr>([0-1][0-9]|[2][0-4])):(?<min>[0-5][0-9])$/);
    try {
        const { dir, hr, min } = (matches === null || matches === void 0 ? void 0 : matches.groups) || {};
        if (!(dir && hr && min))
            throw Error("Not all of the timezone offset was provided!");
        /** Have to use the opposite because that shits backwards */
        const oppositeDir = dir === "-" ? "+" : "-";
        return parseInt(`${oppositeDir}${(parseInt(hr, 10) * 60 + parseInt(min, 10)) * 60 * 1000}`, 10);
    }
    catch (error) {
        // Meant for logging unexpected issues
        console.error(`Cannot determine timezone offset: ${timezone}. Error was thrown: ${error}`);
    }
    // Defaults to getting the users locale timezone offset
    return __classPrivateFieldGet(DateExt, _a, "m", _DateExt_getLocaleTimezoneOffsetMilliseconds).call(DateExt);
}, _DateExt_testISOString = function _DateExt_testISOString(isoString) {
    if (!utils_1.DATE_TIME_FORMAT_RE.test(isoString))
        throw Error(`Cannot create a date with the given input: ${isoString}`);
};
