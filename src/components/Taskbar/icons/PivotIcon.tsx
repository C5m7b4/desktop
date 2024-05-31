import { useRef } from "react";
import styled from "styled-components";
import { createPortal } from "react-dom";
import IconHolder from "./IconHolder";
const Div = styled.div`
  position: fixed;
  top: 650px;
  left: 16x;
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

  const handleDrag = (movementX: number, movementY: number) => {
    const panel = panelRef.current;
    if (!panel) return;

    const { x, y } = panel.getBoundingClientRect();

    panel.style.left = `${x + movementX}px`;
    panel.style.top = `${y + movementY}px`;
  };

  return (
    <>
      {isOpen
        ? createPortal(
            <Div ref={panelRef}>
              <IconHolder onDrag={handleDrag} image={"pivot1"} label="Pivot" />
            </Div>,
            parent
          )
        : null}
    </>
  );
};

export default AppIcon;
