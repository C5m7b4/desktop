import { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { IRow } from "./dropTargets/Rows";
import { IValue } from "./dropTargets/Values";
import THead from "./head/THead";

import TableRow from "./body/TableRow";

const Table = styled.div`
  width: 100%;
  height: 90%;
  border: 1px solid black;
  font-size: ${(props) => props.theme.fontSizes.normal};
  border-radius: 5px 5px 0 0;
  transition: ${(props) => props.theme.transition};
`;

const SubRow = styled.div`
  display: flex;
  width: 100%;
`;

export const Td = styled.span<{ $width: number; $align: string }>`
  width: ${(props) => props.$width}px;
  text-align: ${(props) => props.$align};
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
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

  const tableRef = useRef<HTMLDivElement>(null);
  const tableBodyRef = useRef<HTMLDivElement>(null);

  const { data, rows, setRows, values, setValues, resized } = props;

  useEffect(() => {}, []);

  useEffect(() => {
    //calculateWidth();
    calculateTableHeight();
  }, [values, rows]);

  useEffect(() => {
    console.log("resizing pivot");
    renderTableBody();
    calculateTableHeight();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resized]);

  const calculateTableHeight = () => {
    if (tableRef.current && tableBodyRef.current) {
      const parent = tableRef.current.parentElement;
      const parentbox = parent?.getBoundingClientRect();
      tableRef.current.style.height = `${parentbox?.height}px`;
      const bodyBox = tableBodyRef.current.getBoundingClientRect();
      if (parentbox) {
        if (bodyBox.height > parentbox?.height) {
          console.log("setting to scrollable");
          tableRef.current.style.overflowY = "scroll";
        } else {
          console.log("setting to non scrollable");
          tableRef.current.style.overflowY = "";
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

  const buildAggregates = (parentObject) => {
    return values.map((v, i) => {
      if (Array.isArray(parentObject)) {
        return (
          <Td
            $align={"right"}
            $width={calculateWidth() as number}
            key={`tr-td-${i}`}
          >
            {v.fn(parentObject, v.label)}
          </Td>
        );
      } else {
        return (
          <Td
            $align={"right"}
            $width={calculateWidth() as number}
            key={`tr-td-${i}`}
          >
            {v.fn(parentObject["data"], v.label)}
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
    //const subrows = data[r];

    if (!Array.isArray(subrows)) {
      subrows = sortObject(subrows);
      return Object.keys(subrows).map((s, idx) => {
        if (s !== "data") {
          return (
            <div key={`sub-row-${idx}`}>
              <SubRow>
                <Td $width={calculateWidth() as number} $align={"left"}>
                  <SubRowSpacer $width={10 + i}>&nbsp;</SubRowSpacer>

                  <span>{s}</span>
                </Td>
                {values.map((v, i) => {
                  return (
                    <Td
                      $width={calculateWidth() as number}
                      $align={"right"}
                      key={`subrow-v-${i}`}
                    >
                      {buildAggregates(subrows[s])}
                    </Td>
                  );
                })}
              </SubRow>
              {buildSubRows(subrows[s], i)}
            </div>
          );
        }
      });
    }
  };

  const renderTableBody = () => {
    return (
      <div
        ref={tableBodyRef}
        className="seudo-table-body"
        style={{ padding: "4px 6px" }}
      >
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
