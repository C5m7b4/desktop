import { useState, useEffect } from "react";
import { IRow } from "./Rows";
import { IValue } from "./Values";

interface Props<T> {
  data: T[];
  rows: IRow[];
  values: IValue[];
  setValues: (v: IValue[]) => void;
}

function Fields<T>(props: Props<T>) {
  const { data, rows = [], values = [], setValues } = props;
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

  const handleCheck = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const index = usedFields.findIndex((f) => f === e.target.value);
    const copy = [...usedFields];
    copy.splice(index, 1);
    setUsedFields(copy);

    const valueIndex = values.findIndex((v) => v.label === e.target.value);
    const valuesCopy = [...values];
    valuesCopy.splice(valueIndex);
    setValues(valuesCopy);
  };

  const isChecked = (r: string) => {
    if (usedFields.includes(r)) {
      return true;
    }

    return false;
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
                <input
                  type="checkbox"
                  value={r}
                  style={{ backgroundColor: "#009879" }}
                  checked={isChecked(r)}
                  onChange={handleCheck}
                />
                <label className="draggable-item">{r}</label>
              </div>
            );
          })}
        </>
      ) : null}
    </>
  );
}

export default Fields;
