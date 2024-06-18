import { useState, useEffect, useRef } from "react";
import { TableHeader } from "../../../interfaces/Grid";
import { Th } from "../divs";
import { calculateWidth } from "../calculateWidth";
import { useTheme } from "styled-components";
import { RowResizer } from "../divs";
import { DownIcon } from "../../../svgs/DownIcon";
import HeaderContextMenu from "./HeaderContextMenu";
import { RowFilterConfiguration } from "../DataGrid";
import { SubEvent, eventTypes } from "../../../pubsub/pubsub";
import { debounce } from "../../../utils/utils";

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
  _uuid: string;
  setColumns: (t: TableHeader<T>[]) => void;
}

function RenderHeader<T>(props: Props<T>) {
  const [showHeaderContextMenu, setShowHeaderContextMenu] = useState(false);
  const [points, setPoints] = useState({
    x: 0,
    y: 0,
  });
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
    _uuid,
    setColumns,
  } = props;

  const menuRef = useRef<HTMLDivElement>(null);
  const thRef = useRef<HTMLTableCellElement>(null);
  const resizerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    SubEvent.on(eventTypes.moved, function gridHeaderMoved(e: string) {
      const { _uid, x, y } = JSON.parse(e);
      if (_uid === _uuid) {
        const obj = { x, y };
        console.log("setting windowPos from subevent", obj);
        // setWindowPos(obj);
      }
    });
  }, [_uuid]);

  const removeListers = () => {
    console.log("removing listeners");
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  const updateColumns = (newWidth: number) => {
    console.log("updating columns", newWidth);
    // now we need to update the columnHeaders with the new width
    const columnCopy = { ...column, width: newWidth };
    const index = columns.findIndex((c) => c.columnName === column.columnName);
    if (index >= 0) {
      const columnsCopy = [...columns];
      columnsCopy.splice(index, 1, columnCopy);
      setColumns(columnsCopy);
    }
  };

  const debouncedUpdateColumns = debounce(updateColumns, 500);

  const handleMouseMove = (e: MouseEvent) => {
    const el = resizerRef.current;
    if (el) {
      const parent = el.parentElement;
      if (parent) {
        // console.log("parent", parent);
        const { left, width } = parent.getBoundingClientRect();
        // console.log(left, width, e.clientX, e.movementX);
        //const dx = e.clientX - startPosition.x - windowPos.x;
        //const newX = `${parseInt(styles.width, 10) + dx}`;
        const difference = left + width - e.clientX;
        const newWidth = width - difference;
        // console.log("newWidth", newWidth);
        parent.style.width = `${newWidth}px`;

        debouncedUpdateColumns(newWidth);
      }
    }
  };

  const handleMouseUp = () => {
    removeListers();
  };

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

  const handleResizeMouseDown = () => {
    const el = resizerRef.current;
    if (el) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }
  };

  const handleDragStart = (e: React.DragEvent<HTMLTableCellElement>) => {
    e.dataTransfer.setData("columnName", column.columnName as string);
    e.dataTransfer.effectAllowed = "copyMove";
    e.currentTarget.style.border = "white";
    e.currentTarget.style.opacity = "0.8";
  };

  const handleDragLeave = (e: React.DragEvent<HTMLTableCellElement>) => {
    // @ts-expect-error cannot be null
    e.currentTarget.style.border = null;
    e.currentTarget.style.opacity = "1.0";
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.currentTarget.style.borderRight = "3px solid black";
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.currentTarget.classList.remove("dragging");
    const columnName = e.dataTransfer.getData("columnName");
    console.log("columnName", columnName);
    // find the existing position of the column
    const originalColumn = columns.filter(
      (c) => c.columnName === columnName
    )[0];
    const columnList = columns.filter((c) => c.columnName !== columnName);
    const droppedPosition = columns.findIndex(
      (c) => c.columnName === column.columnName
    );
    columnList.splice(droppedPosition, 0, originalColumn);
    setColumns(columnList);
    // @ts-expect-error cannot be null
    e.currentTarget.style.borderRight = null;
    e.currentTarget.style.opacity = "1.0";
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
          draggable
          onDragStart={handleDragStart}
          onDragLeave={(e) => handleDragLeave(e)}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
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
