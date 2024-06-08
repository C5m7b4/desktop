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

export const GearIcon: React.FC<Props> = ({ scale = 15, style, onClick }) => {
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
        fill={theme.colors.table.iconColor}
        d="M439.17,274.51l35.29-7.28c-1.01-28.94-.77-21.74-1.78-50.68l-35.7-4.79c-6.76-20.31-7.83-23.54-14.58-43.85l25.75-25.2c-16.5-23.8-12.4-17.88-28.9-41.68l-32.62,15.29c-16.68-13.45-19.31-15.57-35.98-29.04l8.05-35.11c-26.74-11.1-20.1-8.35-46.84-19.44l-19.19,30.5c-21.3-2.29-24.65-2.67-45.95-4.96l-12.22-33.9c-28.5,5.12-21.4,3.86-49.91,8.98l.36,36.02c-19.17,9.59-22.19,11.1-41.36,20.67l-28.6-21.9c-21.2,19.7-15.92,14.8-37.13,34.52l19.76,30.13c-10.94,18.42-12.66,21.32-23.6,39.74l-35.92-2.97c-7.18,28.05-5.38,21.07-12.56,49.13l32.91,14.64c.75,21.42.87,24.78,1.62,46.21l-31.81,16.91c9.12,27.48,6.84,20.65,15.98,48.13l35.6-5.48c12.2,17.6,14.12,20.39,26.35,38l-17.62,31.43c22.53,18.18,16.93,13.65,39.46,31.83l27-23.86c19.8,8.21,22.91,9.51,42.71,17.72l2.18,35.96c28.78,3.13,21.62,2.33,50.4,5.46l9.83-34.68c21.09-3.78,24.41-4.39,45.5-8.17l21.26,29.08c25.91-12.96,19.46-9.73,45.36-22.67l-10.48-34.48c15.69-14.6,18.16-16.89,33.84-31.47l33.63,12.96c14.8-24.9,11.12-18.69,25.91-43.6l-27.48-23.32c5.32-20.77,6.15-24.03,11.47-44.78ZM249.99,384.43c-74.24,0-134.41-60.19-134.41-134.43s60.17-134.43,134.41-134.43,134.43,60.19,134.43,134.43-60.19,134.43-134.43,134.43Z"
      />
    </Icon>
  );
};
