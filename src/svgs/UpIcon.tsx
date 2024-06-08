import React from "react";
import styled, { useTheme } from "styled-components";

interface Props {
  scale?: number;
  style?: React.CSSProperties;
  onClick?: () => void;
}

const Icon = styled.svg<{ $stroke: string; $hoverColor: string }>`
  stroke: ${(props) => props.$stroke};
  cursor: pointer;
  transition: all 0.3s ease-in;
  &:hover {
    stroke: ${(props) => props.$hoverColor};
    fill: ${(props) => props.$hoverColor};
  }
`;

export const UpIcon: React.FC<Props> = ({ scale = 15, style, onClick }) => {
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
      onClick={onClick}
    >
      <circle
        stroke={theme.colors.table.iconColor}
        strokeWidth="10px"
        fill="transparent"
        cx="250"
        cy="253.96"
        r="197.94"
      />
      <polygon
        stroke={theme.colors.iconColor}
        fill={theme.colors.iconColor}
        points="133.89 321.71 205.41 228.49 249.38 119.52 294.35 228.08 366.73 320.63 250.24 305.3 133.89 321.71"
      />
    </Icon>
  );
};
