import { useState, useEffect } from "react";
import { IRow } from "./Rows";
import { IValue } from "./Values";
// import Checkbox from "../../Checkbox";
import { IColumn } from "../PivotGrid";

interface Props<T> {
  data: T[];
  rows: IRow[];
  values: IValue[];
  setValues: (v: IValue[]) => void;
  setRows: (e: IRow[]) => void;
  columns: IColumn[];
}

function Fields<T>(props: Props<T>) {
  const { data, rows = [], values = [], setValues, setRows, columns } = props;
  const [usedFields, setUsedFields] = useState<string[]>([]);

  useEffect(() => {
    const valueFields = values.map((v) => v.label);
    const rowFields = rows.map((r) => r.label);
    setUsedFields([...rowFields, ...valueFields]);
  }, [rows, values]);

  const handleDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    fieldType: string
  ) => {
    e.dataTransfer.setData("fieldType", fieldType);
    e.dataTransfer.effectAllowed = "copyMove";
    e.currentTarget.style.border = "1px solid #009879";
    e.currentTarget.style.opacity = "0.8";
  };

  const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    const index = usedFields.findIndex((f) => f === e.target.value);
    if (index >= 0) {
      const copy = [...usedFields];
      copy.splice(index, 1);
      setUsedFields(copy);
    }

    const valueIndex = values.findIndex((v) => v.label === e.target.value);
    if (valueIndex >= 0) {
      const valuesCopy = [...values];
      valuesCopy.splice(valueIndex);
      setValues(valuesCopy);
    }

    const rowIndex = rows.findIndex((r) => r.label === e.target.value);
    if (rowIndex >= 0) {
      const rowsCopy = [...rows];
      rowsCopy.splice(rowIndex);
      setRows(rowsCopy);
    }
  };

  const isChecked = (r: string) => {
    if (usedFields.includes(r)) {
      return true;
    }

    return false;
  };

  const getAlias = (columnName: string) => {
    const column = columns.filter((c) => c.columnName === columnName)[0];
    if (column) {
      return column.title;
    } else {
      return "";
    }
  };

  return (
    <>
      {data && data.length > 0 ? (
        <>
          {Object.keys(data[0]).map((r: any, i: number) => {
            return (
              <div
                className="draggable-item"
                key={`field-${i}`}
                draggable
                onDragStart={(e) => handleDragStart(e, r)}
              >
                {/* <Checkbox
                  label={r}
                  checked={isChecked(r)}
                  onChange={handleCheck}
                /> */}
                <input
                  type="checkbox"
                  value={r}
                  style={{ backgroundColor: "#009879" }}
                  checked={isChecked(r)}
                  onChange={handleCheck}
                />
                <label className="draggable-item-label">
                  {r} - {getAlias(r)}
                </label>
              </div>
            );
          })}
        </>
      ) : null}
    </>
  );
}

export default Fields;
