import { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { IRow } from "./dropTargets/Rows";
import { IValue } from "./dropTargets/Values";

const Table = styled.div`
  width: 100%;
  height: 90%;
  border: 1px solid black;
  font-size: ${(props) => props.theme.fontSizes.normal};
  border-radius: 5px 5px 0 0;
  transition: ${(props) => props.theme.transition};
  padding: 8px 10px;
`;

const TableHeader = styled.div`
  display: flex;
  border-bottom: 1px solid black;
  background-color: ${(props) => props.theme.colors.table.excel};
  color: ${(props) => props.theme.colors.table.thText};
`;

const TableHeaderCell = styled.div<{ $width: number; $align: string }>`
  width: ${(props) => props.$width}px;
  text-align: ${(props) => props.$align};
`;

const TableRow = styled.div`
  display: flex;
  width: 100%;
  border-bottom: 1px solid black;
`;

const SubRow = styled.div`
  display: flex;
  width: 100%;
`;

const Td = styled.span<{ $width: number; $align: string }>`
  width: ${(props) => props.$width}px;
  text-align: ${(props) => props.$align};
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

  const { data, rows, setRows, values, setValues } = props;

  useEffect(() => {}, []);

  useEffect(() => {
    //calculateWidth();
    calculateTableHeight();
  }, [values, rows]);

  const calculateTableHeight = () => {
    if (tableRef.current && tableBodyRef.current) {
      const parent = tableRef.current.parentElement;
      const parentbox = parent?.getBoundingClientRect();
      tableRef.current.style.height = `${parentbox?.height}px`;
      const bodyBox = tableBodyRef.current.getBoundingClientRect();
      console.log("parentBox", parentbox);
      console.log("bodyBox", bodyBox);
      if (bodyBox.height > parentbox?.height) {
        tableRef.current.style.overflowY = "scroll";
      }
    }
  };

  const calculateWidth = () => {
    if (tableRef.current) {
      // const configuratorWidth = 200;
      const totalColumns = values.length + 1;
      const tableBox = tableRef.current.getBoundingClientRect();
      const individualColumnWidth = tableBox.width / totalColumns;

      return individualColumnWidth;
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

  const sum = (arr, key) => {
    const result = arr.reduce((acc, cur) => {
      return acc + Number(cur[key]);
    }, 0);
    return result;
  };

  const renderTableHeader = () => {
    return (
      <TableHeader className="seudo-table-header">
        {rows.map((r, i) => {
          if (i === 0) {
            return (
              <TableHeaderCell
                $align={"left"}
                $width={calculateWidth()}
                key={`th-${i}`}
              >
                {r.label}
              </TableHeaderCell>
            );
          }
        })}
        {values.map((v, i) => {
          return (
            <TableHeaderCell
              $align={"right"}
              $width={calculateWidth() as number}
              key={`th-v${i}`}
            >
              Sum of {v.label}
            </TableHeaderCell>
          );
        })}
      </TableHeader>
    );
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
            {sum(parentObject, v.label)}
          </Td>
        );
      } else {
        return (
          <Td
            $align={"right"}
            $width={calculateWidth() as number}
            key={`tr-td-${i}`}
          >
            {sum(parentObject["data"], v.label)}
          </Td>
        );
      }
    });
  };

  const buildSubRows = (r) => {
    const subrows = data[r];
    if (!Array.isArray(subrows)) {
      return Object.keys(subrows).map((s, i) => {
        if (s !== "data") {
          return (
            <SubRow key={`sub-row-${i}`}>
              <Td $width={calculateWidth() as number} $align={"left"}>
                <SubRowSpacer $width={25}>&nbsp;</SubRowSpacer>

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
          );
        }
      });
    }
  };

  const renderTableBody = () => {
    return (
      <div ref={tableBodyRef} className="seudo-table-body">
        {Object.keys(data).map((r, i) => {
          return (
            <div key={`table-row-container-${i}`}>
              <TableRow key={`tr-${i}`}>
                {rows.length > 0 ? (
                  <Td $align={"left"} $width={calculateWidth() as number}>
                    <span>-</span>
                    <span>{r}</span>
                  </Td>
                ) : (
                  <Td $align={"left"} $width={calculateWidth() as number}>
                    {r}
                  </Td>
                )}

                {buildAggregates(data[r])}
              </TableRow>
              {buildSubRows(r)}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <>
      <Table ref={tableRef} className="seudo-table">
        {renderTableHeader()}
        {renderTableBody()}
        {/* <Thead
          rows={rows}
          setShowContextMenu={setShowContextMenu}
          handleSortDirection={handleSortDirection}
          values={values}
          handleContextMenu={handleContextMenu}
        />
        <Tbody rows={rows} data={data} values={values} /> */}
      </Table>
    </>
  );
}

export default Pivot;
