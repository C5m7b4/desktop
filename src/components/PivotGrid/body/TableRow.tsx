import { useState } from "react";
import styled from "styled-components";
import { Td } from "../Pivot";
import { IRow } from "../dropTargets/Rows";
import { BoxPlusIcon, BoxMinusIcon } from "../../../svgs";

const Div = styled.div`
  display: flex;
  width: 100%;
  border-bottom: 1px solid black;
`;

interface Props<T> {
  rows: IRow[];
  i: number;
  calculateWidth: () => number;
  r: string;
  buildSubRows: (subRows: T[], i: number) => React.ReactNode;
  buildAggregates: (row: T) => React.ReactNode;
  data: T[];
}

function TableRow<T>(props: Props<T>) {
  const [expanded, setExpanded] = useState(false);
  const { rows, i, calculateWidth, r, buildSubRows, buildAggregates, data } =
    props;

  const handleClick = () => {
    setExpanded(!expanded);
  };

  return (
    <div key={`table-row-container-${i}`}>
      <Div key={`tr-${i}`}>
        {rows.length > 1 ? (
          <Td $align={"left"} $bold={true} $width={calculateWidth() as number}>
            <span onClick={handleClick}>
              {expanded ? <BoxMinusIcon /> : <BoxPlusIcon />}
            </span>
            <span>{r}</span>
          </Td>
        ) : (
          <Td $align={"left"} $bold={false} $width={calculateWidth() as number}>
            {r}
          </Td>
        )}

        {buildAggregates(data[r])}
      </Div>
      {expanded ? buildSubRows(data[r], i) : null}
    </div>
  );
}

export default TableRow;
