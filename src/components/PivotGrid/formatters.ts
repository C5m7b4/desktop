import { pad } from "../../utils/pad";

export type INumberFormatter = (i: string, n: number) => string;
export type IFormatter = INumberFormatter | null;

export function formatNumber(input: string, numberOfDecimals: number = 2) {
  const periodPosition = input.toString().indexOf(".");
  if (periodPosition < 0) {
    return input + "." + pad("", numberOfDecimals, "0", "left");
  }
  const left = input.toString().substring(0, periodPosition);
  const right = input.toString().substr(periodPosition + 1);
  return left + "." + pad(right, numberOfDecimals, "0", "left");
}

export function formatCurrency(input: string, numberOfDecimals: number = 2) {
  const periodPosition = input.toString().indexOf(".");
  if (periodPosition < 0) {
    return "$" + input + "." + pad("", numberOfDecimals, "0", "left");
  }
  const left = input.toString().substring(0, periodPosition);
  const right = input.toString().substr(periodPosition + 1);
  return "$" + left + "." + pad(right, numberOfDecimals, "0", "left");
}
