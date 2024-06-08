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

export const SortAZ: React.FC<Props> = ({ scale = 15, style, onClick }) => {
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
      <text fill="#1c75bc" transform="translate(50.7 228.43)">
        <tspan x="0" y="0">
          A
        </tspan>
      </text>
      <polygon
        fill="none"
        stroke="#231f20"
        strokeWidth="10px"
        points="313.95 448.64 432.22 250 195.68 250 313.95 448.64 432.22 250 195.68 250 313.95 448.64"
      />
      <line
        strokeWidth="26px"
        fill="none"
        stroke="#231f20"
        x1="313.95"
        y1="254.61"
        x2="313.95"
        y2="20.35"
      />
      <text fill="#000000" transform="translate(50.7 399.86)">
        <tspan x="0" y="0">
          Z
        </tspan>
      </text>
    </Icon>
  );
};
