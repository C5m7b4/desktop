import { TableHeader } from "../../interfaces/Grid";
import { Box } from "../../utils/Box";

export function calculateWidth<T>(
  column: TableHeader<T>,
  columns: TableHeader<T>[],
  tableWidth: number,
  scrollbarWidth: number
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
        x.reduce((acc, cur) => {
          const width = cur.width || 0;
          return acc + width;
        }, 0)
      )
      .fold((x: number) => x) + scrollbarWidth;
  return tableWidth - usedWidth;
}
