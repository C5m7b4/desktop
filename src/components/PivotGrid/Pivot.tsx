import { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { IRow } from "./dropTargets/Rows";
import { IValue } from "./dropTargets/Values";
import THead from "./head/THead";
import BodyContextMenu from "./contextMenus/BodyContextMenu";

import TableRow from "./body/TableRow";

const Table = styled.div`
  width: 100%;
  height: 90%;
  font-size: ${(props) => props.theme.fontSizes.normal};
  border-radius: 5px 5px 0 0;
  transition: ${(props) => props.theme.transition};
`;

const SubRow = styled.div`
  display: flex;
  width: 100%;
`;

export const Td = styled.span<{
  $width: number;
  $align: string;
  $bold: boolean;
}>`
  width: ${(props) => props.$width}px;
  text-align: ${(props) => props.$align};
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-weight: ${(props) => (props.$bold ? "700" : "400")};
`;

const SubRowSpacer = styled.span<{ $width: number }>`
  width: ${(props) => props.$width}px;
  display: inline-block;
`;

interface Props<T> {
  data: T[];
  rows: IRow[];
  setRows: (r: IRow[]) => void;
  values: IValue[];
  setValues: (v: IValue[]) => void;
  resized: boolean;
}

function Pivot<T>(props: Props<T>) {
  const [showContextMenu, setShowContextMenu] = useState(false);
  const [showUtilityContext, setShowUtilityContext] = useState(false);
  const [points, setPoints] = useState({ x: 0, y: 0 });
  const [column, setColumn] = useState("");
  const [showAliasModal, setShowAliasModal] = useState(false);
  const [showFormatterModal, setShowFormatterModal] = useState(false);
  const [aliasValue, setAliasValue] = useState("");
  const [formatterValue, setFormatterValue] = useState("");
  const [showBodyContextMenu, setShowBodyContextMenu] = useState(false);

  const tableRef = useRef<HTMLDivElement>(null);
  const tableBodyRef = useRef<HTMLDivElement>(null);
  const tableOuterBodyRef = useRef<HTMLDivElement>(null);

  const { data, rows, setRows, values, setValues, resized } = props;

  useEffect(() => {}, []);

  useEffect(() => {
    //calculateWidth();
    calculateTableHeight();
  }, [values, rows]);

  useEffect(() => {
    console.log("useEffect resize occured");
    calculateTableHeight();
    renderTableBody();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resized, data]);

  const calculateTableHeight = () => {
    if (tableRef.current && tableBodyRef.current && tableOuterBodyRef.current) {
      const parent = tableRef.current.parentElement;
      const parentbox = parent?.getBoundingClientRect();
      tableRef.current.style.height = `${parentbox?.height}px`;
      tableRef.current.style.width = `${parentbox?.width}px`;
      const bodyBox = tableBodyRef.current.getBoundingClientRect();
      if (parentbox && tableBodyRef.current) {
        if (bodyBox.height > parentbox.height) {
          tableOuterBodyRef.current.style.overflowY = "scroll";
          tableOuterBodyRef.current.style.height = `${parentbox.height - 25}px`;
        } else {
          tableBodyRef.current.style.overflowY = "";
        }
      }
    }
  };

  const calculateWidth = (): number => {
    if (tableRef.current) {
      // const configuratorWidth = 200;
      const totalColumns = values.length + 1;
      const tableBox = tableRef.current.getBoundingClientRect();
      const individualColumnWidth = tableBox.width / totalColumns;

      return individualColumnWidth;
    } else {
      return 0;
    }
  };

  const handleSortDirection = (e, c) => {
    const selectedRow = rows.filter((r) => r.label === c.label)[0];
    const pos = rows.findIndex((r) => r.label === c.label);
    const newRow = {
      ...selectedRow,
      direction: selectedRow.direction === "asc" ? "desc" : "asc",
    };
    const newRows = [...rows];
    newRows.splice(pos, 2, newRow);
    setRows(newRows);
    setPoints({ x: e.pageX, y: e.pageY });
    setColumn(c);
    setShowUtilityContext(true);
  };

  const handleContextMenu = (e, c) => {
    e.preventDefault();
    setPoints({ x: e.pageX, y: e.pageY });
    setColumn(c);
    setShowContextMenu(true);
  };

  const applyFormatter = (
    input: string,
    formatter: Function,
    decimals: number
  ) => {
    if (formatter) {
      return formatter(input, decimals);
    }
    return input;
  };

  const buildAggregates = (parentObject) => {
    return values.map((v, i) => {
      if (Array.isArray(parentObject)) {
        return (
          <Td
            className="pivot-agg-arr"
            $align={"right"}
            $width={calculateWidth() as number}
            key={`tr-td-${i}`}
          >
            {applyFormatter(
              v.fn(parentObject, v.label),
              v.formatter!,
              v.decimals!
            )}
          </Td>
        );
      } else {
        return (
          <Td
            className="pivot-agg-obj"
            $align={"right"}
            $width={calculateWidth() as number}
            key={`tr-td-${i}`}
          >
            {applyFormatter(
              v.fn(parentObject["data"], v.label),
              v.formatter!,
              v.decimals!
            )}
          </Td>
        );
      }
    });
  };

  const sortObject = (obj) => {
    const result = Object.fromEntries(Object.entries(obj).sort());
    return result;
  };

  const buildSubRows = (subrows, i) => {
    if (!Array.isArray(subrows)) {
      subrows = sortObject(subrows);
      return Object.keys(subrows).map((s, idx) => {
        if (s !== "data") {
          return (
            <div key={`sub-row-${idx}`}>
              <SubRow className="pivot_subrow">
                <Td
                  className="pvito-sub-row-td-for-s"
                  $bold={false}
                  $width={calculateWidth() as number}
                  $align={"left"}
                >
                  <SubRowSpacer $width={10 + i}>&nbsp;</SubRowSpacer>

                  <span>{s}</span>
                </Td>
                {buildAggregates(subrows[s])}
              </SubRow>
              {buildSubRows(subrows[s], i)}
            </div>
          );
        }
      });
    }
  };

  const handleBodyContext = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (tableRef.current) {
      const parent = tableRef.current.parentElement;
      const parentbox = parent?.getBoundingClientRect();
      if (parentbox) {
        setPoints({
          x: e.clientX,
          y: e.clientY,
        });
        setShowBodyContextMenu(true);
      }
    }
  };

  const renderTableBody = () => {
    return (
      <div ref={tableOuterBodyRef}>
        <div
          ref={tableBodyRef}
          className="seudo-table-body"
          style={{ padding: "4px 6px", position: "relative" }}
          onContextMenu={handleBodyContext}
        >
          {showBodyContextMenu ? (
            <BodyContextMenu
              top={points.y}
              left={points.x}
              isShowing={showBodyContextMenu}
              hide={() => setShowBodyContextMenu(false)}
            />
          ) : null}
          {Object.keys(data).map((r, i) => {
            return (
              <TableRow
                key={`table-row=${i}`}
                rows={rows}
                i={i}
                calculateWidth={calculateWidth}
                r={r}
                buildSubRows={buildSubRows}
                buildAggregates={buildAggregates}
                data={data}
              />
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <>
      <Table ref={tableRef} className="seudo-table">
        <THead
          rows={rows}
          values={values}
          setValues={setValues}
          calculateWidth={calculateWidth}
        />
        {renderTableBody()}
      </Table>
    </>
  );
}

export default Pivot;
