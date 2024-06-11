import { CheckboxIcon } from "../../svgs";
import { useTheme } from "styled-components";
import { useState } from "react";
import { CheckboxType } from "../../svgs/CheckboxIcon";
import styled from "styled-components";

const Label = styled.label``;

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
        <span>{label}</span>
      </Label>
    </div>
  );
}

export default Checkbox;
