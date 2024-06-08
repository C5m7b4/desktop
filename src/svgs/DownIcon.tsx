import React from "react";
import styled, { useTheme, keyframes } from "styled-components";

interface Props {
  scale?: number;
  style?: React.CSSProperties;
  onClick?: (e: React.MouseEvent<SVGSVGElement>) => void;
}

const fadeIn = keyframes`
  from{
    opacity: 0;
    color: red;
  }
  to{
    opacity: 1;
    color:blue;
  }
`;

const Icon = styled.svg<{ $stroke: string; $hoverColor: string }>`
  stroke: ${(props) => props.$stroke};
  cursor: pointer;
  transition: all 0.3s ease-in;
  &:hover {
    stroke: ${(props) => props.$hoverColor};
    fill: ${(props) => props.$hoverColor};
  }
  animation: ${fadeIn};
  animation-duration: s;
  animation-timing-function: ease-out;
`;

export const DownIcon: React.FC<Props> = ({ scale = 15, style, onClick }) => {
  const theme = useTheme();
  return (
    <Icon
      style={style}
      x="0px"
      y="0px"
      height={`${scale}px`}
      width={`${scale}px`}
      viewBox="0 0 500 500"
      $stroke={theme.colors.iconColor}
      $hoverColor={theme.colors.table.iconHoverColor}
      onClick={(e) => {
        if (onClick) {
          onClick(e);
        }
      }}
    >
      <circle
        stroke={theme.colors.table.iconColor}
        strokeWidth="10px"
        fill="transparent"
        cx="250"
        cy="253.96"
        r="197.94"
      />
      <polygon
        stroke={theme.colors.table.iconColor}
        strokeWidth="10px"
        fill={theme.colors.table.iconColor}
        points="366.11 186.2 294.59 279.42 250.62 388.39 205.65 279.84 133.27 187.28 249.76 202.61 366.11 186.2"
      />
    </Icon>
  );
};
