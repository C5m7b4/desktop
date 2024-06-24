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

export const CmdIcon: React.FC<Props> = ({
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
      <rect
        fill="#fff"
        x="12.71"
        y="12.59"
        width="475"
        height="475"
        rx="26"
        ry="26"
        strokeMiterlimit={10}
        strokeWidth="20"
      />

      <line
        stroke={stroke ?? theme.colors.table.iconHoverColor}
        strokeMiterlimit={10}
        strokeWidth="20"
        fill="none"
        x1="89.15"
        y1="85.57"
        x2="244.32"
        y2="250"
      />
      <line
        stroke={stroke ?? theme.colors.table.iconHoverColor}
        strokeMiterlimit={10}
        strokeWidth="20"
        fill="none"
        x1="70.18"
        y1="407.99"
        x2="244.32"
        y2="250"
      />
      <line
        stroke={stroke ?? theme.colors.table.iconHoverColor}
        strokeMiterlimit={10}
        strokeWidth="20"
        fill="none"
        x1="250"
        y1="404.54"
        x2="429.95"
        y2="404.54"
      />
    </Icon>
  );
};
