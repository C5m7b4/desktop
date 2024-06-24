// import { Renderers } from "../utils/renderers";

export enum ColumnAlignment {
  left,
  center,
  right,
}

// export type CustomRenderers<T> = Partial<
//   Record<keyof T, (it: T) => React.ReactNode>
// >;

export type TableHeaderEditor = "text" | "number" | "data" | "time" | "color";

export type CustomRenderer<T> = {
  row: T;
  key: keyof T;
  value: T[keyof T];
};

export type TableHeader<T> = {
  title: string;
  columnName: keyof T;
  width?: number;
  align: ColumnAlignment;
  sortable?: "asc" | "desc" | false;
  visible?: boolean;
  filterable?: boolean;
  editor?: TableHeaderEditor;
  renderer?: (e: CustomRenderer<T>) => React.ReactNode;
};

export interface TableProps<T> {
  data: T[];
  columns: TableHeader<T>[];
  _uid: string;
}
