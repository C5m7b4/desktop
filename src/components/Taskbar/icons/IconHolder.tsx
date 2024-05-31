import IMAGES from "../../../images/images";
import React, { useState, useEffect } from "react";
import styled, { useTheme } from "styled-components";

const Title = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: ${(props) => props.theme.fontSizes.larg};
  font-weight: ${(props) => props.theme.fontWeights.bold};
`;

interface IOnDrag {
  onDrag: (e: number, f: number) => void;
  image: string;
  label: string;
}

const IconHolder: React.FC<IOnDrag> = ({ onDrag, image, label }) => {
  const [mouseDown, setMouseDown] = useState(false);
  const theme = useTheme();

  useEffect(() => {
    const handleMouseUp = () => setMouseDown(false);

    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => onDrag(e.movementX, e.movementY);

    if (mouseDown) {
      window.addEventListener("mousemove", handleMouseMove);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [mouseDown, onDrag]);

  const handleMouseDown = () => setMouseDown(true);
  return (
    <div onMouseDown={handleMouseDown} style={{ cursor: "grab" }}>
      <img
        src={IMAGES[image]}
        style={{ height: "100px", color: theme.colors.text }}
        alt="missing icon"
      />
      <Title
        style={{ transition: "all .3s ease-out", color: theme.colors.text }}
      >
        {label}
      </Title>
    </div>
  );
};

export default IconHolder;
