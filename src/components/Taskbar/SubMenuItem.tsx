import { createPortal } from "react-dom";
import { IChildNodes } from "./StartMenu";
import styled from "styled-components";

const Div = styled.div<{ $bottom: number }>`
  position: absolute;
  bottom: ${(props) => props.$bottom}px;
  left: 175px;
  width: 200px;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
  font-size: ${(props) => props.theme.fontSizes.normal};
  font-weight: ${(props) => props.theme.fontWeights.bold};
  background-color: ${(props) => props.theme.colors.bg};
  color: ${(props) => props.theme.colors.text};
  box-shadow: 2px 4px 6px rgba(0, 0, 0, 0.3);
  cursor: pointer;
`;

const Item = styled.div`
  height: 30px;
  padding: 5px 25px;
  &:hover {
    background-color: #eee;
    border-top-left-radius: 8px;
  }
`;

interface Props {
  isOpen: boolean;
  childNodes: IChildNodes[];
  bottom: number;
}

const SubMenuItem: React.FC<Props> = ({ isOpen, childNodes, bottom }) => {
  console.log("bottom", bottom);
  return (
    <>
      {isOpen
        ? createPortal(
            <Div $bottom={bottom - 275}>
              {childNodes.map((child: IChildNodes, i) => (
                <Item key={`cn-${i}`}>{child.app}</Item>
              ))}
            </Div>,
            document.body
          )
        : null}
    </>
  );
};

export default SubMenuItem;
