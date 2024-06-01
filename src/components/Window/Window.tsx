import React, { useState, useEffect, useRef } from "react";
import styled, { keyframes } from "styled-components";
import WindowHeader from "./WindowHeader";
import { createPortal } from "react-dom";
import { IApp } from "../../redux/app";
import Resizer from "./Resizer";
import { Direction } from "./Direction";
import { removeApplication, minimizeApplication } from "../../redux/app";
import { useDispatch } from "react-redux";
import { SubEvent, eventTypes } from "../../pubsub/pubsub";

const removeWindow = keyframes`
  0%{
    transform: scale(1);
  }
  25%{
    transform: scale(1);
  }
  50%{
    transform: scale(1.25);
  }
  75%{
    transform: scale(1.25);
    opacity: 1;
  }
  100%{
    transform: scale(1) translateY(500px);
    opacity: 0;
    height: 0
  }
`;

const minimize = keyframes`
  0%{
    transform: scale(1);
  }
  100%{
    transform: scale(0);
    transform: translateY(1000px);
  }
`;

const maximize = keyframes`
  0%{
    transform: scale(0);
    transform: translateY(1000px);
  }
  100%{
    transform: scale(1);
    transform: translateY(0);
  }
`;

const PortalWindow = styled.div<{ $animation: string }>`
  position: fixed;
  top: 16px;
  left: 16px;
  width: 600px;
  height: 400px;
  border: 2px solid black;
  border-radius: ${(props) => props.theme.window.borderRadius}px;
  z-index: 10;
  box-sizing: border-box;
  overflow: hidden;
  padding: 0;
  box-shadow: 2px 4px 6px rgba(0, 0, 0, 0.3);
  animation-name: ${(props) => (props.$animation ? props.$animation : "none")};
  animation-duration: 500ms;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;

  .right-bottom {
    position: absolute;
    cursor: nwse-resize;
    width: 10px;
    height: 10px;
    z-index: 2;
    right: 0;
    bottom: 0;
  }
`;

const Content = styled.div`
  padding: 0;
  background-color: ${(props) => props.theme.colors.bg};
  color: ${(props) => props.theme.colors.text};
  flex: 1;
  height: 100%;
`;

const Children = styled.div`
  user-select: none;
  height: 100%;
  /* overflow-y: scroll; */
`;

interface Props {
  isOpen?: boolean;
  parent?: Element;
  children: React.ReactNode;
  block: IApp;
}

const Window: React.FC<Props> = ({
  isOpen = true,
  children,
  parent = document.body,
  block,
}) => {
  const dispatch = useDispatch();
  const [animation, setAnimation] = useState("none");
  const panelRef = useRef<HTMLDivElement>(null);
  const { height, title, width, _uid, name } = block;

  useEffect(() => {
    SubEvent.on(eventTypes.maximize, (e: string) => {
      console.log("setting animation to maximize");
      setAnimation(maximize);
    });
  }, []);

  const handleDrag = (movementX: number, movementY: number) => {
    const panel = panelRef.current;
    if (!panel) return;

    const { x, y } = panel.getBoundingClientRect();

    panel.style.left = `${x + movementX}px`;
    panel.style.top = `${y + movementY}px`;
  };

  const handleResize = (
    direction: Direction,
    movementX: number,
    movementY: number
  ) => {
    const panel = panelRef.current;
    if (!panel) return;

    const { width, height, x, y } = panel.getBoundingClientRect();

    const resizeTop = () => {
      panel.style.height = `${height - movementY}px`;
      panel.style.top = `${y + movementY}px`;
    };

    const resizeRight = () => {
      panel.style.width = `${width + movementX}px`;
    };

    const resizeBottom = () => {
      panel.style.height = `${height + movementY}px`;
    };

    const resizeLeft = () => {
      panel.style.width = `${width - movementX}px`;
      panel.style.left = `${x + movementX}px`;
    };

    switch (direction) {
      case Direction.TopLeft:
        resizeTop();
        resizeLeft();
        break;
      case Direction.Top:
        resizeTop();
        break;
      case Direction.TopRight:
        resizeTop();
        resizeRight();
        break;
      case Direction.Right:
        resizeRight();
        break;
      case Direction.Bottom:
        resizeBottom();
        break;
      case Direction.BottomRight:
        resizeBottom();
        resizeRight();
        break;
      case Direction.BottomLeft:
        resizeBottom();
        resizeLeft();
        break;
      case Direction.Left:
        resizeLeft();
        break;
      default:
        break;
    }
  };

  const handleClose = () => {
    // allow time to fade out
    // @ts-expect-error I know know how to type keyframes
    // ToDo: figure out how to type keyframes
    setAnimation(removeWindow);
    setTimeout(() => {
      dispatch(removeApplication(_uid));
    }, 600);
  };

  const handleMinimize = () => {
    // @ts-expect-error I still dont know how to type this
    setAnimation(minimize);
    setTimeout(() => {
      dispatch(minimizeApplication({ _uid, title: title, name: name }));
    }, 200);
  };

  return (
    <>
      {isOpen
        ? createPortal(
            <PortalWindow
              className="portal-panel"
              style={{
                height: `${height}px`,
                width: `${width}px`,
              }}
              ref={panelRef}
              $animation={animation}
            >
              <Resizer onResize={handleResize} />
              <WindowHeader
                onDrag={handleDrag}
                title={title!}
                handleClose={handleClose}
                handleMinimize={handleMinimize}
              />
              <Content className="contents">
                <Children>{children}</Children>
              </Content>
            </PortalWindow>,
            parent
          )
        : null}
    </>
  );
};

export default Window;
