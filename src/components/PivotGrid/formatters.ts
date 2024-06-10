import { pad } from "../../utils/pad";

export function formatNumber(input: string, numberOfDecimals: number = 2) {
  const periodPosition = input.indexOf(".");
  const left = input.substring(0, periodPosition);
  const right = input.substr(periodPosition);
  return (
    left +
    "." +
    Number(pad(right, numberOfDecimals, "0", "left")).toFixed(numberOfDecimals)
  );
}

export function formatCurrency(input: string, numberOfDecimals: number = 2) {
  const periodPosition = input.indexOf(".");
  const left = input.substring(0, periodPosition);
  const right = input.substr(periodPosition);
  return (
    "$" +
    left +
    "." +
    Number(pad(right, numberOfDecimals, "0", "left")).toFixed(numberOfDecimals)
  );
}
