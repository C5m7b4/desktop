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
