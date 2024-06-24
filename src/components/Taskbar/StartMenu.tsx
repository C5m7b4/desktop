import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import MenuItem from "./MenuItem";
import {
  CalculatorIcon,
  FolderIcon,
  StarIcon,
  TrashIcon,
  CmdIcon,
} from "../../svgs";
import Components from "../Components";
import { IBody } from "../../layout";
import { addApplication, IApp } from "../../redux/app";
import { useDispatch } from "react-redux";
import { createPortal } from "react-dom";

const Div = styled.div<{ $show?: boolean; $left: number }>`
  position: absolute;
  bottom: 40px;
  left: ${(props) => props.$left}px;
  height: 200px;
  width: 175px;
  border: 1px solid #000;
  background-color: ${(props) => props.theme.colors.bg};
  overflow: hidden;
  opacity: ${(props) => (props.$show ? 0.9 : 0)};
  box-shadow: 2px 4px 6px rgba(0, 0, 0, 0.2);
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  margin-bottom: ${(props) => (props.$show ? null : "-400px")};
  z-index: 999999;
  transition-property: margin-bottom, opacity, background-color, color;
  transition-duration: 0.5s;
  transition-timing-function: ease-out;
`;

export interface IChildNodes {
  app: string;
  icon: string;
}
const programNodes: IChildNodes[] = [
  {
    app: "Pivot Table",
    icon: "pivo1",
  },
  {
    app: "Tree View",
    icon: "tree",
  },
  {
    app: "Line Chart",
    icon: "chart1",
  },
  {
    app: "Calculator",
    icon: "calc",
  },
];

interface Props {
  showStartMenu: boolean;
  setShowStartMenu: (e: boolean) => void;
}

const StartMenu: React.FC<Props> = ({ showStartMenu, setShowStartMenu }) => {
  // const [left] = useState(window.outerWidth / 2 - 50);
  const left = 0;
  const dispatch = useDispatch();

  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.addEventListener("click", handleWindowClick);
    return () => {
      window.removeEventListener("click", handleWindowClick);
    };
  }, []);

  const handleWindowClick = (e: MouseEvent) => {
    const div = document.querySelector("#main-taskbar");
    if (menuRef.current && div) {
      if (
        !menuRef.current.contains(e.target as HTMLDivElement) &&
        !div.contains(e.target as HTMLDivElement)
      ) {
        setShowStartMenu(false);
      }
    }
  };

  const handleClick = (e: string) => {
    switch (e) {
      case "Cmd":
        const app: IApp = {
          _uid: "cmd-11456845rt",
          component: "cmd",
          height: 200,
          width: 300,
          title: "Cmd",
          name: "Cmd",
          left: 550,
          top: 650,
        };
        dispatch(addApplication(app));
        setShowStartMenu(false);
        break;
      default:
        break;
    }
  };

  return (
    <>
      {showStartMenu ? (
        <>
          {createPortal(
            <Div $show={showStartMenu} $left={left} ref={menuRef}>
              <MenuItem
                label="Cmd"
                roundTop={false}
                Icon={CmdIcon}
                onClick={() => handleClick("Cmd")}
              />
              <MenuItem
                label="Programs"
                Icon={FolderIcon}
                roundTop={true}
                childNodes={programNodes}
              />
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
            </Div>,
            document.body
          )}
        </>
      ) : null}
    </>
  );
};

export default StartMenu;
