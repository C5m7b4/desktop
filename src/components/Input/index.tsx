import styled from "styled-components";
import { ChangeEventHandler } from "react";

const Wrapper = styled.div`
  display: flex;
  width: 100%;
`;

const Cmp = styled.input`
  border: none;
  box-shadow: none;
  outline: none;
  color: black;
  font-size: 1rem;
  flex-grow: 1;
  padding: 8px 16px;
  background-color: rgb(248, 248, 255);
  border-radius: 8px;
`;

interface Props {
  value: number | string;
  onChange: ChangeEventHandler<HTMLInputElement>;
}

const Input = (props: Props) => {
  const { value, onChange } = props;
  return (
    <Wrapper>
      <Cmp type="text" value={value} onChange={onChange} />
    </Wrapper>
  );
};

export default Input;
