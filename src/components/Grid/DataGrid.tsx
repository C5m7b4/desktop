import { useState, useEffect, useRef, useCallback } from "react";
import { TableHeader, TableProps } from "../../interfaces/Grid";
import styled, { useTheme } from "styled-components";
import { Table, Tr, Td } from "./divs";
import RenderHeader from "./header/RenderHeader";
import { debounce } from "../../utils/utils";
import { calculateWidth } from "./calculateWidth";
import RenderFooter from "./footer/RenderFooter";

const Div = styled.div<{ $height: number }>`
  font-size: ${(props) => props.theme.fontSizes.normal};
  overflow: hidden;
  height: ${(props) => props.$height}px;
`;

export type RowFilterConfiguration<T> = {
  column: keyof T | null;
  value: string[];
};

function DataGrid<T extends {}>(props: TableProps<T>) {
  const [height, setHeight] = useState(0);
  const [tableWidth, setTableWidth] = useState(0);
  const [filteredData, setFilteredData] = useState<T[]>([]);
  const [headersActive, setHeadersActive] = useState(false);
  const [activeHeader, setActiveHeader] = useState<TableHeader<T> | {}>({});
  const [includedColumns, setIncludedColumns] = useState<TableHeader<T>[]>([]);
  const [columns, setColumns] = useState<TableHeader<T>[]>(props.columns);
  const [rowFilterConfiguration, setRowFilterConfiguration] = useState<
    RowFilterConfiguration<T>
  >({ column: null, value: [] });
  const theme = useTheme();

  //refs
  const windowRef = useRef<HTMLDivElement>(null);
  const tableRef = useRef<HTMLTableElement>(null);
  const tBodyRef = useRef<HTMLTableSectionElement>(null);
  const resizeRef = useRef();

  useEffect(() => {
    setFilteredData(props.data);
    // determine the height after we draw the title of the window
    if (windowRef.current) {
      resizeRef.current = new ResizeObserver(
        debounce(resizeHandler, 500)
      ).observe(windowRef.current);
    }
    const newColumnArray = columns.map((column) => column);
    setIncludedColumns(newColumnArray);

    return () => {};
  }, [theme.window.windowHeaderHeight, props.data]);

  useEffect(() => {
    if (rowFilterConfiguration.value.length > 0) {
      const filtered = props.data.filter(filterPredicate);
      setFilteredData(filtered);
    }
  }, [rowFilterConfiguration]);

  useEffect(() => {
    buildComponent();
  }, [columns]);

  const columnsInclude = (row: T, columnName: keyof T, value: string[]) => {
    return value.includes(row[columnName] as string);
  };

  const filterPredicate = (row: T) => {
    return columnsInclude(
      row,
      rowFilterConfiguration.column as keyof T,
      rowFilterConfiguration.value
    );
  };

  const resizeHandler = useCallback(() => {
    buildComponent();
  }, [columns]);

  const includes = (v: string) => {
    const index = includedColumns.findIndex(
      (c) =>
        c.columnName.toString().toLowerCase() === v.toString().toLowerCase()
    );
    return index >= 0;
  };

  const buildComponent = () => {
    console.log("building component");
    if (windowRef.current && tableRef.current) {
      const windowDimensions =
        windowRef.current.parentElement?.parentElement?.parentElement?.getBoundingClientRect();
      if (windowDimensions) {
        const panelHeight =
          windowDimensions.height - theme.window.windowHeaderHeight;
        setHeight(panelHeight);
        tableRef.current.style.height = `${
          panelHeight - theme.window.windowHeaderHeight
        }px`;
      }

      const box = tableRef.current.getBoundingClientRect();
      setTableWidth(box.width);
    }

    return buildTable();
  };

  // const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
  //   e.preventDefault();
  //   e.currentTarget.style.border = "2px solid black";
  //   e.dataTransfer.dropEffect = "move";
  // };

  // const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
  //   // @ts-expect-error cannot be null
  //   e.currentTarget.style.border = null;
  // };

  // const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
  //   e.currentTarget.classList.remove("dragging");
  //   const columnName = e.dataTransfer.getData("columnName");
  //   console.log("columnName", columnName);
  // };

  const buildTable = () => {
    return (
      <Table ref={tableRef}>
        <thead>
          <tr
            style={{ display: "flex" }}
            // onDragOver={handleDragOver}
            // onDrop={handleDrop}
            // onDragLeave={handleDragLeave}
          >
            {columns
              .filter((c) => includes(c.columnName as string))
              .map((column, i) => (
                <RenderHeader
                  _uuid={props._uid}
                  key={`rh-${i}`}
                  column={column}
                  i={i}
                  columns={columns}
                  setColumns={setColumns}
                  tableWidth={tableWidth}
                  scrollbarWidth={theme.scrollbar.width}
                  headersActive={headersActive}
                  activeHeader={activeHeader}
                  setHeadersActive={setHeadersActive}
                  setActiveHeader={setActiveHeader}
                  data={props.data}
                  setData={setFilteredData}
                  setIncludedColumns={setIncludedColumns}
                  includedColumns={includedColumns}
                  setRowFilterConfiguration={setRowFilterConfiguration}
                />
              ))}
          </tr>
        </thead>
        {renderTbody()}
      </Table>
    );
  };

  const renderTbody = () => {
    if (tableRef.current) {
      const tableHeader = tableRef.current.querySelector("thead");
      const tBody = tableRef.current.querySelector("tbody");
      const tableBox = tableHeader?.getBoundingClientRect();
      const windowBox = windowRef.current?.getBoundingClientRect();
      // now that we know the height of the rendered header, we can
      // figure out how tall the actual body of the table needs to be
      if (tBody && tableBox && windowBox) {
        const tBodyHeight = `${
          windowBox.height - tableBox.height - theme.windowFooterHeight
        }px`;
        tBody.style.height = tBodyHeight;
      }
    }
    return (
      <tbody ref={tBodyRef}>
        {filteredData.map(renderRow)}
        <tr>
          <td>&nbsp;</td>
        </tr>
      </tbody>
    );
  };

  const reorder = (item: T) => {
    const newItem = {};
    columns.map((c) => {
      newItem[c.columnName] = item[c.columnName];
    });
    return newItem as T;
  };

  const renderRow = (item: T, i: number) => {
    item = reorder(item);
    return (
      <Tr key={`table-tbody-tr-${i}`}>
        {Object.keys(item)
          .filter((c) => includes(c as string))
          .map((key, i: number) => {
            const column = columns.filter(
              (c) =>
                c.columnName.toString().toLowerCase() ===
                key.toString().toLowerCase()
            )[0];
            return (
              <Td
                key={`table-tbody=tr-td-${i}`}
                $width={calculateWidth(
                  column,
                  columns,
                  tableWidth,
                  theme.scrollbar.width
                )}
                $align={column.align}
              >
                {column.renderer ? column.renderer(item[key]) : item[key]}
              </Td>
            );
          })}
      </Tr>
    );
  };

  return (
    <Div ref={windowRef} $height={height}>
      {buildTable()}
      <RenderFooter
        data={filteredData}
        activeHeader={(activeHeader as TableHeader<T>).columnName}
      />
    </Div>
  );
}

export default DataGrid;
