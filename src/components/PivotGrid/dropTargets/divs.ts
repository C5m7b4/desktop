import styled from "styled-components";

export const FiltersContainer = styled.div`
  min-height: 100px;
  background-color: white;
  transition: all 0.4s ease;
  border: 1px solid black;
  box-shadow: 2px 4px 6px rgba(0, 0, 0, 0.2);
`;

export const Title = styled.div`
  background-color: ${(props) => props.theme.colors.table.excel};
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  color: #ffffff;
  padding: 3px 8px;
`;

export const Container = styled.div`
  border-right: 1px solid black;
  padding-right: 10px;
`;

export const SubContainer = styled.div`
  margin-bottom: 10px;
`;
