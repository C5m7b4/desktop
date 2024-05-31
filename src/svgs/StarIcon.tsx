import React from "react";
import styled, { useTheme } from "styled-components";

interface Props {
  scale?: number;
  style?: React.CSSProperties;
}

const Icon = styled.svg<{
  $stroke: string;
  $hoverColor: string;
  $height: number;
  $width: number;
}>`
  stroke: ${(props) => props.$stroke};
  height: ${(props) => props.$height}px;
  width: ${(props) => props.$width}px;
  transition: all 0.3s ease-in;
  &:hover {
    stroke: ${(props) => props.$hoverColor};
  }
`;

export const StarIcon: React.FC<Props> = ({ scale = 40, style }) => {
  const theme = useTheme();

  return (
    <Icon
      style={style}
      x="0px"
      y="0px"
      $height={scale}
      $width={scale}
      viewBox="0 0 100 100"
      $stroke={theme.colors.iconColor}
      $hoverColor={theme.colors.iconHover}
    >
      <path
        d="M46.9,23A3.3,3.3,0,0,1,51,20.9,3.4,3.4,0,0,1,53.1,23l5,15.4a3.2,3.2,0,0,0,3.1,2.2H77.3a3.2,3.2,0,0,1,3.2,3.3,3.3,3.3,0,0,1-1.3,2.6L66.2,56A3.3,3.3,0,0,0,65,59.6l4.9,15.3A3.3,3.3,0,0,1,67.7,79a3.2,3.2,0,0,1-2.8-.5l-13-9.4a3,3,0,0,0-3.8,0l-13,9.4a3.3,3.3,0,0,1-4.6-.8,3.4,3.4,0,0,1-.4-2.8L35,59.6A3.3,3.3,0,0,0,33.8,56l-13-9.5a3.4,3.4,0,0,1-.7-4.6,3.3,3.3,0,0,1,2.6-1.3H38.8a3.2,3.2,0,0,0,3.1-2.2Z"
        fill="none"
        stroke={theme.colors.iconColor}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="7"
      />
    </Icon>
  );
};
