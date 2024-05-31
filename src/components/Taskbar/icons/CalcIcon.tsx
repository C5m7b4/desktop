import { useRef } from "react";
import styled from "styled-components";
import { createPortal } from "react-dom";
import IconHolder from "./IconHolder";
import { addApplication, IApp } from "../../../redux/app";
import { useDispatch } from "react-redux";

const Div = styled.div`
  position: fixed;
  top: 200px;
  left: 200px;
  width: 100px;
  height: 100;
  user-select: none;
`;

interface Props {
  isOpen?: boolean;
  parent?: Element;
}

const CalculatorIcon: React.FC<Props> = ({
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
    _uid: "hsdkerer",
    component: "calculator",
    height: 200,
    width: 400,
    title: "Calculator",
    name: "Calculator",
  };

  const handleDoubleClick = () => {
    dispatch(addApplication(app));
  };

  return (
    <>
      {isOpen
        ? createPortal(
            <Div ref={panelRef} onDoubleClick={handleDoubleClick}>
              <IconHolder onDrag={handleDrag} image={"calc"} label="Calc" />
            </Div>,
            parent
          )
        : null}
    </>
  );
};

export default CalculatorIcon;
