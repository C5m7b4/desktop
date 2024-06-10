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

export const BoxMinusIcon: React.FC<Props> = ({
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
      <g id="Layer_1" data-name="Layer 1">
        <rect
          style={{ fill: "none", stroke: "#231f20", strokeWidth: "20px" }}
          x="33.76"
          y="33.76"
          width="432.48"
          height="432.48"
          rx="30.79"
          ry="30.79"
        />
      </g>
      <g id="Layer_2" data-name="Layer 2">
        <line
          style={{ fill: "none", stroke: "#231f20", strokeWidth: "20px" }}
          x1="79.46"
          y1="250"
          x2="405.9"
          y2="250"
        />
      </g>
    </Icon>
  );
};
