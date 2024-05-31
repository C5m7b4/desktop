export const sort = (arr, field) => {
  if (arr.length <= 1) {
    return arr;
  }

  const pivot = arr[0][field];
  const pivotRecord = arr[0];
  const leftArr = [];
  const rightArr = [];

  for (let i = 1; i < arr.length; i++) {
    if (arr[i][field] < pivot) {
      leftArr.push(arr[i]);
    } else {
      rightArr.push(arr[i]);
    }
  }

  return [...sort(leftArr, field), pivotRecord, ...sort(rightArr, field)];
};

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
