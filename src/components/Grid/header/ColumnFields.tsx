import React, { useState, useEffect, Ref, ReactElement } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";
import { TableHeader } from "../../../interfaces/Grid";
import { fadeIn, fadeOut } from "../../../animations";

const Portal = styled.div<{ $left: number; $top: number }>`
  position: absolute;
  top: ${(props) => props.$top}px;
  left: ${(props) => props.$left}px;
  height: 300px;
  width: 300px;
  background-color: ${(props) => props.theme.colors.bg};
  color: ${(props) => props.theme.colors.text};
  z-index: 10;
  border: 1px solid black;
  border-radius: ${(props) => props.theme.window.borderRadius}px;
  box-shadow: 2px 4px 6px rgba(0, 0, 0, 0.3);
  animation-name: ${fadeIn};
  animation-duration: 200ms;
  animation-timing-function: ease-out;
  &.hide {
    animation-name: ${fadeOut};
  }
`;

const Header = styled.div`
  background-color: ${(props) => props.theme.colors.window.header};
  border-top-left-radius: ${(props) => props.theme.window.borderRadius}px;
  border-top-right-radius: ${(props) => props.theme.window.borderRadius}px;
  border-bottom: 1px solid ${(props) => props.theme.colors.text};
  padding: 5px 8px;
  font-weight: ${(props) => props.theme.fontWeights.bold};
  display: flex;
  justify-content: center;
  align-items: center;
  text-transform: uppercase;
  transition: all 0.3s ease-out;
`;

const Item = styled.div`
  display: flex;
  padding: 3px 8px;
  cursor: pointer;
  transition: all 0.3s ease-out;
  &:nth-of-type(even) {
    background-color: ${(props) => props.theme.colors.table.evenRows};
    color: ${(props) => props.theme.colors.table.excel};
  }
  &:nth-of-type(odd) {
    background-color: ${(props) => props.theme.colors.table.oddRows};
  }
  &:hover {
    background-color: ${(props) =>
      props.theme.colors.table.hoverBackgroundColor};
    color: ${(props) => props.theme.colors.table.hoverTextColor};
  }
`;

type MousePosition = {
  x: number;
  y: number;
};

interface Props<T> {
  isOpen: boolean;
  data: T[];
  mousePosition: MousePosition;
  gridColumns: TableHeader<T>[];
  setIncludedColumns: (c: TableHeader<T>[]) => void;
  includedColumns: TableHeader<T>[];
}

const ColumnFields = <T extends Option>(
  props: Props<T>,
  ref: Ref<HTMLDivElement>
) => {
  // const [checkedColumns, setCheckedColumns] = useState<TableHeader<T>[]>([]);
  const {
    isOpen,
    mousePosition,
    gridColumns,
    setIncludedColumns,
    includedColumns,
  } = props;

  useEffect(() => {
    const newArray: TableHeader<T>[] = [];
    gridColumns.map((c) => {
      newArray.push(c);
    });
    setIncludedColumns(newArray);
  }, []);

  const includes = (field: string, value: string) => {
    const index = includedColumns.findIndex(
      (gc) => gc[field].toString() === value
    );
    return index >= 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    column: TableHeader<T>
  ) => {
    if (e.target.checked) {
      const newArray = [...includedColumns, column];
      setIncludedColumns(newArray);
    } else {
      const filtered = includedColumns.filter(
        (c) => c.columnName != column.columnName
      );
      setIncludedColumns(filtered);
    }
  };

  return (
    <>
      {isOpen
        ? createPortal(
            <Portal ref={ref} $left={mousePosition.x} $top={mousePosition.y}>
              <Header>columns</Header>
              {gridColumns.map((column, i) => {
                return (
                  <Item key={`gc-${i}`}>
                    <input
                      type="checkbox"
                      checked={includes(
                        "columnName",
                        column.columnName as string
                      )}
                      onChange={(e) => handleChange(e, column)}
                    />
                    <div>{`${column.title} -(${
                      column.columnName as string
                    })`}</div>
                  </Item>
                );
              })}
            </Portal>,
            document.body
          )
        : null}
    </>
  );
};

const ColumnFieldsForwarded = React.forwardRef(ColumnFields) as <
  T extends Option
>(
  props: Props<T> & { ref?: Ref<HTMLDivElement> }
) => ReactElement;

export default ColumnFieldsForwarded;
