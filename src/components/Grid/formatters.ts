export type MoneyInput = string | number;

export type IsValidType = number | string | Date | Object;

export const isValid = (v: IsValidType) => {
  if (typeof v === "undefined") return false;
  if (v === null) return false;

  if (typeof v === "string") {
    if (v.length === 0) return false;
  }

  if (typeof v === "object") {
    if (Object.keys(v).length === 0) return false;
  }

  if (typeof v === "number") {
    if (v === 0) return false;
  }

  return true;
};

export const formatMoney = (input: MoneyInput): string => {
  if (!isValid(input)) return "0";
  input = input.toString();
  const pos = input.indexOf(".");
  if (pos < 0) {
    return `$${input}.00`;
  }
  const left = input.substring(0, pos);
  let right = input.substring(pos + 1);
  if (right.length === 1) {
    right = right + "0";
  }
  if (left.length === 0) {
    return `.${right}`;
  }
  return `$${left}.${right}`;
};

export const formatNumber = (input: MoneyInput): string => {
  if (!isValid(input)) return "0";
  input = input.toString();
  const pos = input.indexOf(".");
  if (pos < 0) {
    return `${input}.00`;
  }
  const left = input.substring(0, pos);
  let right = input.substring(pos + 1);
  if (right.length === 1) {
    right = right + "0";
  }
  if (left.length === 0) {
    return `.${right}`;
  }
  return `${left}.${right}`;
};
