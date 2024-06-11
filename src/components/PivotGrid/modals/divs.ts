import styled from "styled-components";

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1040;
  width: 100vh;
  height: 100vh;
  background-color: #000000;
  opacity: 0.8;
`;

export const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1050;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: hidden;
  outline: 0;
`;

export const Modal = styled.div`
  z-index: 100;
  background: ${(props) => props.theme.colors.bg};
  color: ${(props) => props.theme.colors.text};
  position: relative;
  margin: 1.75rem auto;
  border-radius: 10px;
  max-width: 500px;
`;

export const Header = styled.div`
  display: flex;
  border-bottom: 1px solid #000000;
  background-color: ${(props) => props.theme.colors.table.excel};
  color: ${(props) => props.theme.colors.table.thText};
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  padding: 5px;
`;

export const Title = styled.div`
  font-size: 1.3rem;
  font-weight: bold;
  text-align: left;
  margin-left: 10px;
`;

export const CloseBox = styled.div`
  font-size: 1.4rem;
  font-weight: 700;
  line-height: 1;
  position: absolute;
  right: 10px;
`;

export const CloseButton = styled.button`
  color: #000;
  opacity: 0.3;
  cursor: pointer;
  padding-bottom: 3px;
`;

export const Body = styled.div`
  padding: 10px;
  background-color: #c4bfbf;
  color: #000;
`;

export const Buttons = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin-top: 10px;
`;
