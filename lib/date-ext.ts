import { DATE_TIME_FORMAT_RE, padEnd, padStart } from "./utils";

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
class DateExt extends Date {
  /**
   * The timezone offset of the date passed in, in milliseconds, multiplied by -1
   */
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
      /^(?<dir>[-\+])(?<hr>([0-1][0-9]|[2][0-4])):(?<min>[0-5][0-9])$/
    );

    try {
      const { dir, hr, min } = matches?.groups || {};
      if (!(dir && hr && min))
        throw Error("Not all of the timezone offset was provided!");

      /** Have to use the opposite because that shits backwards */
      const oppositeDir = dir === "-" ? "+" : "-";
      return parseInt(
        `${oppositeDir}${
          (parseInt(hr, 10) * 60 + parseInt(min, 10)) * 60 * 1000
        }`,
        10
      );
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
  constructor(date: Date | string = new Date()) {
    /** Get the date as an ISO 8601 standard */
    const isoString: string = date instanceof Date ? date.toISOString() : date;

    DateExt.#testISOString(isoString);
    const matches = isoString.match(DATE_TIME_FORMAT_RE);
    const timezone: string | undefined = matches?.groups?.timezone;
    const timezoneMilliseconds: number =
      (timezone && DateExt.#parseISOTimezone(timezone)) ||
      DateExt.#getLocaleTimezoneOffsetMilliseconds();
    // We have a valid ISO date

    super(timezone ? isoString.replace(timezone, "") : isoString);

    // Set milliseconds of offset
    this.#timezoneOffsetMilliseconds = timezoneMilliseconds;
  }

  /**
   * @summary We are keeping this date as
   * @returns The known date with the timezone
   */
  toISOString(): string {
    return `${this.getFullYear()}-${(
      this.getMonth() + 1
    ).padStart()}-${this.getDate().padStart()}T${this.getHours().padStart()}:${this.getMinutes().padStart()}:${this.getSeconds().padStart()}.${this.getMilliseconds().padStart(
      3
    )}${DateExt.#convertMillisecondTimezoneOffsetToISOFormat(
      this.#timezoneOffsetMilliseconds
    )}`;
  }
}

export { DateExt };
