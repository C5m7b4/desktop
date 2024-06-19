import { useState, useEffect, useRef } from "react";
import styled, { keyframes } from "styled-components";
import { createPortal } from "react-dom";
import { Overlay, Wrapper, Body } from "../modals/divs";

const fadeIn = keyframes`
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
`;

const Div = styled.div<{ $top: number; $left: number }>`
  position: absolute;
  top: ${(props) => props.$top}px;
  left: ${(props) => props.$left}px;
  width: 300px;
  height: 200px;
  background-color: transparent;
  animation-name: ${fadeIn};
  animation-duration: 0.5s;
  animation-iteration-count: 1;
`;

interface Props {
  top: number;
  left: number;
  isShowing: boolean;
  hide: () => void;
}

const BodyContextMenu = (props: Props) => {
  const { top, left, isShowing, hide } = props;

  const windowRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (e: MouseEvent) => {
    if (windowRef.current) {
      if (!windowRef.current.contains(e.target as HTMLDivElement)) {
        hide();
      }
    }
  };

  useEffect(() => {
    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <>
      {isShowing
        ? createPortal(
            <>
              {/* <Overlay /> */}
              <Wrapper>
                <Div ref={windowRef} $top={top} $left={left}>
                  <Body>
                    <h3>context stuff</h3>
                  </Body>
                </Div>
              </Wrapper>
            </>,
            document.body
          )
        : null}
    </>
  );
};

export default BodyContextMenu;
