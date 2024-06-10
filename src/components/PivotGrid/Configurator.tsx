import styled from "styled-components";
import Fields from "./dropTargets/Fields";
import Rows, { IRow } from "./dropTargets/Rows";
import Values, { IValue } from "./dropTargets/Values";
import { groupData } from "../../mockData/groupData";
import { pivotData } from "../../mockData/pivotData";
import { Box } from "../../utils/Box";
import { groupFn } from "../../utils/arrayUtils";

const Div = styled.div`
  border: 1px solid black;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
  background-color: ${(props) => props.theme.colors.bg};
  color: ${(props) => props.theme.colors.text};
`;

const SearchInput = styled.div`
  margin: 10px 12px;
`;

const FieldsContainer = styled.div`
  border: 1px solid black;
  margin: 10px 12px;
  max-height: 300px;
  overflow-y: scroll;
`;

const ConfigurationColumns = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 5px;
`;

const FiltersContainer = styled.div`
  min-height: 100px;
  background-color: white;
  transition: all 0.4s ease;
`;

interface Props<T> {
  data: T[];
  rows: IRow[];
  setRows: (e: IRow[]) => void;
  values: IValue[];
  setValues: (e: IValue[]) => void;
}

const people = [
  { name: "Alice", age: 28, town: "nashville", job: "manager" },
  { name: "Tom", age: 28, town: "hermitage", job: "manager" },
  { name: "Bob", age: 30, town: "nashville", job: "dev" },
  { name: "Eve", age: 28, town: "nashville", job: "dev" },
  { name: "Bill", age: 28, town: "nashville", job: "manager" },
  { name: "Tina", age: 30, town: "hermitage", job: "dev" },
  { name: "Evan", age: 30, town: "hermitage", job: "manager" },
  { name: "Cindy", age: 28, town: "hermitage", job: "manager" },
];

function Configurator<T>(props: Props<T>) {
  const testFn = () => {
    const peopleByAge = [];
    people.forEach((person) => {
      const age = person.age;
      if (!peopleByAge[age]) {
        peopleByAge[age] = [];
      }
      peopleByAge[age].push(person);
    });
    // console.log(peopleByAge);
    // const result = Box(people)
    //   .map((x) => groupFn(x, ["age", "town", "job"]))
    //   .fold((x) => x);
    const result = groupFn(people, ["age", "town", "job"]);
    // console.log(result);
    const grouped = Box(pivotData)
      .map((x) => groupFn(x, ["Customer", "Date", "Product"]))
      .fold((x) => x);
    console.log("grouped", grouped);
    //console.log(pivotBy(classNames, "class", "category", "count"));
    // const grouped = [];
    // groupData.forEach((group) => {
    //   const state = group.state;
    //   if (!grouped[state]) {
    //     grouped[state] = [];
    //   }
    //   grouped[state].push(group);
    // });
    // console.log(grouped);
  };
  const { data, rows, setRows, values, setValues } = props;
  return (
    <Div>
      <h3>Pivot Grid Fields</h3>
      <button onClick={testFn}>Click Me</button>
      <div>
        <SearchInput className="search-input">
          <input type="text" placeholder="search" />
        </SearchInput>
        <FieldsContainer className="fields-container" id="fields-container">
          <Fields
            data={data}
            rows={rows}
            values={values}
            setValues={setValues}
            setRows={setRows}
          />
        </FieldsContainer>
        <div style={{ margin: "10px 12px" }}>
          <div style={{ margin: "10px 12px" }}>
            Drag fields between areas below:
          </div>
          <ConfigurationColumns className="configuration-columns">
            <div
              style={{
                borderRight: "1px solid black",
                paddingRight: "10px",
              }}
            >
              <div>Filters</div>
              <FiltersContainer className="filters-container"></FiltersContainer>
              <Rows rows={rows} setRows={setRows} />
            </div>
            <div
              style={{
                borderRight: "1px solid black",
                paddingRight: "10px",
              }}
            >
              <div>Columns</div>
              <FiltersContainer className="filters-container"></FiltersContainer>
              <Values values={values} setValues={setValues} />
            </div>
          </ConfigurationColumns>
        </div>
      </div>
    </Div>
  );
}

export default Configurator;
