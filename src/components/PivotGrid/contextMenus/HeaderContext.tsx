import React, { useState } from "react";
import styled from "styled-components";
import Select, { SelectProps } from "../../Select";
import { formatNumber, formatCurrency } from "../formatters";
import { IValue } from "../dropTargets/Values";
import NumberField from "../../NumberField";
import Checkbox from "../../Checkbox";

const Div = styled.div`
  border-bottom: 1px solid black;
  margin-bottom: 5px;
  padding: 5px 15px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  z-index: 100;
  transition: all 0.4s ease;
  &:hover {
    background-color: ${(props) =>
      props.theme.colors.table.hoverBackgroundColor};
    color: ${(props) => props.theme.colors.table.hoverTextColor};
  }
`;

const H3 = styled.div`
  padding: 5px 15px;
`;

interface Props {
  top: number;
  left: number;
  column: string;
  handleAliasClick: (c: string) => void;
  values: IValue[];
  setValues: (i: IValue[]) => void;
}

function HeaderContext(props: Props) {
  const { top, left, column, handleAliasClick, values, setValues } = props;
  const [isPercentage, setIsPercentage] = useState(false);

  const handleFormatterClick = (c: SelectProps) => {
    const selectedValue = values.filter((v) => v.label === column)[0];
    const copy = [...values];
    const index = values.findIndex((v) => v.label === column);
    switch (c.value) {
      case "formatNumber":
        selectedValue.formatter = formatNumber;
        break;
      case "formatCurrency":
        selectedValue.formatter = formatCurrency;
        break;
      case "remove":
        selectedValue.formatter = undefined;
        break;
      default:
        selectedValue.formatter = formatNumber;
        break;
    }
    copy.splice(index, 1, selectedValue);
    setValues(copy);
  };

  const formatters: SelectProps[] = [
    {
      label: "Format Number",
      value: "formatNumber",
    },
    {
      label: "Format Currency",
      value: "formatNumber",
    },
    {
      label: "Remove formatter",
      value: "remove",
    },
  ];

  const style = {
    border: "1px solid black",
    position: "absolute",
    top: `${top}px`,
    left: `${left}px`,
    width: "200px",
    backgroundColor: "rgba(255, 255, 255, 1)",
    boxShadow: "2px 4px 5px rgba(0, 0, 0, 0.3)",
  };
  return (
    <div style={style as React.CSSProperties}>
      <Div className="header-element" onClick={() => handleAliasClick(column)}>
        Create Alias
      </Div>
      <div>
        <H3>Select a Formatter</H3>
        <Select
          onChange={handleFormatterClick}
          placeholder="Formatters"
          options={formatters}
        />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <H3>Decimal Places</H3>
        <NumberField />
      </div>
      <Checkbox
        label="Percentage"
        checked={isPercentage}
        onChange={setIsPercentage}
      />
    </div>
  );
}

export default HeaderContext;
