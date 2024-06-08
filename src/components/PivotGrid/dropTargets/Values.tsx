import {
  aggregateOptions,
  arrAvg,
  arrCount,
  arrSum,
} from "../../../utils/arrayUtils";
import styled from "styled-components";

const FiltersContainer = styled.div`
  min-height: 100px;
  background-color: white;
  transition: all 0.4s ease;
  border: 1px solid black;
`;

export interface IValue {
  aggregator: string;
  fn: Function;
  label: string;
  alias?: string;
  formatter?: Function;
}

interface Props {
  values: IValue[];
  setValues: (v: IValue[]) => void;
}

const Values: React.FC<Props> = ({ values, setValues }) => {
  const handleSelectChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
    label: string
  ) => {
    const selectedAggregate = values.filter((v) => v.label === label)[0];
    const index = values.findIndex((v) => v.label === label);
    let currentFn: Function = arrSum;
    let currentDescription = "Sum";
    switch (e.target.value) {
      case "Count":
        currentFn = arrCount;
        currentDescription = "Count";
        break;
      case "Sum":
        currentFn = arrSum;
        currentDescription = "Sum";
        break;
      case "Avg":
        currentFn = arrAvg;
        currentDescription = "Avg";
        break;
      default:
        currentFn = arrSum;
        break;
    }
    const newValue = {
      ...selectedAggregate,
      aggregator: currentDescription,
      fn: currentFn,
    };
    const newValues = [...values];
    newValues.splice(index, 1, newValue);
    setValues(newValues);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    const fieldType = e.dataTransfer.getData("fieldType");
    console.log("fieldType", fieldType);
    const newValue = {
      aggregator: "Sum",
      label: fieldType,
      fn: arrSum,
    };
    const newValues = [...values, newValue];
    setValues(newValues);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDragLeave = () => {};

  return (
    <>
      <div>Values</div>
      <FiltersContainer
        id="filter-values"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onDragLeave={handleDragLeave}
      >
        {values.map((v, i) => (
          <div
            key={`value-${i}`}
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}
          >
            <span>{v.label}</span>
            <span>
              <select
                value={v.aggregator}
                onChange={(e) => handleSelectChange(e, v.label)}
              >
                {aggregateOptions.map((o, i) => {
                  return (
                    <option key={`option-${i}`} value={o.label}>
                      {o.label}
                    </option>
                  );
                })}
              </select>
            </span>
          </div>
        ))}
      </FiltersContainer>
    </>
  );
};

export default Values;
