import styled from "styled-components";
import { useState } from "react";
import { UpArrow, DownArrow } from "../../svgs";

const Div = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50%;
  border-radius: 10px;
  box-shadow: 2px 2px 1px rgba(0, 0, 0, 0.2),
    inset 1px 1px 1px rgba(0, 0, 0, 0.2);
`;

const Entry = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 2px 5px;
`;

const Value = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Buttons = styled.div`
  display: flex;
  flex-direction: column;
`;

interface Props {
  min?: number;
  max?: number;
  value: number;
  onChange: (e: number) => void;
}

function NumberField(props: Props) {
  const { min = 0, max = 100, value = 0, onChange } = props;
  const [count, setCount] = useState(value);

  const increment = () => {
    if (count < max) {
      setCount(count + 1);
      if (onChange) {
        onChange(count + 1);
      }
    }
  };

  const decrement = () => {
    if (count > min) {
      setCount(count - 1);
      if (onChange) {
        onChange(count - 1);
      }
    }
  };

  return (
    <Div>
      <Entry>
        <Value>{count}</Value>
        <Buttons>
          <UpArrow scale={10} stroke={"#000000"} onClick={increment} />
          <DownArrow scale={10} stroke={"#000000"} onClick={decrement} />
        </Buttons>
      </Entry>
    </Div>
  );
}

export default NumberField;
