import React from "react";
import styled from "styled-components";

const Div = styled.div<{ $roundTop: boolean }>`
  display: flex;
  padding: 2px 10px;
  justify-content: space-between;
  cursor: pointer;
  transition: all 0.3s ease-out;
  border-top-left-radius: ${(props) => (props.$roundTop ? "8px" : 0)};
  border-top-right-radius: ${(props) => (props.$roundTop ? "8px" : 0)};
  &:hover {
    background-color: #eee;
  }
`;

interface Props {
  label: string;
  Icon?: React.ComponentType;
  roundTop?: boolean;
  scale?: number;
  onClick?: (e: string) => void;
}

const MenuItem: React.FC<Props> = ({
  label,
  Icon,
  roundTop = false,
  scale = 20,
  onClick,
}) => {
  const handleClick = (e: string) => {
    if (onClick) {
      onClick(e);
    }
  };
  return (
    <Div onClick={() => handleClick(label)}>
      <div style={{ marginTop: "5px" }}>{label}</div>
      <div>
        <Icon scale={scale} $roundTop={roundTop} style={{ marginTop: "3px" }} />
      </div>
    </Div>
  );
};

export default MenuItem;
