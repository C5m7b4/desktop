import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";
import { SortAZ, SortZA, ChevronRight } from "../../../svgs";
import { TableHeader } from "../../../interfaces/Grid";
import ColumnFieldsForwarded from "./ColumnFields";
import { fadeIn, fadeOut } from "../../../animations";
import { RowFilterConfiguration } from "../DataGrid";
import { sort } from "../../../utils/sort";

const PortalWindow = styled.div<{ $x: number; $top: number }>`
  position: fixed;
  top: ${(props) => props.$top}px;
  left: ${(props) => props.$x + 10}px;
  width: 200px;
  height: 300px;
  background-color: ${(props) => props.theme.colors.bg};
  border: 1px solid black;
  border-radius: ${(props) => props.theme.window.borderRadius}px;
  z-index: 10;
  box-sizing: border-box;
  overflow: hidden;
  padding: 10px 3px 15px 3px;
  box-shadow: 2px 4px 6px rgba(0, 0, 0, 0.3);
  animation-name: ${fadeIn};
  animation-duration: 200ms;
  animation-timing-function: ease-out;
  &.hide {
    animation-name: ${fadeOut};
  }
`;

const Div = styled.div`
  display: flex;
  justify-content: center;
  padding: 4px 8px;
  font-size: ${(props) => props.theme.fontSizes.menium};
  color: ${(props) => props.theme.colors.text};
`;

const SortDiv = styled.div`
  display: flex;
  justify-content: center;
  padding: 4px 8px;
  font-size: ${(props) => props.theme.fontSizes.menium};
  color: ${(props) => props.theme.colors.text};
  cursor: pointer;
`;

const Items = styled.div<{ $height: number }>`
  overflow-y: scroll;
  height: ${(props) => props.$height}px;
  background-color: ${(props) => props.theme.colors.bg2};
  color: ${(props) => props.theme.colors.text};
`;

const ColumnDiv = styled.div`
  font-weight: ${(props) => props.theme.fontWeights.bold};
  display: flex;
  justify-content: space-between;
  cursor: pointer;
  color: ${(props) => props.theme.colors.text};
`;

const ButtonDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 5px;
`;

const Button = styled.button`
  border: none;
  outline: none;
  cursor: pointer;
  background-color: ${(props) => props.theme.colors.buttons.primary.color};
  color: ${(props) => props.theme.colors.buttons.primary.text};
  padding: ${(props) => props.theme.colors.buttons.padding};
  border-radius: ${(props) => props.theme.colors.buttons.borderRadius}px;
  transition: all 0.3s ease-out;
  &:hover {
    background-color: ${(props) =>
      props.theme.colors.buttons.primary.hover.color};
    color: ${(props) => props.theme.colors.buttons.primary.hover.text};
  }
