import { CheckboxIcon } from "../../svgs";
import { useTheme } from "styled-components";
import { useState } from "react";

interface Props {
  label: string;
  checked: boolean;
  onChange: (e: boolean) => void;
}

function Checkbox(props: Props) {
  const { label, checked = false, onChange } = props;
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
      <label>
        <CheckboxIcon
          fill={theme.colors.table.excel}
          innerFill={active ? theme.colors.table.excel : "transparent"}
          stroke={"#ffffff"}
        />
        {label}
      </label>
    </div>
  );
}

export default Checkbox;
