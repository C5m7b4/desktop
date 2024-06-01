import { useState, useEffect, useRef } from "react";
import NormalTable from "./NormalTable";
import styled, { useTheme } from "styled-components";

// import Pivot from "./Pivot";
// import Configurator from "./Configurator";

const Div = styled.div<{ $height: number }>`
  font-size: ${(props) => props.theme.fontSizes.normal};
  overflow: hidden;
  height: ${(props) => props.$height}px;
`;

interface Props<T> {
  data: T[];
}

function PivotTable<T, _>({ data, columns }) {
  const [rows, setRows] = useState([]);
  const [filters, setFilters] = useState([]);
  // const [columns, setColumns] = useState([]);
  const [values, setValues] = useState([]);
  const [usePivot, setUsePivot] = useState(false);
  const [height, setHeight] = useState(0);
  const theme = useTheme();

  const windowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // determine the height after we draw the title of the window
    if (windowRef.current) {
      const windowDimensions =
        windowRef.current.parentElement?.parentElement?.parentElement?.getBoundingClientRect();
      if (windowDimensions) {
        const panelHeight = windowDimensions.height - theme.windowHeaderHeight;
        console.log("panelHeight", panelHeight);
        setHeight(panelHeight);
      }
    }
  }, []);
  return (
    <Div className="pivot-window-body" ref={windowRef} $height={height}>
      {/* <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>Total Records: {data.length}</div>
        <div>Total Columns: {Object.keys(data[0]).length}</div>
        <button
          id="btnPivot"
          onClick={() => {
            setUsePivot(!usePivot);
          }}
        >
          {usePivot ? "UnPivot" : "Pivot"}
        </button>
      </div> */}

      <div
        className="table-container"
        style={{
          display: "flex",
          flexDirection: "row",
          height: "100%",
          width: "100%",
          overflow: "hidden",
        }}
      >
        {usePivot ? (
          //   <Pivot
          //     data={data}
          //     rows={rows}
          //     setRows={setRows}
          //     values={values}
          //     setValues={setValues}
          //   />
          <div>pivot</div>
        ) : (
          <NormalTable data={data} columns={columns} />
        )}
        {/* {usePivot ? (
          <Configurator
            data={data}
            rows={rows}
            setRows={setRows}
            filters={filters}
            columns={columns}
            values={values}
            setValues={setValues}
          />
        ) : null} */}
      </div>
    </Div>
  );
}

export default PivotTable;
