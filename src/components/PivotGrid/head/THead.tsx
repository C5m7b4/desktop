import { IRow } from "../dropTargets/Rows";
import { IValue } from "../dropTargets/Values";
import styled from "styled-components";

const TableHeader = styled.div`
  display: flex;
  border-bottom: 1px solid black;
  background-color: ${(props) => props.theme.colors.table.excel};
  color: ${(props) => props.theme.colors.table.thText};
  padding: 3px 8px;
`;

const TableHeaderCell = styled.div<{ $width: number; $align: string }>`
  width: ${(props) => props.$width}px;
  text-align: ${(props) => props.$align};
`;

interface Props {
  rows: IRow[];
  values: IValue[];
  calculateWidth: () => number;
}

function THead(props: Props) {
  const { rows, values, calculateWidth } = props;

  return (
    <div>
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
    </div>
  );
}

export default THead;
