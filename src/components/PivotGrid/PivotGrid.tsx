import { useState, useEffect, useRef, useCallback } from "react";
import styled, { useTheme } from "styled-components";
import Configurator from "./Configurator";
import Pivot from "./Pivot";
import { IRow } from "./dropTargets/Rows";
import { IValue } from "./dropTargets/Values";
import { groupFn } from "../../utils/arrayUtils";
import { Box } from "../../utils/Box";
import SplitPane from "../SplitPanel/SplitPane";
import { debounce } from "../../utils/utils";

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
  const [resized, setResized] = useState(false);

  const theme = useTheme();
  const windowRef = useRef<HTMLDivElement>(null);
  const resizeRef = useRef();
  const parentResizeRef = useRef();

  useEffect(() => {
    if (windowRef.current) {
      resizeHandler();
      resizeRef.current = new ResizeObserver(
        debounce(resizeHandler, 500)
      ).observe(windowRef.current);

      const parent =
        windowRef.current.parentElement?.parentElement?.parentElement;
      parentResizeRef.current = new ResizeObserver(
        debounce(resizeHandler, 500)
      ).observe(parent);
    }

    setPivotedData([]);
  }, []);

  useEffect(() => {
    if (rows.length === 0) return;
    const rowKeys = rows.map((r) => r.label);
    const pivoted = Box(data)
      .map((x) => groupFn(x, rowKeys))
      .fold((x) => x);
    setPivotedData(pivoted);
  }, [rows]);

  const resizeHandler = useCallback(() => {
    if (windowRef.current) {
      const windowDimensions =
        windowRef.current.parentElement?.parentElement?.parentElement?.getBoundingClientRect();
      if (windowDimensions) {
        const panelHeight =
          windowDimensions.height - theme.window.windowHeaderHeight;
        setHeight(panelHeight);
      }
    }
    setResized(!resized);
  }, []);

  return (
    <Div className="pivot-grid-window" ref={windowRef} $height={height}>
      <TableContainer>
        <SplitPane
          direction={"vertical"}
          separatorWidth={2}
          separatorColor={"black"}
        >
          <SplitPane.Left>
            <Pivot
              data={pivotedData}
              rows={rows}
              setRows={setRows}
              values={values}
              setValues={setValues}
              resized={resized}
            />
          </SplitPane.Left>
          <SplitPane.Right>
            <Configurator
              data={data}
              rows={rows}
              setRows={setRows}
              filters={filters}
              columns={columns}
              values={values}
              setValues={setValues}
            />
          </SplitPane.Right>
        </SplitPane>
      </TableContainer>
    </Div>
  );
}

export default PivotGrid;
