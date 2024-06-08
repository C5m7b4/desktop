import { IRow } from "../dropTargets/Rows";
import { IValue } from "../dropTargets/Values";
import styled, { useTheme } from "styled-components";

export const Th = styled.th<{
  $width?: number;
  $align?: number;
}>`
  display: grid;
  grid-template-columns: 1fr 20px 2px;
  background-color: ${(props) => props.theme.colors.table.excel};
  color: ${(props) => props.theme.colors.table.thText};
  font-weight: ${(props) => props.theme.fontWeights.bold};
  padding: 0 0 0 5px;
  width: ${(props) => props.$width}px;
  max-width: ${(props) => props.$width}px;
  overflow: clip;
  text-overflow: ellipsis;
  text-align: ${(props) =>
    props.$align === 0 ? "left" : props.$align === 1 ? "center" : "right"};
`;
interface Props {
  rows: IRow[];
  setShowContextMenu: (b: boolean) => void;
  handleSortDirection: (e: React.MouseEvent<HTMLSpanElement>, r: IRow) => void;
  values: IValue[];
  handleContextMenu: (e: React.MouseEvent<HTMLDivElement>, f: string) => void;
}

const Thead: React.FC<Props> = ({
  rows = [],
  setShowContextMenu,
  handleSortDirection,
  values,
  handleContextMenu,
}) => {
  const theme = useTheme();
  return (
    <thead>
      <tr style={{ display: "flex" }}>
        <Th style={{ width: "25px" }}></Th>
        {rows &&
          rows.map((r, i) => {
            if (i > 0) {
              // only print out the first row becuase everything else will be nested
              return;
            }
            return (
              <Th
                key={`th-${i}`}
                onContextMenu={(e) => {
                  e.preventDefault();
                  setShowContextMenu(false);
                }}
              >
                <span> {r.label}</span>
                <span onClick={(e) => handleSortDirection(e, r)}>
                  {r.direction == "asc" ? (
                    <ion-icon name="arrow-round-down"></ion-icon>
                  ) : (
                    <ion-icon name="arrow-round-up"></ion-icon>
                  )}
                </span>
              </Th>
            );
          })}
        {values &&
          values.map((v, idx) => (
            <Th
              key={`th-v-${idx}`}
              onContextMenu={(e) => {
                handleContextMenu(e, v.label);
              }}
            >
              {v.alias ? v.alias : `${v.aggregator} of ${v.label}`}
            </Th>
          ))}
      </tr>
    </thead>
  );
};

export default Thead;
