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
    tr {
      transition: ${(props) => props.theme.transition};
      border-bottom: ${(props) => props.theme.colors.table.rowBottomLineColor};
      &:nth-of-type(even) {
        background-color: ${(props) => props.theme.colors.table.oddRows};
        color: ${(props) => props.theme.colors.table.excel};
      }
      &:nth-of-type(odd) {
        background-color: ${(props) => props.theme.colors.table.evenRows};
      }
      &:last-of-type {
        border-bottom: 2px solid ${(props) => props.theme.colors.table.excel};
      }
      &:hover {
        background-color: ${(props) =>
          props.theme.colors.table.hoverBackgroundColor};
        color: ${(props) => props.theme.colors.table.hoverTextColor};
      }
    }
  }
`;

export const Th = styled.th<{ $width: number; $align: number }>`
  background-color: ${(props) => props.theme.colors.table.excel};
  color: ${(props) => props.theme.colors.table.thText};
  font-weight: ${(props) => props.theme.fontWeights.bold};
  padding: 5px 15px 5px 5px;
  width: ${(props) => props.$width}px;
  max-width: ${(props) => props.$width}px;
  overflow: clip;
  text-overflow: ellipsis;
  text-align: ${(props) =>
    props.$align === 0 ? "left" : props.$align === 1 ? "center" : "right"};
`;

export const Td = styled.td<{ $width: number; $align: number }>`
  color: ${(props) => props.theme.colors.text};
  font-weight: ${(props) => props.theme.fontWeights.normal};
  padding: 5px 15px 5px 5px;
  width: ${(props) => props.$width}px;
  max-width: ${(props) => props.$width}px;
  overflow: clip;
  text-overflow: ellipsis;
  text-align: ${(props) =>
    props.$align === 0 ? "left" : props.$align === 1 ? "center" : "right"};
  &:hover {
    color: ${(props) => props.theme.colors.table.hoverTextColor};
  }
`;

export const Footer = styled.div`
  background-color: ${(props) => props.theme.colors.table.excel};
  color: ${(props) => props.theme.colors.table.thText};
  font-weight: ${(props) => props.theme.fontWeights.bold};
  border-bottom-left-radius: ${(props) => props.theme.window.borderRadius}px;
  border-bottom-right-radius: ${(props) => props.theme.window.borderRadius}px;
  height: ${(props) => props.theme.window.windowFooterHeight}px;
`;
