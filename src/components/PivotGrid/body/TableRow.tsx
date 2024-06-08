import { useState, useEffect } from "react";
import { Box } from "../../../utils/Box";
import { unique } from "../../../utils/unique";
import { IValue } from "../dropTargets/Values";
import { IRow } from "../dropTargets/Rows";
// import { sort } from "../../../utils/sort";
import { Tr } from "../../Grid/divs";
import styled from "styled-components";

export const Td = styled.td<{ $width?: number; $align?: number }>`
  font-weight: ${(props) => props.theme.fontWeights.normal};
  padding: 5px 15px 5px 5px;
  width: ${(props) => props.$width}px;
  max-width: ${(props) => props.$width}px;
  overflow: clip;
  text-overflow: ellipsis;
  text-align: ${(props) =>
    props.$align === 0 ? "left" : props.$align === 1 ? "center" : "right"};
`;

interface Props<T> {
  i: number;
  idx: number;
  record: T;
  values: IValue[];
  data: T[];
  row: IRow;
  rows: IRow[];
}

function TableRow<T>(props: Props<T>) {
  const [expanded, setExpanded] = useState(true);
  const [subrows, setSubrows] = useState([]);
  const { i, idx, record, values, data, row, rows } = props;

  useEffect(() => {
    getSubrows(row.label, record[row.label], rows[i + 1]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rows]);

  const getSubrows = (field, value, subvalue) => {
    if (!subvalue) return [];
    const subkey = subvalue.label;
    const result = Box(data)
      .map((x) => x.filter((y) => y[field] == value))
      .map((x) => unique(x, subkey))
      .fold((x) => x);
    setSubrows(result);
  };

  const toggle = () => {
    setExpanded(!expanded);
  };

  const getSubValuesSum = (key1, value1, key2, value2, aggregateKey) => {
    const result = Box(data)
      .map((x) => x.filter((y) => y[key1] == value1))
      .map((x) => x.filter((y) => y[key2] == value2))
      .map((x) =>
        x.reduce((acc, cur) => {
          return acc + cur[aggregateKey];
        }, 0)
      )
      .fold((x) => x);
    return result;
  };

  const getSubValueCount = (key1, value1, key2, value2) => {
    const result = Box(data)
      .map((x) => x.filter((y) => y[key1] == value1))
      .map((x) => x.filter((y) => y[key2] == value2))
      .map((x) =>
        x.reduce((acc) => {
          return acc + 1;
        }, 0)
      )
      .fold((x) => x);
    return result;
  };

  return (
    // find out if there are any subrows for this row
    <>
      <Tr key={`tr-td-${i}-${idx}`}>
        {subrows.length > 0 ? (
          <Td className="sub-row-indicator" onClick={toggle}>
            <ion-icon name="add-circle-outline"></ion-icon>
          </Td>
        ) : (
          <Td></Td>
        )}
        {Object.keys(record).map((k, index) => {
          if (k === row.label) {
            return <Td key={`fd-r-${idx}-${index}`}>{record[k]}</Td>;
          }
        })}

        {/* render out all value filter fields */}
        {values.map((v, index) => {
          const sumOfCell = v.fn(data, row.label, record[row.label], v.label);
          return (
            <Td key={`tr-Td-${i}-${idx}-${index}`}>
              {v.formatter ? v.formatter(sumOfCell) : sumOfCell}
            </Td>
          );
        })}
      </Tr>
      {expanded &&
        subrows.map((sr, index) => {
          return (
            <tr key={`sr-${i}-${idx}-${index}`}>
              <Td></Td>
              {Object.keys(sr).map((k, index) => {
                if (k === rows[i + 1]?.label) {
                  return (
                    <Td key={`sr-r-${idx}-${index}`}>
                      {`${sr[k]} - ${sr["Order ID"]}`}
                    </Td>
                  );
                }
              })}
              {values.map((v, idx2) => {
                let sum = 0;
                if (v.aggregator == "Sum") {
                  sum = getSubValuesSum(
                    rows[0].label,
                    sr[rows[0].label],
                    rows[1].label,
                    sr[rows[1].label],
                    v.label
                  );
                } else if (v.aggregator == "Count") {
                  sum = getSubValueCount(
                    rows[0].label,
                    sr[rows[0].label],
                    rows[1].label,
                    sr[rows[1].label]
                  );
                }

                return (
                  <Td key={`sr-v-${i}-${idx}-${idx2}`}>
                    {v.formatter ? v.formatter(sum) : sum}
                  </Td>
                );
              })}
            </tr>
          );
        })}
    </>
  );
}

export default TableRow;
