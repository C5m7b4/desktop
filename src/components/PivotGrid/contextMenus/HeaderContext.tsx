import React from "react";
import styled from "styled-components";

const Div = styled.div`
  border-bottom: 1px solid black;
  margin-bottom: 5px;
  padding: 2px 15px;
  cursor: pointer;
  transition: all 0.4s ease;
  &:hover {
    background-color: ${(props) =>
      props.theme.colors.table.hoverBackgroundColor};
    color: ${(props) => props.theme.colors.table.hoverTextColor};
  }
`;

interface Props {
  top: number;
  left: number;
  column: string;
  handleAliasClick: (c: string) => void;
}

function HeaderContext(props: Props) {
  const { top, left, column, handleAliasClick } = props;

  const handleFormatterClick = (c: string) => {};

  const style = {
    border: "1px solid black",
    position: "absolute",
    top: `${top}px`,
    left: `${left}px`,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    boxShadow: "2px 4px 5px rgba(0, 0, 0, 0.3)",
  };
  return (
    <div style={style as React.CSSProperties}>
      <Div className="header-element" onClick={() => handleAliasClick(column)}>
        Create Alias
      </Div>
      <Div
        className="header-element"
        onClick={() => handleFormatterClick(column)}
      >
        Add Formatter
      </Div>
    </div>
  );
}

export default HeaderContext;
