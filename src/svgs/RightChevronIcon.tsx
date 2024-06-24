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

export const RightChevronIcon: React.FC<Props> = ({
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
      <g>
        <line
          strokeWidth="50"
          stroke={stroke ?? theme.colors.table.iconHoverColor}
          strokeLinecap="round"
          strokeMiterlimit={10}
          fill="none"
          x1="101.97"
          y1="391.34"
          x2="372.48"
          y2="251.25"
        />
        <line
          strokeWidth="50"
          stroke={stroke ?? theme.colors.table.iconHoverColor}
          strokeLinecap="round"
          strokeMiterlimit={10}
          fill="none"
          x1="372.48"
          y1="251.25"
          x2="104.92"
          y2="108.66"
        />
      </g>
      <rect
        strokeWidth="20"
        stroke={stroke ?? theme.colors.table.iconHoverColor}
        strokeLinecap="round"
        strokeMiterlimit={10}
        fill="none"
        x="15.55"
        y="13.85"
        width="468.9"
        height="472.3"
        rx="19.22"
        ry="19.22"
      />
    </Icon>
  );
};
