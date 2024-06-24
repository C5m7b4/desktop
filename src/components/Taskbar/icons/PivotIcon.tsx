import { useRef } from "react";
import styled from "styled-components";
import { createPortal } from "react-dom";
import IconHolder from "./IconHolder";
import { useDispatch } from "react-redux";
import { addApplication, IApp } from "../../../redux/app";

const Div = styled.div`
  position: fixed;
  top: 350px;
  left: 200px;
  width: 100px;
  height: 100;
  user-select: none;
`;

interface Props {
  isOpen?: boolean;
  parent?: Element;
}

const AppIcon: React.FC<Props> = ({
  isOpen = true,
  parent = document.body,
}) => {
  const panelRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();

  const handleDrag = (movementX: number, movementY: number) => {
    const panel = panelRef.current;
    if (!panel) return;

    const { x, y } = panel.getBoundingClientRect();

    panel.style.left = `${x + movementX}px`;
    panel.style.top = `${y + movementY}px`;
  };

  const app: IApp = {
    _uid: "bitches-pivot-ejshe53",
    component: "pivot",
    height: 650,
    width: 900,
    title: "Pivot Grid",
    name: "Pivot Grid",
  };

  const handleDoubleClick = () => {
    dispatch(addApplication(app));
  };

  return (
    <>
      {isOpen
        ? createPortal(
            <Div ref={panelRef} onDoubleClick={handleDoubleClick}>
              <IconHolder onDrag={handleDrag} image={"pivot1"} label="Pivot" />
            </Div>,
            parent
          )
        : null}
    </>
  );
};

export default AppIcon;
