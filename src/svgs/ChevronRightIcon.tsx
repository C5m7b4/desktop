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

export const ChevronRight: React.FC<Props> = ({
  scale = 15,
  style,
  onClick,
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
        fill="none"
        strokeLinecap="round"
        strokeWidth="15px"
        x1="169.19"
        y1="125.08"
        x2="385.55"
        y2="250"
      />
      <line
        fill="none"
        strokeLinecap="round"
        strokeWidth="15px"
        x1="169.19"
        y1="374.92"
        x2="385.55"
        y2="250"
      />
    </Icon>
  );
};
