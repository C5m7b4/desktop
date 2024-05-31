import styled from "styled-components";
import { useState } from "react";

const Label = styled.label`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  cursor: pointer;
`;

const Switch = styled.div<{ $switch?: string }>`
  position: relative;
  width: 30px;
  height: 16px;
  background: ${(props) => props.color || "#c7c6c1"};
  border-radius: 16px;
  transform: rotate(90deg);
  padding: 2px;
  transition: 300ms all;

  &:before {
    transition: 300ms all;
    content: "";
    position: absolute;
    width: 14px;
    height: 14px;
    border-radius: 35px;
    top: 50%;
    left: 2px;
    background: ${(props) => props.$switch || "#fff"};
    transform: translate(0, -50%);
  }
`;

const Input = styled.input`
  opacity: 0;
  position: absolute;

  &:checked + ${Switch} {
    background: ${(props) => props.color || "blue"};

    &:before {
      transform: translate(12px, -50%);
    }
  }
`;

interface Props {
  topLabel?: string;
  bottomLabel?: string;
  activeColor?: string;
  disabledColor?: string;
  switchColor?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const VerticalSwitch: React.FC<Props> = ({
  topLabel = "",
  bottomLabel = "",
  activeColor = "#648dd1",
  disabledColor = "#a8a7a2",
  switchColor = "#fff",
  onChange,
}) => {
  const [checked, setChecked] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(e.target.checked);
    onChange(e);
  };

  return (
    <Label>
      <span>{topLabel}</span>
      <Input
        type="checkbox"
        checked={checked}
        onChange={handleChange}
        color={activeColor}
      />
      <Switch color={disabledColor} $switch={switchColor} />
      <span>{bottomLabel}</span>
    </Label>
  );
};

export default VerticalSwitch;
