import React from "react";
import styled, { useTheme, keyframes } from "styled-components";

export type CheckboxType = "normal" | "X";

interface Props {
  scale?: number;
  style?: React.CSSProperties;
  onClick?: (e: React.MouseEvent<SVGSVGElement>) => void;
  stroke?: string;
  fill?: string;
  innerFill?: string;
  type?: CheckboxType;
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

export const CheckboxIcon: React.FC<Props> = ({
  scale = 15,
  style,
  onClick,
  stroke,
  fill,
  innerFill,
  type = "normal",
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
      <g data-id="base">
        <path
          strokeWidth="0"
          fill={fill ?? theme.colors.table.iconColor}
          d="M434.72,30.98H65.28c-18.94,0-34.3,15.36-34.3,34.3v369.45c0,18.94,15.36,34.3,34.3,34.3h369.45c18.94,0,34.3-15.36,34.3-34.3V65.28c0-18.94-15.36-34.3-34.3-34.3ZM447.85,413.55c0,18.94-15.36,34.3-34.3,34.3H86.45c-18.94,0-34.3-15.36-34.3-34.3V86.45c0-18.94,15.36-34.3,34.3-34.3h327.1c18.94,0,34.3,15.36,34.3,34.3v327.1Z"
        />
      </g>
      <g data-id="filler">
        <rect
          strokeWidth="0"
          fill={innerFill ?? theme.colors.table.iconColor}
          x="52.15"
          y="52.15"
          width="395.7"
          height="395.7"
          rx="34.3"
          ry="34.3"
        />
      </g>
      {type === "normal" ? (
        <g data-id="check">
          <line
            fill="none"
            stroke={stroke ?? "#ffffff"}
            strokeLinecap="round"
            strokeMiterlimit="10"
            strokeWidth="60"
            x1="385.44"
            y1="121.07"
            x2="202.1"
            y2="377.74"
          />
          <line
            fill="none"
            stroke={stroke ?? "#ffffff"}
            strokeLinecap="round"
            strokeMiterlimit="10"
            strokeWidth="60"
            x1="109.73"
            y1="297.76"
            x2="202.1"
            y2="377.74"
          />
        </g>
      ) : (
        <g id="X">
          <line
            fill="none"
            stroke={stroke ?? "#ffffff"}
            strokeLinecap="round"
            strokeMiterlimit="10"
            strokeWidth="60"
            x1="354.36"
            y1="136.97"
            x2="133.18"
            y2="361.83"
          />
          <line
            fill="none"
            stroke={stroke ?? "#ffffff"}
            strokeLinecap="round"
            strokeMiterlimit="10"
            strokeWidth="60"
            x1="131.34"
            y1="138.81"
            x2="356.2"
            y2="360"
          />
        </g>
      )}
    </Icon>
  );
};
