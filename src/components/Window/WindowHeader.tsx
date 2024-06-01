import React from "react";
import { useState, useEffect } from "react";
import styled from "styled-components";

const Div = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 4px;
  background-color: ${(props) => props.theme.colors.window.header};
  height: ${(props) => props.theme.windowHeaderHeight}px;
  user-select: none;
`;

const Circle = styled.div<{ $color: string }>`
  width: 15px;
  height: 15px;
  border-radius: 50%;
  margin-right: 5px;
  background-color: ${(props) => props.$color};
  cursor: pointer;
`;

const Buttons = styled.div`
  display: flex;
`;

interface Props {
  onDrag: (x: number, y: number) => void;
  title: string;
  handleClose: () => void;
  handleMinimize: () => void;
}

const WindowHeader: React.FC<Props> = ({
  onDrag,
  title,
  handleClose,
  handleMinimize,
}) => {
  const [mouseDown, setMouseDown] = useState(false);

  useEffect(() => {
    const handleMouseUp = () => setMouseDown(false);

    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  useEffect(() => {
    const ratio = window.devicePixelRatio;

    const handleMouseMove = (e: MouseEvent) => {
      onDrag(e.movementX / ratio, e.movementY / ratio);
    };

    if (mouseDown) {
      window.addEventListener("mousemove", handleMouseMove);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [mouseDown, onDrag]);

  const handleMouseDown = () => setMouseDown(true);

  return (
    <Div onMouseDown={handleMouseDown}>
      <div>{title}</div>
      <Buttons>
        <Circle $color={"orange"} onClick={handleMinimize} />
        <Circle $color={"red"} onClick={handleClose} />
      </Buttons>
    </Div>
  );
};

export default WindowHeader;
