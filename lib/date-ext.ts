import {
  DATE_TIME_FORMAT_RE,
  padEnd,
  padStart,
  type Timezone,
  TIMEZONES,
} from "./utils";

// -- Utility code added to the Number object ----
declare global {
  interface Number {
    padEnd: (maxLength?: number, fillString?: string) => string;
    padStart: (maxLength?: number, fillString?: string) => string;
  }
}

Number.prototype.padEnd = padEnd;
Number.prototype.padStart = padStart;
// -----------------------------------------------

/**
 * Date Extension Sub-class
 *
 * The below @ explains why the timezones are multiplied by -1
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getTimezoneOffset#negative_values_and_positive_values
 *
 * @todo
 * - Write in the locale converted `getter` methods.
 */
class DateExt {
  /** The interpreted date, with or without a timezone offset (based on `#locale`) */
  #date: Date;
  /** Whether this date should be treated as an explicit locale date */
  #locale: boolean;
  /** The original ISO 8601 dateTime string */
  #originISOString: string;
  /** The timezone offset of the date passed in, in milliseconds, multiplied by -1 */
  #timezoneOffsetMilliseconds: number;

  /**
   *
   * @param offset - The original offset of the date passed in
   * @returns
   */
  static #convertMillisecondTimezoneOffsetToISOFormat(offset: number): string {
    const hrs = offset / 1000 / 60 / 60;
    const dir = hrs > 0 ? "-" : "+";
    const min = Math.floor((hrs % 1) * 60).padStart();
    return dir + Math.abs(hrs).padStart() + ":" + min;
  }

  /**
   * The offset of the user's locale dateTime, multiplied by -1
   *
   * @returns
   */
  static #getLocaleTimezoneOffsetMilliseconds(): number {
    // Minutes multiplied by `60` to get to seconds, then `1000` to get to milliseconds
    return new Date().getTimezoneOffset() * 60 * 1000;
  }

  /**
   *
   * @param timezone - The captured timezone from the ISO `dateTime` string passed into this object
   * @returns
   */
  static #parseISOTimezone(timezone: string): number {
    const matches = timezone.match(
      /^(?<dir>[-\+])(?<hr>([0-1][0-9]|[2][0-4]))(:(?<min>[0-5][0-9])|)$/
    );

    try {
      const { dir, hr, min } = matches?.groups || {};
      if (!(dir && hr))
        throw Error("Not all of the timezone offset was provided!");

      const timezoneMilliseconds = parseInt(
        `${dir}${
          (parseInt(hr, 10) * 60 + parseInt(min ?? "0", 10)) * 60 * 1000
        }`,
        10
      );

      return timezoneMilliseconds;
    } catch (error) {
      // Meant for logging unexpected issues
      console.error(
        `Cannot determine timezone offset: ${timezone}. Error was thrown: ${error}`
      );
    }

    // Defaults to getting the users locale timezone offset
    return DateExt.#getLocaleTimezoneOffsetMilliseconds();
  }

  /**
   *
   * @param isoString - The ISO 8601 string representing the date
   * @throws Error if date string has an incorrect timezone
   */
  static #testISOString(isoString: string): void {
    if (!DATE_TIME_FORMAT_RE.test(isoString))
      throw Error(`Cannot create a date with the given input: ${isoString}`);
  }

  // Does not allow all inputs as original Date object
  constructor(date: Date | string = new Date(), locale: boolean = false) {
    /** Get the date as an ISO 8601 standard */
    const isoString: string = date instanceof Date ? date.toISOString() : date;

    DateExt.#testISOString(isoString);
    const matches = isoString.match(DATE_TIME_FORMAT_RE);
    const timezone: string | undefined = matches?.groups?.timezone;
    const timezoneMilliseconds: number =
      (timezone && DateExt.#parseISOTimezone(timezone)) ||
      DateExt.#getLocaleTimezoneOffsetMilliseconds();
    // We have a valid ISO date

    // Set internal date
    this.#date = new Date(
      timezone && locale ? isoString.replace(timezone, "") : isoString
    );
    // Set whether we're a locale
    this.#locale = locale;
    // Set the original string for reuse
    this.#originISOString = isoString;
    // Set milliseconds of offset
    this.#timezoneOffsetMilliseconds = timezoneMilliseconds;
  }

  getTimezones(): Array<Timezone> {
    return TIMEZONES.filter((tz) => {
      const tz_ms = DateExt.#parseISOTimezone(tz.offset);
      return tz_ms === this.#timezoneOffsetMilliseconds;
    });
  }

  /**
   * @summary We are keeping this method but because we now can edit it as if it was a locale
   * time, we can use all the normal locale getters and then append the known timezone back in.
   *
   * @returns The known date with the timezone
   */
  toISOString(): string {
    return `${this.#date.getFullYear()}-${(
      this.#date.getMonth() + 1
    ).padStart()}-${this.#date.getDate().padStart()}T${this.#date
      .getHours()
      .padStart()}:${this.#date.getMinutes().padStart()}:${this.#date
      .getSeconds()
      .padStart()}.${this.#date
      .getMilliseconds()
      .padStart(3)}${DateExt.#convertMillisecondTimezoneOffsetToISOFormat(
      this.#timezoneOffsetMilliseconds
    )}`;
  }

  /**
   * Only current locale is used.
   */
  toLocaleString(): string {
    return this.#date.toLocaleString();
  }

  // -- Native UTC JavaScript Date Utility Code ---------------------------------------------------

  /**
   * Sets the numeric day of the month in the Date object using Universal Coordinated Time (UTC).
   *
   * @param date A numeric value equal to the day of the month.
   *
   * @description UTC setter methods can be used unless we are an explicit locale date. Locale dates
   * have no use of UTC, for the interpretation of "universal" or "standard" time is based on the local
   * interpretation of the ISO 8601 string given.
   * @throws Error when trying to access method on an explicit locale date
   */
  setUTCDate(date: number): number {
    if (this.#locale)
      throw Error("Cannot access UTC setter in an explicit locale date");
    return this.#date.setUTCDate(date);
  }
  /**
   * Sets the year value in the Date object using Universal Coordinated Time (UTC).
   *
   * @param year A numeric value equal to the year.
   * @param month A numeric value equal to the month. The value for January is 0, and other month values
   * follow consecutively. Must be supplied if numDate is supplied.
   * @param date A numeric value equal to the day of the month.
   *
   * @description UTC setter methods can be used unless we are an explicit locale date. Locale dates
   * have no use of UTC, for the interpretation of "universal" or "standard" time is based on the local
   * interpretation of the ISO 8601 string given.
   * @throws Error when trying to access method on an explicit locale date
   */
  setUTCFullYear(
    year: number,
    month?: number | undefined,
    date?: number | undefined
  ): number {
    if (this.#locale)
      throw Error("Cannot access UTC setter in an explicit locale date");
    return this.#date.setUTCFullYear(year, month, date);
  }
  /**
   * Sets the hours value in the Date object using Universal Coordinated Time (UTC).
   *
   * @param hours A numeric value equal to the hours value.
   * @param min A numeric value equal to the minutes value.
   * @param sec A numeric value equal to the seconds value.
   * @param ms A numeric value equal to the milliseconds value.
   *
   * @description UTC setter methods can be used unless we are an explicit locale date. Locale dates
   * have no use of UTC, for the interpretation of "universal" or "standard" time is based on the local
   * interpretation of the ISO 8601 string given.
   * @throws Error when trying to access method on an explicit locale date
   */
  setUTCHours(
    hours: number,
    min?: number | undefined,
    sec?: number | undefined,
    ms?: number | undefined
  ): number {
    if (this.#locale)
      throw Error("Cannot access UTC setter in an explicit locale date");
    return this.#date.setUTCHours(hours, min, sec, ms);
  }
  /**
   * Sets the milliseconds value in the Date object using Universal Coordinated Time (UTC).
   *
   * @param ms A numeric value equal to the millisecond value.
   *
   * @description UTC setter methods can be used unless we are an explicit locale date. Locale dates
   * have no use of UTC, for the interpretation of "universal" or "standard" time is based on the local
   * interpretation of the ISO 8601 string given.
   * @throws Error when trying to access method on an explicit locale date
   */
  setUTCMilliseconds(ms: number): number {
    if (this.#locale)
      throw Error("Cannot access UTC setter in an explicit locale date");
    return this.#date.setUTCMilliseconds(ms);
  }
  /**
   * Sets the minutes value in the Date object using Universal Coordinated Time (UTC).
   *
   * @param min A numeric value equal to the minutes value.
   * @param sec A numeric value equal to the seconds value.
   * @param ms A numeric value equal to the milliseconds value.
   *
   * @description UTC setter methods can be used unless we are an explicit locale date. Locale dates
   * have no use of UTC, for the interpretation of "universal" or "standard" time is based on the local
   * interpretation of the ISO 8601 string given.
   * @throws Error when trying to access method on an explicit locale date
   */
  setUTCMinutes(
    min: number,
    sec?: number | undefined,
    ms?: number | undefined
  ): number {
    if (this.#locale)
      throw Error("Cannot access UTC setter in an explicit locale date");
    return this.#date.setUTCMinutes(min, sec, ms);
  }
  /**
   * Sets the month value in the Date object using Universal Coordinated Time (UTC).
   *
   * @param month A numeric value equal to the month. The value for January is 0, and other month values
   * follow consecutively.
   * @param date A numeric value representing the day of the month. If it is not supplied, the value from
   * a call to the getUTCDate method is used.
   *
   * @description UTC setter methods can be used unless we are an explicit locale date. Locale dates
   * have no use of UTC, for the interpretation of "universal" or "standard" time is based on the local
   * interpretation of the ISO 8601 string given.
   * @throws Error when trying to access method on an explicit locale date
   */
  setUTCMonth(month: number, date?: number | undefined): number {
    if (this.#locale)
      throw Error("Cannot access UTC setter in an explicit locale date");
    return this.#date.setUTCMonth(month, date);
  }
  /**
   * Sets the seconds value in the Date object using Universal Coordinated Time (UTC).
   *
   * @param sec A numeric value equal to the seconds value.
   * @param ms A numeric value equal to the milliseconds value.
   *
   * @description UTC setter methods can be used unless we are an explicit locale date. Locale dates
   * have no use of UTC, for the interpretation of "universal" or "standard" time is based on the local
   * interpretation of the ISO 8601 string given.
   * @throws Error when trying to access method on an explicit locale date
   */
  setUTCSeconds(sec: number, ms?: number | undefined): number {
    if (this.#locale)
      throw Error("Cannot access UTC setter in an explicit locale date");
    return this.#date.setUTCSeconds(sec, ms);
  }

  // ----------------------------------------------------------------------------------------------
  /**
   * UTC is not relevant to this extension, but the functionality is kept.
   *
   * @deprecated
   */
  getUTCDate(): number {
    const date = new Date(this.#originISOString);
    return date.getUTCDate();
  }
  /**
   * UTC is not relevant to this extension, but the functionality is kept.
   *
   * @deprecated
   */
  getUTCDay(): number {
    const date = new Date(this.#originISOString);
    return date.getUTCDay();
  }
  /**
   * UTC is not relevant to this extension, but the functionality is kept.
   *
   * @deprecated
   */
  getUTCFullYear(): number {
    const date = new Date(this.#originISOString);
    return date.getUTCFullYear();
  }
  /**
   * UTC is not relevant to this extension, but the functionality is kept.
   *
   * @deprecated
   */
  getUTCHours(): number {
    const date = new Date(this.#originISOString);
    return date.getUTCHours();
  }
  /**
   * UTC is not relevant to this extension, but the functionality is kept.
   *
   * @deprecated
   */
  getUTCMilliseconds(): number {
    const date = new Date(this.#originISOString);
    return date.getUTCMilliseconds();
  }
  /**
   * UTC is not relevant to this extension, but the functionality is kept.
   *
   * @deprecated
   */
  getUTCMinutes(): number {
    const date = new Date(this.#originISOString);
    return date.getUTCMinutes();
  }
  /**
   * UTC is not relevant to this extension, but the functionality is kept.
   *
   * @deprecated
   */
  getUTCMonth(): number {
    const date = new Date(this.#originISOString);
    return date.getUTCMonth();
  }
  /**
   * UTC is not relevant to this extension, but the functionality is kept.
   *
   * @deprecated
   */
  getUTCSeconds(): number {
    const date = new Date(this.#originISOString);
    return date.getUTCSeconds();
  }
  /**
   * UTC is not relevant to this extension, but the functionality is kept.
   *
   * @deprecated
   */
  toDateString(): string {
    const date = new Date(this.#originISOString);
    return date.toDateString();
  }
  /**
   * UTC is not relevant to this extension, but the functionality is kept.
   *
   * @deprecated
   */
  toUTCString(): string {
    const date = new Date(this.#originISOString);
    return date.toUTCString();
  }
  // ----------------------------------------------------------------------------------------------
}

export { DateExt };
