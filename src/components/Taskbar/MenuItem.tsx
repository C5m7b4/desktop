import React, { useState } from "react";
import styled from "styled-components";
import { IChildNodes } from "./StartMenu";
import SubMenuItem from "./SubMenuItem";

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
  childNodes?: IChildNodes[];
}

const MenuItem: React.FC<Props> = ({
  label,
  Icon,
  roundTop = false,
  scale = 20,
  onClick,
  childNodes = [],
}) => {
  const [open, setOpen] = useState(false);
  const [points, setPoints] = useState({
    x: 0,
    y: 0,
  });

  const handleClick = (e: React.MouseEvent<HTMLDivElement>, label: string) => {
    console.log(e);
    setPoints({
      x: e.clientX,
      y: e.clientY,
    });
    if (onClick) {
      onClick(label);
    }
    setOpen(!open);
  };

  return (
    <Div onClick={(e) => handleClick(e, label)}>
      <div style={{ marginTop: "5px" }}>{label}</div>
      <div>
        <Icon scale={scale} $roundTop={roundTop} style={{ marginTop: "3px" }} />
      </div>
      {open && childNodes.length > 0 ? (
        <SubMenuItem childNodes={childNodes} isOpen={open} bottom={points.y} />
      ) : null}
    </Div>
  );
};

export default MenuItem;
