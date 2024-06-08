import { useState, useEffect, useRef, useCallback } from "react";
import styled, { useTheme } from "styled-components";
import Configurator from "./Configurator";
import Pivot from "./Pivot";
import { IRow } from "./dropTargets/Rows";
import { IValue } from "./dropTargets/Values";
import { groupFn } from "../../utils/arrayUtils";
import { Box } from "../../utils/Box";

// import Pivot from "./Pivot";
// import Configurator from "./Configurator";

const Div = styled.div<{ $height: number }>`
  font-size: ${(props) => props.theme.fontSizes.normal};
  overflow: hidden;
  height: ${(props) => props.$height}px;
  background-color: ${(props) => props.theme.colors.bg};
`;

const TableContainer = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;
`;

interface Props<T> {
  data: T[];
}

function PivotGrid<T, _>({ data, columns }) {
  const [rows, setRows] = useState<IRow[]>([]);
  const [filters, setFilters] = useState([]);
  // const [columns, setColumns] = useState([]);
  const [values, setValues] = useState<IValue[]>([]);
  const [height, setHeight] = useState(0);
  const [pivotedData, setPivotedData] = useState<T[]>([]);
  const theme = useTheme();

  const windowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // determine the height after we draw the title of the window
    if (windowRef.current) {
      const windowDimensions =
        windowRef.current.parentElement?.parentElement?.parentElement?.getBoundingClientRect();
      if (windowDimensions) {
        const panelHeight =
          windowDimensions.height - theme.window.windowHeaderHeight;
        setHeight(panelHeight);
      }
    }
    setPivotedData([]);
  }, []);

  useEffect(() => {
    if (rows.length === 0) return;
    console.log("pivoting data...");
    const rowKeys = rows.map((r) => r.label);
    const pivoted = Box(data)
      .map((x) => groupFn(x, rowKeys))
      .fold((x) => x);
    setPivotedData(pivoted);
  }, [rows]);

  return (
    <Div className="pivot-grid-window" ref={windowRef} $height={height}>
      <TableContainer>
        <Pivot
          data={pivotedData}
          rows={rows}
          setRows={setRows}
          values={values}
          setValues={setValues}
        />
        <Configurator
          data={data}
          rows={rows}
          setRows={setRows}
          filters={filters}
          columns={columns}
          values={values}
          setValues={setValues}
        />
      </TableContainer>
    </Div>
  );
}

export default PivotGrid;
