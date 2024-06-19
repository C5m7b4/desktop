import styled from "styled-components";

export const Div = styled.div`
  border: 1px solid black;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
  background-color: ${(props) => props.theme.colors.bg};
  color: ${(props) => props.theme.colors.text};
  height: 100%;
`;

export const SearchInput = styled.div`
  margin: 10px 12px;
`;

export const FieldsContainer = styled.div`
  border: 1px solid black;
  margin: 10px 12px;
  height: 200px;
  max-height: 300px;
  overflow-y: scroll;
`;

export const ConfigurationColumns = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 5px;
`;
