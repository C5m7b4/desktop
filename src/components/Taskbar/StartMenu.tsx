import React from "react";
import styled from "styled-components";
import MenuItem from "./MenuItem";
import { CalculatorIcon, FolderIcon, StarIcon, TrashIcon } from "../../svgs";
import Components from "../Components";
import { IBody } from "../../layout";

const Div = styled.div<{ $show?: boolean; $left: number }>`
  position: absolute;
  bottom: 40px;
  left: ${(props) => props.$left}px;
  height: 300px;
  width: 175px;
  border: 1px solid #000;
  background-color: ${(props) => props.theme.colors.bg};
  overflow: hidden;
  opacity: ${(props) => (props.$show ? 0.9 : 0)};
  box-shadow: 2px 4px 6px rgba(0, 0, 0, 0.2);
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  margin-bottom: ${(props) => (props.$show ? null : "-400px")};
  transition-property: margin-bottom, opacity, background-color, color;
  transition-duration: 0.5s;
  transition-timing-function: ease-out;
`;

interface Props {
  showStartMenu: boolean;
}

const StartMenu: React.FC<Props> = ({ showStartMenu }) => {
  // const [left] = useState(window.outerWidth / 2 - 50);
  const left = 0;

  return (
    <Div $show={showStartMenu} $left={left}>
      <MenuItem label="Programs" Icon={FolderIcon} roundTop={true} />
      <MenuItem label="Favorites" Icon={StarIcon} />
      <MenuItem label="Trash" Icon={TrashIcon} />
      <hr />
      <MenuItem
        label="Calculator"
        Icon={CalculatorIcon}
        onClick={() => {
          console.log("calulator clicked");
          const block: IBody = {
            _uid: "lkjlkddjlksdf",
            component: "calculator",
            height: 500,
            width: 400,
            title: "Calculator",
            name: "Calculator",
          };
          return Components(block);
        }}
      />
    </Div>
  );
};

export default StartMenu;
