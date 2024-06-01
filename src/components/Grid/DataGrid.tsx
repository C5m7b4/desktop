import { useState, useEffect, useRef, useCallback } from "react";
import { TableHeader, TableProps } from "../../interfaces/Grid";
import styled, { useTheme } from "styled-components";
import { Table, Th, Td, Footer } from "./divs";
import { Box } from "../../utils/Box";
import { debounce } from "../../utils/utils";

const Div = styled.div<{ $height: number }>`
  font-size: ${(props) => props.theme.fontSizes.normal};
  overflow: hidden;
  height: ${(props) => props.$height}px;
`;

function DataGrid<T>(props: TableProps<T>) {
  const [height, setHeight] = useState(0);
  const [tableWidth, setTableWidth] = useState(0);
  const [filteredData, setFilteredData] = useState<T[]>([]);
  const theme = useTheme();

  //refs
  const windowRef = useRef<HTMLDivElement>(null);
  const componentRef = useRef<HTMLDivElement>(null);
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

    return () => {};
  }, [theme.window.windowHeaderHeight, props.data]);

  const resizeHandler = useCallback(() => {
    buildComponent();
  }, []);

  const buildComponent = () => {
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

  const calculateWidth = (column: TableHeader<T>) => {
    if (column.width) {
      return column.width;
    }
    const usedWidth = Box(props.columns)
      .map((x: TableHeader<T>[]) =>
        x.filter((c) => c.columnName != column.columnName)
      )
      .map((x: TableHeader<T>[]) =>
        x.reduce((acc, cur) => {
          const width = cur.width || 0;
          return acc + width;
        }, 0)
      )
      .fold((x: number) => x);
    return tableWidth - usedWidth;
  };

  const buildTable = () => {
    return (
      <Table ref={tableRef}>
        <thead>
          <tr>{props.columns.map(renderHeader)}</tr>
        </thead>
        {renderTbody()}
      </Table>
    );
  };

  const renderHeader = (column: TableHeader<T>, i: number) => {
    const { title, visible = true } = column;
    if (!visible === false) {
      return (
        <Th
          key={`th-tr-${i}`}
          $width={calculateWidth(column)}
          $align={column.align}
        >
          {title}
        </Th>
      );
    }
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

  const renderRow = (item: T, i: number) => {
    return (
      <tr key={`table-tbody-tr-${i}`}>
        {Object.keys(item).map((key, i) => {
          const column = props.columns.filter(
            (c) =>
              c.columnName.toString().toLowerCase() ===
              key.toString().toLowerCase()
          )[0];
          return (
            <Td
              key={`table-tbody=tr-td-${i}`}
              $width={calculateWidth(column)}
              $align={column.align}
            >
              {item[key]}
            </Td>
          );
        })}
      </tr>
    );
  };

  return (
    <Div ref={windowRef} $height={height}>
      {buildTable()}
      <Footer>here is something</Footer>
    </Div>
  );
}

export default DataGrid;
