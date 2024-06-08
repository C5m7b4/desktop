import { useState, useRef, useCallback } from "react";
import { TableHeader } from "../../../interfaces/Grid";
import { Th } from "../divs";
import { calculateWidth } from "../calculateWidth";
import { useTheme } from "styled-components";
import { RowResizer } from "../divs";
import { DownIcon } from "../../../svgs/DownIcon";
import HeaderContextMenu from "./HeaderContextMenu";
import { RowFilterConfiguration } from "../DataGrid";

interface Props<T> {
  column: TableHeader<T>;
  i: number;
  columns: TableHeader<T>[];
  tableWidth: number;
  scrollbarWidth: number;
  headersActive: boolean;
  activeHeader: TableHeader<T> | {};
  setHeadersActive: (b: boolean) => void;
  setActiveHeader: (h: TableHeader<T>) => void;
  data: T[];
  setData: (d: T[]) => void;
  setIncludedColumns: (c: TableHeader<T>[]) => void;
  includedColumns: TableHeader<T>[];
  setRowFilterConfiguration: (c: RowFilterConfiguration<T>) => void;
}

function RenderHeader<T>(props: Props<T>) {
  const [showHeaderContextMenu, setShowHeaderContextMenu] = useState(false);
  const [points, setPoints] = useState({
    x: 0,
    y: 0,
  });
  const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });
  const {
    column,
    columns,
    tableWidth,
    scrollbarWidth,
    headersActive,
    activeHeader,
    setHeadersActive,
    setActiveHeader,
    i,
    setIncludedColumns,
    includedColumns,
    setRowFilterConfiguration,
    setData,
  } = props;

  const menuRef = useRef<HTMLDivElement>(null);
  const thRef = useRef<HTMLTableHeaderCellElement>(null);
  const resizerRef = useRef<HTMLDivElement>(null);

  const removeListers = useCallback(() => {
    console.log("removing listeners");
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    console.log("mousemove", e);
    const el = resizerRef.current;
    if (el) {
      console.log("el", el);
      const parent = el.parentElement;
      if (parent) {
        console.log("parent", parent);
        const styles = window.getComputedStyle(parent);
        const dx = e.clientX - startPosition.x;
        const newX = `${parseInt(styles.width, 10) + dx}`;
        console.log("newX", newX);
        parent.style.width = `${newX}px`;
      }
    }
  }, []);

  const handleMouseUp = useCallback(() => {
    console.log("mouse up");
    removeListers();
  }, [removeListers]);

  const handleDownClick = (e: React.MouseEvent<SVGSVGElement>) => {
    console.log("down click");
    setPoints({
      x: e.pageX,
      y: e.pageY,
    });

    if (showHeaderContextMenu) {
      if (menuRef.current) {
        menuRef.current.classList.toggle("hide");
        setTimeout(() => {
          setShowHeaderContextMenu(!showHeaderContextMenu);
        }, 350);
      }
    } else {
      setShowHeaderContextMenu(!showHeaderContextMenu);
    }
  };

  const close = () => {
    if (showHeaderContextMenu) {
      setShowHeaderContextMenu(false);
    }
  };

  const handleResizeMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    console.log("resizer clicked - mouse down");
    const el = resizerRef.current;
    if (el) {
      const startPos = {
        x: e.clientX,
        y: e.clientY,
      };
      console.log("startingPos", startPos);
      setStartPosition(startPos);
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }
  };

  const { title, visible = true } = column;
  const theme = useTheme();
  if (!visible === false) {
    return (
      <>
        {showHeaderContextMenu ? (
          <HeaderContextMenu
            close={close}
            isOpen={showHeaderContextMenu}
            x={points.x}
            top={points.y}
            data={props.data}
            column={props.column.columnName}
            gridColumns={props.columns}
            setIncludedColumns={setIncludedColumns}
            includedColumns={includedColumns}
            setRowFilterConfiguration={setRowFilterConfiguration}
            setData={setData}
          />
        ) : null}
        <Th
          key={`th-tr-${i}`}
          ref={thRef}
          $width={calculateWidth(column, columns, tableWidth, scrollbarWidth)}
          $align={column.align}
          $background={
            headersActive &&
            (activeHeader as TableHeader<T>).columnName === column.columnName
              ? theme.colors.table.activeHeader
              : theme.colors.table.excel
          }
        >
          <div
            style={{ padding: "5px 0 5px 0" }}
            onClick={() => {
              setHeadersActive(!headersActive);
              setActiveHeader(column);
            }}
          >
            {title}
          </div>
          {headersActive &&
          (activeHeader as TableHeader<T>).columnName === column.columnName ? (
            <div style={{ padding: "5px 3px 5px 0" }}>
              <DownIcon onClick={(e) => handleDownClick(e)} />
            </div>
          ) : (
            <div style={{ padding: "5px 3px 5px 0" }}>&nbsp;</div>
          )}

          <RowResizer ref={resizerRef} onMouseDown={handleResizeMouseDown}>
            &nbsp;
          </RowResizer>
        </Th>
      </>
    );
  }
}

export default RenderHeader;
