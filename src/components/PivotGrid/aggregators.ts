import { sort } from "../../utils/sort";

export function pivotSum<T>(arr: T[], key: keyof T) {
  const result = arr.reduce((acc, cur) => {
    return acc + Number(cur[key]);
  }, 0);
  return result;
}

export function pivotCount<T>(arr: T[]) {
  const result = arr.reduce((acc) => {
    return acc + 1;
  }, 0);
  return result;
}

export function pivotMax<T>(arr: T[], key: keyof T) {
  return arr.reduce((acc, cur): number => {
    return acc > Number(cur[key]) ? acc : Number(cur[key]);
  }, 0);
}

export function pivotMin<T>(arr: T[], key: keyof T) {
  return arr.reduce((acc, cur): number => {
    return acc > Number(cur[key]) ? Number(cur[key]) : acc;
  }, Number.POSITIVE_INFINITY);
}

export function pivotMean<T>(arr: T[], key: keyof T) {
  const sum = arr.reduce((acc, cur) => {
    return acc + Number(cur[key]);
  }, 0);
  return sum / arr.length;
}

export function pivotMedian<T>(arr: T[], key: keyof T) {
  // in order for this to work, the array needs to be sorted first
  const copy = sort(arr, key);
  if (arr.length % 2 === 0) {
    // there are an even amount of rows so we need to take both of these
    // add them togethere and divide by two
    const one = copy[arr.length / 2] as number;
    const two = copy[arr.length / 2 + 1] as number;
    const sum = one + two;
    return sum / 2;
  } else {
    // there are an odd number of rows so we can just take the middle one
    return copy[arr.length];
  }
}
export const aggregateOptions = [
  {
    fn: pivotSum,
    label: "Sum",
  },
  {
    fn: pivotCount,
    label: "Count",
  },
  {
    fn: pivotMean,
    label: "Avg",
  },
  {
    fn: pivotMin,
    label: "Min",
  },
  {
    fn: pivotMax,
    label: "Max",
  },
  {
    fn: pivotMedian,
    label: "Median",
  },
];
