import { Footer } from "../divs";
import { sort } from "../../../utils/sort";
import { TableHeader } from "../../../interfaces/Grid";

interface Props<T> {
  data: T[];
  activeHeader: keyof T;
  includedHeaders: TableHeader<T>[];
}

function sum<T>(data: T[], column: keyof T) {
  if (!data) return "";
  if (!column) return "";
  const total = data.reduce((acc, cur) => {
    return acc + Number(cur[column]);
  }, 0);
  return isNaN(total) ? "" : total.toFixed(2);
}

function avg<T>(data: T[], column: keyof T) {
  if (!data) return "";
  if (!column) return "";
  const total = data.reduce((acc, cur) => {
    return acc + Number(cur[column]);
  }, 0);
  const result = total / data.length;
  return isNaN(result) ? "" : result.toFixed(2);
}

function min<T>(data: T[], column: keyof T) {
  if (!data) return "";
  if (!column) return "";
  const result = data.reduce((acc, cur) => {
    return Number(cur[column]) < acc ? Number(cur[column]) : acc;
  }, Number.POSITIVE_INFINITY);
  return isNaN(result) ? "" : result;
}

function max<T>(data: T[], column: keyof T) {
  if (!data) return "";
  if (!column) return "";
  const result = data.reduce((acc, cur) => {
    return Number(cur[column]) > acc ? Number(cur[column]) : acc;
  }, 0);
  return isNaN(result) ? "" : result;
}

function median<T>(data: T[], column: keyof T) {
  if (!data) return "";
  if (!column) return "";
  if (data.length === 0) return;
  const sorted = sort([...data], column);
  if (sorted.length % 2 === 0) {
    const v1 = sorted[sorted.length / 2 - 1][column];
    const v2 = sorted[sorted.length / 2 + 1][column];
    const result = (Number(v1) + Number(v2)) / 2;
    return isNaN(result) ? "" : result;
  } else {
    return isNaN(Number(sorted[Math.ceil(sorted.length / 2)][column]))
      ? ""
      : Number(sorted[Math.ceil(sorted.length / 2)][column]);
  }
}

function RenderFooter<T>(props: Props<T>) {
  const { data, activeHeader, includedColumns } = props;

  return (
    <Footer>
      <div>{`rows: ${data.length}`}</div>
      <div> &nbsp;|&nbsp; </div>
      <div>{`columns: ${
        data && data.length
          ? `${includedColumns.length}/${Object.keys(data[0]).length}`
          : "0"
      }`}</div>
      <div> &nbsp;|&nbsp; </div>
      <div>{`sum: ${sum(data, activeHeader)}`}</div>
      <div> &nbsp;|&nbsp; </div>
      <div>{`avg: ${avg(data, activeHeader)}`}</div>
      <div> &nbsp;|&nbsp; </div>
      <div>{`min: ${min(data, activeHeader)}`}</div>
      <div> &nbsp;|&nbsp; </div>
      <div>{`max: ${max(data, activeHeader)}`}</div>
      <div> &nbsp;|&nbsp; </div>
      <div>{`median: ${median(data, activeHeader)}`}</div>
    </Footer>
  );
}

export default RenderFooter;
