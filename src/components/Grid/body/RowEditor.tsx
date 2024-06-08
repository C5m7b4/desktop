import styled from "styled-components";

const Div = styled.div`
  display: flex;
  justify-content: center;
  padding: 4px 8px;
  font-size: ${(props) => props.theme.fontSizes.menium};
  color: ${(props) => props.theme.colors.text};
`;

interface Props<T> {
  data: T;
}

function RowEditor<T>(props: Props<T>) {
  const { data } = props;

  return (
    <Div>
      <h2>RowEditor</h2>
    </Div>
  );
}

export default RowEditor;
