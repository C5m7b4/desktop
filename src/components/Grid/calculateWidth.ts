import { TableHeader } from "../../interfaces/Grid";
import { Box } from "../../utils/Box";

export function calculateWidth<T>(
  column: TableHeader<T>,
  columns: TableHeader<T>[],
  tableWidth: number,
  scrollbarWidth: number,
  includedColumns: TableHeader<T>[]
) {
  if (column.width) {
    return column.width;
  }
  const usedWidth =
    Box(columns)
      .map((x: TableHeader<T>[]) =>
        x.filter((c) => c.columnName != column.columnName)
      )
      .map((x: TableHeader<T>[]) =>
        x.filter((c) => hasRecord(includedColumns, c))
      )
      .map((x: TableHeader<T>[]) =>
        x.reduce((acc, cur) => {
          const width = cur.width || 0;
          return acc + width;
        }, 0)
      )
      .fold((x: number) => x) + scrollbarWidth;
  return tableWidth - usedWidth;
}

const hasRecord = <T>(
  includedColumns: TableHeader<T>[],
  column: TableHeader<T>
) => {
  return (
    includedColumns.filter((c) => c.columnName === column.columnName).length > 0
  );
};
