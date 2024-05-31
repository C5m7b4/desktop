import React from "react";
import styled, { useTheme } from "styled-components";

interface Props {
  scale?: number;
  style?: React.CSSProperties;
}

const Icon = styled.svg<{ $stroke: string; $hoverColor: string }>`
  stroke: ${(props) => props.$stroke};
  transition: all 0.3s ease-in;
  &:hover {
    stroke: ${(props) => props.$hoverColor};
  }
`;

export const DarkModeIcon: React.FC<Props> = ({ scale = 25, style }) => {
  const theme = useTheme();
  return (
    <Icon
      style={style}
      x="0px"
      y="0px"
      height={`${scale}px`}
      width={`${scale}px`}
      viewBox="0 0 35 35"
      $stroke={theme.colors.iconColor}
      $hoverColor={theme.colors.iconHover}
    >
      <path
        fill={theme.colors.iconColor}
        d="M18.44,34.68a18.22,18.22,0,0,1-2.94-.24,18.18,18.18,0,0,1-15-20.86A18.06,18.06,0,0,1,9.59.63,2.42,2.42,0,0,1,12.2.79a2.39,2.39,0,0,1,1,2.41L11.9,3.1l1.23.22A15.66,15.66,0,0,0,23.34,21h0a15.82,15.82,0,0,0,8.47.53A2.44,2.44,0,0,1,34.47,25,18.18,18.18,0,0,1,18.44,34.68ZM10.67,2.89a15.67,15.67,0,0,0-5,22.77A15.66,15.66,0,0,0,32.18,24a18.49,18.49,0,0,1-9.65-.64A18.18,18.18,0,0,1,10.67,2.89Z"
      />
    </Icon>
  );
};
