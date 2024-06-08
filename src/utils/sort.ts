export type SortDirection = "asc" | "desc";

export function sort<T>(
  arr: T[],
  field: keyof T,
  direction: SortDirection = "asc"
): T[] {
  if (arr.length <= 1) {
    return arr;
  }

  const pivot = arr[0][field];
  const pivotRecord = arr[0];
  const leftArr = [];
  const rightArr = [];

  for (let i = 1; i < arr.length; i++) {
    if (direction === "asc") {
      if (arr[i][field] < pivot) {
        leftArr.push(arr[i]);
      } else {
        rightArr.push(arr[i]);
      }
    } else {
      if (arr[i][field] > pivot) {
        leftArr.push(arr[i]);
      } else {
        rightArr.push(arr[i]);
      }
    }
  }

  return [
    ...sort(leftArr, field, direction),
    pivotRecord,
    ...sort(rightArr, field, direction),
  ];
}

export const sortInts = (arr) => {
  if (arr.length <= 1) {
    return arr;
  }

  const pivot = arr[0];
  const pivotRecord = arr[0];
  const leftArr = [];
  const rightArr = [];

  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < pivot) {
      leftArr.push(arr[i]);
    } else {
      rightArr.push(arr[i]);
    }
  }

  return [...sortInts(leftArr), pivotRecord, ...sortInts(rightArr)];
};
