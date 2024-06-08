import { Box } from "../../../utils/Box";
import { unique } from "../../../utils/unique";
import { sort } from "../../../utils/sort";
import GT from "./GT";
import TableRow from "./TableRow";
import { IRow } from "../dropTargets/Rows";
import { IValue } from "../dropTargets/Values";
import styled from "styled-components";

const TBody = styled.tbody`
  transition: all 0.3s ease-out;
  border-bottom: 1px solid lightgray;
`;

interface Props<T> {
  rows: IRow[];
  values: IValue[];
  data: T[];
}

function Tbody<T>(props: Props<T>) {
  const { rows, values, data } = props;
  return (
    <TBody>
      {rows.map((row, i) => {
        // if there are more than one row specified, skip all remaining rows so they can be
        // nested inside the parent row
        if (i > 0) {
          return;
        }
        // get all unique records for the first row
        const filtered: T[] = Box(data)
          .map((x: T[]) => unique(x, row.label as keyof T))
          .map((x: T[]) => sort(x, row.label))
          //   .map((x) =>
          //     x.filter((y) => {
          //       // only render rows that are in the inclusion list if there is on
          //       // this way the user can opt to see only the records that they want to see
          //       // and not any others
          //       if (row.inclusions) {
          //         return row.inclusions.includes(y[row.label]);
          //       } else {
          //         return y[row.label];
          //       }
          //     })
          //  )
          .fold((x: T[]) => x);

        return filtered.map((record, idx) => {
          return (
            <TableRow
              key={`tr-${idx}`}
              i={i}
              idx={idx}
              data={data}
              values={values}
              row={row}
              rows={rows}
              record={record}
            />
          );
        });
      })}
      <GT values={values} data={data} />
    </TBody>
  );
}

export default Tbody;
