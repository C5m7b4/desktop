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

export const FolderIcon: React.FC<Props> = ({ scale = 20, style }) => {
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
        d="M17.9,32.2V67.8A7.1,7.1,0,0,0,25,75H75a7.1,7.1,0,0,0,7.1-7.2V39.3A7.1,7.1,0,0,0,75,32.2H53.6L46.4,25H25A7.1,7.1,0,0,0,17.9,32.2Z"
        fill="none"
        stroke={theme.colors.iconColor}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="8"
      />
    </Icon>
  );
};
