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

export const JoinIcon: React.FC<Props> = ({
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
      <path
        fill="#fff"
        stroke={stroke ?? theme.colors.table.iconHoverColor}
        strokeLinecap="round"
        strokeMiterlimit={10}
        strokeWidth="20"
        d="M64.49,140.4c52.99-5.22,87.5,17.19,107.96,28.16s39.2,34.46,57.48,49.43c22.28,18.24,45.21,16.85,84,16.09,27.49-.53,36.37-.85,88.48.57"
      />
      <path
        fill="#fff"
        stroke={stroke ?? theme.colors.table.iconHoverColor}
        strokeLinecap="round"
        strokeMiterlimit={10}
        strokeWidth="20"
        d="M64.49,330.88c52.99,5.22,87.5-17.19,107.96-28.16,21.43-11.49,39.2-34.46,57.48-49.43,22.28-18.24,45.21-16.85,84-16.09,27.49.53,36.37.85,88.48-.57"
      />
      <polygon
        fill="#fff"
        stroke={stroke ?? theme.colors.table.iconHoverColor}
        strokeLinecap="round"
        strokeMiterlimit={10}
        strokeWidth="20"
        points="468.46 232.93 432.11 248.88 401.35 273.97 405.72 234.52 399.36 195.34 431.35 218.84 468.46 232.93"
      />
      <circle
        fill="#fff"
        stroke={stroke ?? theme.colors.table.iconHoverColor}
        strokeLinecap="round"
        strokeMiterlimit={10}
        strokeWidth="20"
        cx="64.49"
        cy="140.4"
        r="39.08"
      />
      <circle
        fill="#fff"
        stroke={stroke ?? theme.colors.table.iconHoverColor}
        strokeLinecap="round"
        strokeMiterlimit={10}
        strokeWidth="20"
        cx="64.49"
        cy="330.4"
        r="39.08"
      />
    </Icon>
  );
};
