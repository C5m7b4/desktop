import styled from "styled-components";

export const Table = styled.table`
  width: 100%;
  height: 90%;
  border: 1px solid black;
  border-collapse: collapse;
  font-size: ${(props) => props.theme.fontSizes.normal};
  border-radius: 5px 5px 0 0;
  overflow: hidden;
  transition: ${(props) => props.theme.transition};
  thead {
    display: block;
  }
  tbody {
    display: block;
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
  }
`;

export const Th = styled.th<{
  $width: number;
  $align: number;
  $background: string;
}>`
  display: grid;
  grid-template-columns: 1fr 20px 2px;
  background-color: ${(props) => props.$background};
  color: ${(props) => props.theme.colors.table.thText};
  font-weight: ${(props) => props.theme.fontWeights.bold};
  padding: 0 0 0 5px;
  width: ${(props) => props.$width}px;
  overflow: clip;
  text-overflow: ellipsis;
  text-align: ${(props) =>
    props.$align === 0 ? "left" : props.$align === 1 ? "center" : "right"};
`;

export const Tr = styled.tr`
  transition: ${(props) => props.theme.transition};
  border-bottom: ${(props) => props.theme.colors.table.rowBottomLineColor};
  &:nth-of-type(even) {
    background-color: ${(props) => props.theme.colors.table.evenRows};
    color: ${(props) => props.theme.colors.table.excel};
  }
  &:nth-of-type(odd) {
    background-color: ${(props) => props.theme.colors.table.oddRows};
  }
  &:last-of-type {
    border-bottom: 2px solid ${(props) => props.theme.colors.table.excel};
  }
  &:hover {
    background-color: ${(props) =>
      props.theme.colors.table.hoverBackgroundColor};
    color: ${(props) => props.theme.colors.table.hoverTextColor};
  }
`;

export const Td = styled.td<{ $width: number; $align: number }>`
  font-weight: ${(props) => props.theme.fontWeights.normal};
  padding: 5px 15px 5px 5px;
  width: ${(props) => props.$width}px;
  max-width: ${(props) => props.$width}px;
  overflow: clip;
  text-overflow: ellipsis;
  text-align: ${(props) =>
    props.$align === 0 ? "left" : props.$align === 1 ? "center" : "right"};
  transition: all 0.3s ease-in;
`;

export const Footer = styled.div`
  display: flex;
  background-color: ${(props) => props.theme.colors.table.excel};
  color: ${(props) => props.theme.colors.table.thText};
  font-weight: ${(props) => props.theme.fontWeights.bold};
  border-bottom-left-radius: ${(props) => props.theme.window.borderRadius}px;
  border-bottom-right-radius: ${(props) => props.theme.window.borderRadius}px;
  height: ${(props) => props.theme.window.windowFooterHeight}px;
  padding-left: 15px;
  padding-top: 5px;
`;

export const RowResizer = styled.div`
  width: 5px;
  cursor: ew-resize;
  height: 100%;
  background-color: ${(props) => props.theme.colors.table.thText};
  transition: all 0.3s ease-in;
  &:hover {
    background-color: ${(props) => props.theme.colors.table.thText};
  }
`;
