export function doesRowExist<T>(arr: T[], field: keyof T, value: string) {
  let i = 0;
  for (const el of arr) {
    if (el[field] == value) {
      return {
        found: true,
        record: el,
        index: i,
      };
    }
    i++;
  }
  return {
    found: false,
  };
}

export function arrSum<T>(
  arr: T[],
  lookupField: keyof T,
  lookupValue: string,
  valueField: keyof T
) {
  return arr.reduce((acc, cur) => {
    if (cur[lookupField] === lookupValue) {
      return acc + Number(cur[valueField]);
    } else {
      return acc;
    }
  }, 0);
}

export function arrCount<T>(
  arr: T[],
  lookupField: keyof T,
  lookupValue: string
) {
  return arr.reduce((acc, cur) => {
    if (cur[lookupField] === lookupValue) {
      return acc + 1;
    } else {
      return acc;
    }
  }, 0);
}

export function arrAvg<T>(
  arr: T[],
  lookupField: keyof T,
  lookupValue: string,
  valueField: string
) {
  let itemCount = 0;
  const total = arr.reduce((acc, cur) => {
    if (cur[lookupField] === lookupValue) {
      itemCount++;
      return acc + Number(cur[valueField]);
    } else {
      return acc;
    }
  }, 0);
  return total / itemCount;
}

export const aggregateOptions = [
  {
    fn: arrSum,
    label: "Sum",
  },
  {
    fn: arrCount,
    label: "Count",
  },
  {
    fn: arrAvg,
    label: "Avg",
  },
];

export function grandTotalCount<T>(arr: T[]) {
  return arr.reduce((acc) => {
    return acc + 1;
  }, 0);
}

export function grandTotalSum<T>(arr: T[], lookupField: keyof T) {
  const total = arr.reduce((acc, cur) => {
    return acc + Number(cur[lookupField]);
  }, 0);
  return total;
}

export function groupFn<T extends {}>(arr: T[], fields: Array<keyof T>) {
  if (fields.length === 0) return arr;
  if (!Array.isArray(arr)) return arr;

  const result = arr.reduce((acc: T[], item: T) => {
    const trigger = item[fields[0]];
    if (!acc[trigger]) {
      acc[trigger] = [];
    }

    acc[trigger].push(item);
    return acc;
  }, []);
  const fieldCopy = [...fields];
  fieldCopy.splice(0, 1);
  fieldCopy.sort();
  fieldCopy.map(() => {
    Object.keys(result).map((key: string) => {
      const innerResults = groupFn(result[key], fieldCopy);
      if (Array.isArray(innerResults)) {
        innerResults.sort();
      }
      Object.keys(innerResults).map((inner, i) => {
        if (i === 0) {
          const originalData = result[key];
          result[key] = {};
          result[key]["data"] = originalData;
        }

        result[key][inner] = innerResults[inner];
      });
    });
  });

  return result;
}
