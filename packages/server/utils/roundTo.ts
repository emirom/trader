export const roundTo2 = (number: number) =>
  Math.round(number * 100 + Number.EPSILON) / 100;

export const roundTo1 = (number: number) =>
  Math.round(number * 10 + Number.EPSILON) / 10;

/**
 * Round to at most 2 decimal places (only if necessary)
 * @param number the number to be rounded
 * @param places decimal places to be rounded at.
 * to ensure things like 1.005 round correctly, use + Number.EPSILON
 */

export const roundTo = (number: number, places: number) =>
  Math.round(number * 10 ** places + Number.EPSILON) / 10 ** places;
