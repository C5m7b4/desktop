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

export const TrashIcon: React.FC<Props> = ({ scale = 40, style }) => {
  const theme = useTheme();
  return (
    <Icon
      style={style}
      x="0px"
      y="0px"
      height={`${scale}px`}
      width={`${scale}px`}
      viewBox="0 0 100 100"
      $stroke={theme.colors.iconColor}
      $hoverColor={theme.colors.iconHover}
    >
      <path
        d="M78.1,29.9,74.6,78.7a8,8,0,0,1-8,7.4H33.4a8,8,0,0,1-8-7.4L21.9,29.9M42,46V70.1M58,46V70.1m4-40.2v-12a4,4,0,0,0-4-4H42a4,4,0,0,0-4,4v12m-20.1,0H82.1"
        fill="none"
        stroke={theme.colors.iconColor}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="8"
      />
    </Icon>
  );
};