`;

interface Props<T> {
  isOpen: boolean;
  parent?: Element;
  x: number;
  top: number;
  close: () => void;
  data: T[];
  column: keyof T;
  gridColumns: TableHeader<T>[];
  setIncludedColumns: (c: TableHeader<T>[]) => void;
  includedColumns: TableHeader<T>[];
  setRowFilterConfiguration: (c: RowFilterConfiguration<T>) => void;
  setData: (d: T[]) => void;
}

function HeaderContextMenu<T>(props: Props<T>) {
  const {
    isOpen = true,
    parent = document.body,
    x,
    top,
    close,
    data,
    column,
    gridColumns,
    setIncludedColumns,
    includedColumns,
    setRowFilterConfiguration,
    setData,
  } = props;
  const [columns, setColumns] = useState<string[]>([]);
  const [searchText, setSearchText] = useState("");
  const [itemListHeight, setItemListHeight] = useState(100);
  const [checkedColumns, setCheckedColumns] = useState<string[]>([]);
  const [showColumnFields, setShowColumnFields] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const menuRef = useRef<HTMLDivElement>(null);
  const upperRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const columnsRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && columnsRef.current) {
        if (
          !menuRef.current.contains(e.target as HTMLDivElement) &&
          !columnsRef.current?.contains(e.target as HTMLDivElement)
        ) {
          close();
        }
      }
    };
    document.addEventListener("mousedown", handler);
    unique(data, column);

    //determine the size of the scrollable items
    if (
      upperRef.current &&
      searchRef.current &&
      menuRef.current &&
      columnsRef.current &&
      buttonsRef.current
    ) {
      const upperBox = upperRef.current.getBoundingClientRect();
      const searchBox = searchRef.current.getBoundingClientRect();
      const columnsBox = columnsRef.current.getBoundingClientRect();
      const menuBox = menuRef.current.getBoundingClientRect();
      const buttonsBox = buttonsRef.current.getBoundingClientRect();
      const height =
        menuBox.height -
        upperBox.height -
        searchBox.height -
        columnsBox.height -
        buttonsBox.height -
        30;
      setItemListHeight(height);
    }

    return () => {
      document.removeEventListener("mousedown", handler);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, close, column, data]);

  const unique = (arr: T[], field: keyof T) => {
    const headers: string[] = [];
    arr.forEach((r) => {
      if (!headers.includes(r[field] as string)) {
        headers.push(r[field] as string);
      }
    });
    const sorted = headers.sort();
    sorted.unshift("(Select All)");
    setColumns(sorted);
    return headers;
  };

  const search = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
    if (e.target.value.length === 0) {
      unique(data, column);
    } else {
      const filteredColumns = columns.filter(
        (c) =>
          c.toLowerCase().startsWith(e.target.value.toLowerCase()) ||
          c.toLowerCase() === "(select all)"
      );
      setColumns(filteredColumns);
    }
  };

  const handleCheck = (e: React.ChangeEvent<HTMLInputElement>, c: string) => {
    if (e.target.checked) {
      if (c.toLowerCase() === "(select all)") {
        setCheckedColumns(columns);
        setRowFilterConfiguration({ column, value: columns });
      } else {
        const newArray = [...checkedColumns, c];
        setCheckedColumns(newArray);
        setRowFilterConfiguration({ column, value: newArray });
      }
    } else {
      if (c.toLowerCase() === "(select all)") {
        setCheckedColumns([]);
        setRowFilterConfiguration({ column: "", value: [] });
      } else {
        const filtered = checkedColumns.filter((cc) => cc != c);
        setCheckedColumns(filtered);
        setRowFilterConfiguration({ column, value: filtered });
      }
    }
  };

  const handleColumnClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (menuRef.current) {
      const boundingBox = menuRef.current.getBoundingClientRect();
      setMousePosition({ x: boundingBox.right, y: e.clientY });
    } else {
      setMousePosition({ x: e.clientX, y: e.clientY });
    }

    setShowColumnFields(!showColumnFields);
  };

  const handleOkClick = () => {
    setShowColumnFields(false);
    close();
  };

  const handleSortAZClick = () => {
    const sortedData = sort(data, column);
    setData(sortedData);
    close();
  };

  const handleSortZAClick = () => {
    const sortedData = sort(data, column, "desc");
    setData(sortedData);
    close();
  };

  return (
    <>
      {isOpen
        ? createPortal(
            <PortalWindow ref={menuRef} $x={x} $top={top}>
              {showColumnFields ? (
                <ColumnFieldsForwarded
                  data={props.data}
                  isOpen={showColumnFields}
                  mousePosition={mousePosition}
                  gridColumns={gridColumns}
                  ref={columnsRef}
                  setIncludedColumns={setIncludedColumns}
                  includedColumns={includedColumns}
                />
              ) : null}
              <div ref={upperRef}>
                <SortDiv onClick={handleSortAZClick}>
                  <span>
                    <SortAZ />
                  </span>
                  <span>Sort A to Z</span>
                </SortDiv>
                <SortDiv onClick={handleSortZAClick}>
                  <span>
                    <SortZA />
                  </span>
                  <span>Sort Z to A</span>
                </SortDiv>
                <hr />
              </div>
              <Div ref={searchRef}>
                <input
                  type="text"
                  placeholder="search"
                  value={searchText}
                  onChange={search}
                />
              </Div>
              <ColumnDiv ref={columnsRef} onClick={handleColumnClick}>
                <div>Columns</div>
                <div>
                  <ChevronRight />
                </div>
              </ColumnDiv>
              <Items $height={itemListHeight}>
                {columns.map((c, i) => {
                  return (
                    <div key={`c-${i}`}>
                      <input
                        type="checkbox"
                        checked={checkedColumns.includes(c)}
                        onChange={(e) => handleCheck(e, c)}
                      />
                      <label>{c}</label>
                    </div>
                  );
                })}
              </Items>
              <ButtonDiv ref={buttonsRef}>
                <Button onClick={handleOkClick}>OK</Button>
              </ButtonDiv>
              <div style={{ minHeight: "10px" }}>&nbsp;</div>
            </PortalWindow>,
            parent
          )
        : null}
    </>
  );
}

export default HeaderContextMenu;
