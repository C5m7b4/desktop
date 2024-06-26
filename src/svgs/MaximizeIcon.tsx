import React from "react";
import styled, { useTheme } from "styled-components";

interface Props {
  scale?: number;
  style?: React.CSSProperties;
  onClick: () => void;
}

const Icon = styled.svg<{ $stroke: string; $hoverColor: string }>`
  stroke: ${(props) => props.$stroke};
  cursor: pointer;
  transition: all 0.3s ease-in;
  &:hover {
    stroke: ${(props) => props.$hoverColor};
  }
`;

export const MaximizeIcon: React.FC<Props> = ({
  scale = 20,
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
      viewBox="0 0 473 473"
      $stroke={theme.colors.iconColor}
      $hoverColor={theme.colors.iconHover}
      onClick={onClick}
    >
      <g>
        <path
          d="M459.5,0H330.4c-7.5,0-13.5,6-13.5,13.5s6,13.5,13.5,13.5h96.5L218.8,235.1c-5.3,5.3-5.3,13.8,0,19.1c2.6,2.6,6.1,4,9.5,4
			s6.9-1.3,9.5-4L446,46.1v96.5c0,7.5,6,13.5,13.5,13.5s13.5-6,13.5-13.5V13.5C473,6,467,0,459.5,0z"
        />
        <path
          d="M459.5,231.2c-7.5,0-13.5,6-13.5,13.5v130.9c0,38.8-31.6,70.4-70.4,70.4H97.4C58.6,446,27,414.4,27,375.6V97.4
			C27,58.6,58.6,27,97.4,27h129.9c7.5,0,13.5-6,13.5-13.5S234.8,0,227.3,0H97.4C43.7,0,0,43.7,0,97.4v278.2
			C0,429.3,43.7,473,97.4,473h278.2c53.7,0,97.4-43.7,97.4-97.4V244.7C473,237.2,467,231.2,459.5,231.2z"
        />
      </g>
    </Icon>
  );
};
