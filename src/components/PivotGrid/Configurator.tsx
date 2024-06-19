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

interface Props<T> {
  data: T[];
  rows: IRow[];
  setRows: (e: IRow[]) => void;
  values: IValue[];
  setValues: (e: IValue[]) => void;
  columns: IColumn[];
}

function Configurator<T>(props: Props<T>) {
  const { data, rows, setRows, values, setValues, columns } = props;
  return (
    <Div className="configurator">
      <div
        style={{
          width: "100%",
          textAlign: "center",
          fontSize: "1.0rem",
          fontWeight: "bold",
        }}
      >
        Pivot Grid Fields
      </div>
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
