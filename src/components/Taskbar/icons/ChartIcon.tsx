import { useRef } from "react";
import styled from "styled-components";
import { createPortal } from "react-dom";
import IconHolder from "./IconHolder";
import { useDispatch } from "react-redux";
import { addApplication, IApp } from "../../../redux/app";

const Div = styled.div`
  position: fixed;
  top: 350px;
  left: 16px;
  width: 100px;
  height: 100;
  user-select: none;
`;

interface Props {
  isOpen?: boolean;
  parent?: Element;
}

const TreeIcon: React.FC<Props> = ({
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
    _uid: "cc-chart-happy-face",
    component: "linechart",
    height: 346,
    width: 640,
    title: "Line Chart",
    name: "Line Chart",
  };

  const handleDoubleClick = () => {
    dispatch(addApplication(app));
  };

  return (
    <>
      {isOpen
        ? createPortal(
            <Div ref={panelRef} onDoubleClick={handleDoubleClick}>
              <IconHolder onDrag={handleDrag} image={"chart1"} label="Line" />
            </Div>,
            parent
          )
        : null}
    </>
  );
};

export default TreeIcon;
