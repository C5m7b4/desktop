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
import Footer from "./body/Footer";

// import Pivot from "./Pivot";
// import Configurator from "./Configurator";

const Div = styled.div<{ $height: number }>`
  font-size: ${(props) => props.theme.fontSizes.normal};
  overflow: hidden;
  height: ${(props) => props.$height}px;
  background-color: ${(props) => props.theme.colors.bg};
`;

const TableContainer = styled.div<{ $footerHeight: number; $height: number }>`
  height: ${(props) => props.$height}px;
  display: grid;
  grid-template-rows: 1fr ${(props) => props.$footerHeight}px;
`;

const FooterDiv = styled.div`
  height: 25px;
  background-color: ${(Props) => Props.theme.colors.table.excel};
  color: ${(props) => props.theme.colors.table.thText};
  padding: 3px 15px;
`;

interface Props<T> {
  data: T[];
  columns: IColumn[];
  loading?: boolean;
  downloaded?: number;
}

export interface IColumn {
  title: string;
  columnName: string;
  width: number;
  align: ColumnAlignment;
  renderer?: null;
}

function PivotGrid<T, _>({ data, columns, loading, downloaded }: Props<T>) {
  const [rows, setRows] = useState<IRow[]>([]);
  const [filters, setFilters] = useState([]);
  // const [columns, setColumns] = useState([]);
  const [values, setValues] = useState<IValue[]>([]);
  const [height, setHeight] = useState(0);
  const [pivotedData, setPivotedData] = useState<T[]>([]);
  const [resized, setResized] = useState(false);
  const [footerHeight, setFooterHeight] = useState(0);

  const theme = useTheme();
  const windowRef = useRef<HTMLDivElement>(null);
  const resizeRef = useRef();
  const parentResizeRef = useRef();
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (footerRef.current) {
      const footerBox = footerRef.current.getBoundingClientRect();
      setFooterHeight(footerBox.height);
    }
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
      <TableContainer
        $height={height - footerHeight}
        $footerHeight={footerHeight}
        className="table-container"
      >
        <SplitPane
          direction={"vertical"}
          separatorWidth={2}
          separatorColor={"black"}
          $height={height - footerHeight}
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
        <FooterDiv ref={footerRef}>
          <Footer loading={loading} downloaded={downloaded} data={data} />
        </FooterDiv>
      </TableContainer>
    </Div>
  );
}

export default PivotGrid;
