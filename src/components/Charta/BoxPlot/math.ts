const asc = (data: number[]) =>
  data.sort((a, b) => {
    if (a > b) {
      return 1;
    }
    if (a < b) {
      return -1;
    }
    return 0;
  });

const desc = (data: number[]) =>
  data.sort((a, b) => {
    if (a < b) {
      return 1;
    }
    if (a > b) {
      return -1;
    }
    return 0;
  });

const sum = (data: number[]) => data.reduce((a, c) => a + c, 0);

const max = (data: number[]) => data.reduce((a, c) => (a > c ? a : c), 0);

const min = (data: number[]) =>
  data.reduce((a, c) => (a < c ? a : c), 99999999);

const mean = (data: number[]) => sum(data) / data.length;

const range = (data: number[]) => max(data) - min(data);

const median = (data: number[]) => {
  const sorted = asc([...data]);
  const half = Math.floor(sorted.length / 2);
  return sorted.length % 2
    ? sorted[half]
    : (sorted[half - 1] + sorted[half]) / 2;
};

const quartile = (data: number[], percent: number) => {
  const sorted = asc([...data]);
  let pos = (sorted.length - 1) * percent;
  if (pos % 1 === 0) {
    return sorted[pos];
  }

  pos = percent > 0.5 ? Math.ceil(pos) : Math.floor(pos);
  if (sorted[pos + 1] !== undefined && sorted.length - (1 % 2) === 0) {
    return (sorted[pos] + sorted[pos + 1]) / 2;
  }

  return sorted[pos];
};

const IQR = (data: number[]) => {
  return quartile(data, 0.75) - quartile(data, 0.25);
};

const Outliers = (data: number[]) => {
  const iqr = IQR(data);
  const maxValuetoQualify = quartile(data, 0.75) + 1.5 * iqr;
  const minValuetoQualify = quartile(data, 0.25) - 1.5 * iqr;
  const newarray: number[] = [];
  data.map((v) =>
    v > maxValuetoQualify || v < minValuetoQualify ? newarray.push(v) : null
  );
  return newarray;
};

const maxWithoutOutliers = (data: number[]) => {
  const outliers = Outliers(data);
  return data.reduce((a, c) => {
    return outliers.includes(c) ? a : a > c ? a : c;
  }, 0);
};

const minWithoutOutliers = (data: number[]) => {
  const outliers = Outliers(data);
  return data.reduce((a, c) => {
    return outliers.includes(c) ? a : a < c ? a : c;
  }, 999999);
};

export {
  asc,
  desc,
  max,
  min,
  range,
  IQR,
  median,
  mean,
  maxWithoutOutliers,
  minWithoutOutliers,
  quartile,
  Outliers,
};
