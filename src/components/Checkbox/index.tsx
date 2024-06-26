import { CheckboxIcon } from "../../svgs";
import { useTheme } from "styled-components";
import { useState } from "react";
import { CheckboxType } from "../../svgs/CheckboxIcon";
import styled from "styled-components";
import { useEffect } from "react";

const Label = styled.label`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  padding: 4px 10px;
`;

interface Props {
  label: string;
  checked: boolean;
  onChange: (e: boolean) => void;
  type?: CheckboxType;
}

function Checkbox(props: Props) {
  const { label, checked = false, onChange, type = "normal" } = props;
  const [active, setActive] = useState(checked);
  const theme = useTheme();

  useEffect(() => {
    setActive(checked);
  }, [checked]);

  const handleClick = () => {
    setActive(!active);
    if (onChange) {
      onChange(!active);
    }
  };

  return (
    <div onClick={handleClick}>
      <Label>
        <CheckboxIcon
          fill={theme.colors.table.excel}
          innerFill={active ? theme.colors.table.excel : "transparent"}
          stroke={"#ffffff"}
          type={type}
        />
        <div>{label}</div>
      </Label>
    </div>
  );
}

export default Checkbox;
