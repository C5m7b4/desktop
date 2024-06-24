import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import Select, { SelectProps } from "../../Select";
import { formatNumber, formatCurrency } from "../formatters";
import { IValue } from "../dropTargets/Values";
import NumberField from "../../NumberField";
import Checkbox from "../../Checkbox";
import Button from "../../Button";
import { createPortal } from "react-dom";

const Div = styled.div`
  border-bottom: 1px solid black;
  margin-bottom: 5px;
  padding: 5px 15px;
  font-size: ${(props) => props.theme.fontSizes.normal};
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
  font-size: ${(props) => props.theme.fontSizes.normal};
`;

const Buttons = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px 8px;
`;

interface Props {
  top: number;
  left: number;
  column: string;
  handleAliasClick: (c: string) => void;
  values: IValue[];
  setValues: (i: IValue[]) => void;
  close: () => void;
  showHeaderContextMenu: boolean;
}

function HeaderContext(props: Props) {
  const {
    top,
    left,
    column,
    handleAliasClick,
    values,
    setValues,
    close,
    showHeaderContextMenu,
  } = props;
  const [isPercentage, setIsPercentage] = useState(false);
  const [decimals, setDecimals] = useState(0);
  const [selected, setSelected] = useState("");

  const windowRef = useRef<HTMLDivElement>(null);

  const handleClick = (e: MouseEvent) => {
    if (windowRef.current) {
      if (!windowRef.current.contains(e.target as HTMLDivElement)) {
        close();
      }
    }
  };

  useEffect(() => {
    if (windowRef.current) {
      window.addEventListener("click", handleClick);
    }

    // lets see if there is anything already available on this value or not
    const selectedValue = values.filter((v) => v.label === column)[0];
    console.log(selectedValue);
    if (selectedValue.isPercentage) {
      setIsPercentage(true);
    } else {
      setIsPercentage(false);
    }
    if (selectedValue.decimals) {
      setDecimals(selectedValue.decimals);
    }
    if (selectedValue.formatter) {
      const args = selectedValue.formatter.name.split(/(?=[A-Z])/);
      const first = args[0].charAt(0).toUpperCase() + args[0].slice(1);
      setSelected(`${first} ${args[1]}`);
    }

    return () => {
      window.removeEventListener("click", handleClick);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      value: "formatCurrency",
    },
    {
      label: "Remove formatter",
      value: "remove",
    },
  ];

  const handleOk = () => {
    const selectedValue = values.filter((v) => v.label === column)[0];
    const copy = [...values];
    const index = values.findIndex((v) => v.label === column);
    const newValue = { ...selectedValue, decimals, isPercentage };
    copy.splice(index, 1, newValue);
    setValues(copy);
    close();
  };

  const style = {
    border: "1px solid black",
    position: "absolute",
    top: `${top}px`,
    left: `${left}px`,
    width: "200px",
    backgroundColor: "rgba(255, 255, 255, 1.0)",
    boxShadow: "2px 4px 5px rgba(0, 0, 0, 0.3)",
    zIndex: "999",
  };
  return (
    <>
      {showHeaderContextMenu ? (
        <>
          {createPortal(
            <div ref={windowRef} style={style as React.CSSProperties}>
              <Div
                className="header-element"
                onClick={() => handleAliasClick(column)}
              >
                Create Alias
              </Div>
              <div>
                <H3>Select a Formatter</H3>
                <Select
                  onChange={handleFormatterClick}
                  placeholder="Formatters"
                  options={formatters}
                  value={selected}
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
                <NumberField
                  value={decimals}
                  onChange={(e) => setDecimals(e)}
                />
              </div>
              <div
                style={{
                  margin: "10px 10px",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Checkbox
                  label="Percentage"
                  checked={isPercentage}
                  onChange={setIsPercentage}
                />
              </div>
              <Buttons>
                <Button
                  label="OK"
                  onClick={handleOk}
                  type="normal"
                  size="small"
                />
              </Buttons>
            </div>,
            document.body
          )}
        </>
      ) : null}
    </>
  );
}

export default HeaderContext;
