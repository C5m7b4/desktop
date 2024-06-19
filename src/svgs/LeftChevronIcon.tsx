import React from "react";
import styled, { useTheme, keyframes } from "styled-components";

interface Props {
  scale?: number;
  style?: React.CSSProperties;
  onClick?: (e: React.MouseEvent<SVGSVGElement>) => void;
  stroke?: string;
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
  animation-duration: 0.3s;
  animation-timing-function: ease-out;
`;

export const LeftChevronIcon: React.FC<Props> = ({
  scale = 15,
  style,
  onClick,
  stroke,
}) => {
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
      <line
        strokeWidth="20"
        stroke={stroke ?? theme.colors.table.iconHoverColor}
        strokeLinecap="round"
        strokeMiterlimit={10}
        fill="none"
        x1="459.26"
        y1="31.55"
        x2="37.43"
        y2="250"
      />
      <line
        strokeWidth="20"
        stroke={stroke ?? theme.colors.table.iconHoverColor}
        strokeLinecap="round"
        strokeMiterlimit={10}
        fill="none"
        x1="37.43"
        y1="250"
        x2="454.67"
        y2="472.36"
      />
    </Icon>
  );
};
