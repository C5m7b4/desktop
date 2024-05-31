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

export const CalculatorIcon: React.FC<Props> = ({ scale = 40, style }) => {
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
        d="M38,29.9H62m0,40.2V58M50,70.1h0m-12,0h0M38,58h0m12,0h0M62,46h.1M50,46h0M38,46h0M29.9,86.1H70.1a8,8,0,0,0,8-8V21.9a8,8,0,0,0-8-8H29.9a8,8,0,0,0-8,8V78.1A8,8,0,0,0,29.9,86.1Z"
        fill="none"
        stroke={theme.colors.iconColor}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="8"
      />
    </Icon>
  );
};
