import styled from "styled-components";

const Table = styled.table`
  width: 100%;
  height: 100%;
  border: 1px solid black;
  border-collapse: collapse;
  font-size: ${(props) => props.theme.fontSizes.normal};
  border-radius: 5px 5px 0 0;
  overflow: hidden;
  transition: ${(props) => props.theme.transition};
  thead {
    display: block;
    th {
      background-color: ${(props) => props.theme.colors.table.excel};
      color: ${(props) => props.theme.colors.table.thText};
      text-align: left;
      font-weight: ${(props) => props.theme.fontWeights.bold};
      padding: 5px 15px 5px 5px;
    }
  }
  tbody {
    display: block;
    overflow-y: auto;
    overflow-x: hidden;
    tr {
      transition: ${(props) => props.theme.transition};
      border-bottom: ${(props) => props.theme.colors.table.rowBottomLineColor};
      &:nth-of-type(even) {
        background-color: ${(props) => props.theme.colors.table.oddRows};
        color: ${(props) => props.theme.colors.table.excel};
      }
      &:last-of-type {
        border-bottom: 2px solid ${(props) => props.theme.colors.table.excel};
      }
    }
  }
`;

const NormalTable = ({ data, columns }) => {
  return (
    <Table>
      <thead>
        <tr>
          {Object.keys(data[0]).map((key, i) => (
            <th key={`thead-${i}`}>{key}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((r, i) => (
          <tr key={`tbody - tr - ${i}}`}>
            {Object.values(r).map((v, idx) => (
              <td key={`td-${idx}`}>{v}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default NormalTable;
