/**
 * DateTime Regular Expression
 */
const DATE_TIME_FORMAT_RE =
  /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{1,6})?(?<timezone>(?:Z|(?:[-\+]\d{2}:\d{2})))?$/;

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
function padEnd(maxLength: number = 2, fillString: string = "0"): string {
  // @ts-ignore
  const stringifiedNumber: string = this.toString();
  return stringifiedNumber.padEnd(maxLength, fillString);
}

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
function padStart(maxLength: number = 2, fillString: string = "0"): string {
  // @ts-ignore
  const stringifiedNumber: string = this.toString();
  return stringifiedNumber.padStart(maxLength, fillString);
}

export { DATE_TIME_FORMAT_RE, padEnd, padStart };
