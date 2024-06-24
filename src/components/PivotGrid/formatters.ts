import { pad } from "../../utils/pad";

export type INumberFormatter = (i: string, n: number) => string;
export type IFormatter = INumberFormatter | null;

export function formatNumber(input: string, numberOfDecimals: number = 2) {
  const periodPosition = input.toString().indexOf(".");
  if (periodPosition < 0) {
    if (numberOfDecimals === 0) {
      return input;
    }
    return input + "." + pad("", numberOfDecimals, "0", "left");
  }
  const left = input.toString().substring(0, periodPosition);
  const right = input.toString().substr(periodPosition + 1);
  if (numberOfDecimals === 0) {
    return left;
  }
  return left + "." + pad(right, numberOfDecimals, "0", "left");
}

export function formatCurrency(input: string, numberOfDecimals: number = 2) {
  const periodPosition = input.toString().indexOf(".");
  if (periodPosition < 0) {
    return "$" + input + "." + pad("", numberOfDecimals, "0", "left");
  }
  const left = input.toString().substring(0, periodPosition);
  let right = input.toString().substr(periodPosition + 1);
  if (right.length > numberOfDecimals) {
    right = right.substring(0, numberOfDecimals);
  }
  if (numberOfDecimals === 0) {
    return "$" + left;
  }
  const result = "$" + left + "." + pad(right, numberOfDecimals, "0", "left");
  return result;
}
