import Fields from "./dropTargets/Fields";
import Rows, { IRow } from "./dropTargets/Rows";
import Values, { IValue } from "./dropTargets/Values";
import { IColumn } from "./PivotGrid";
import Filters from "./dropTargets/Filters";
import Columns from "./dropTargets/Columns";
import { Container, SubContainer } from "./dropTargets/divs";
import {
  Div,
  SearchInput,
  FieldsContainer,
  ConfigurationColumns,
} from "./ConfiguratorDivs";
import { JoinIcon } from "../../svgs";
import styled from "styled-components";

interface Props<T> {
  data: T[];
  rows: IRow[];
  setRows: (e: IRow[]) => void;
  values: IValue[];
  setValues: (e: IValue[]) => void;
  columns: IColumn[];
}

const IconDiv = styled.div`
  margin-left: 10px;
  border: 1px solid black;
  padding: 2px 6px;
`;

function Configurator<T>(props: Props<T>) {
  const { data, rows, setRows, values, setValues, columns } = props;
  return (
    <Div className="configurator">
      <div>
        <SearchInput className="search-input">
          <input type="text" placeholder="search" />
          <IconDiv title="Join Columns">
            <JoinIcon scale={20} />
          </IconDiv>
        </SearchInput>
        <FieldsContainer className="fields-container" id="fields-container">
          <Fields
            data={data}
            rows={rows}
            values={values}
            setValues={setValues}
            setRows={setRows}
            columns={columns}
          />
        </FieldsContainer>
        <div style={{ margin: "10px 12px" }}>
          <div style={{ margin: "10px 12px" }}>
            Drag fields between areas below:
          </div>
          <ConfigurationColumns className="configuration-columns">
            <Container>
              <SubContainer>
                <Filters />
              </SubContainer>
              <SubContainer>
                <Rows rows={rows} setRows={setRows} />
              </SubContainer>
            </Container>
            <Container>
              <SubContainer>
                <Columns />
              </SubContainer>
              <SubContainer>
                <Values values={values} setValues={setValues} />
              </SubContainer>
            </Container>
          </ConfigurationColumns>
        </div>
      </div>
    </Div>
  );
}

export default Configurator;
