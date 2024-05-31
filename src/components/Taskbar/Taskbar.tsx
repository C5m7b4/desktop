import styled, { keyframes } from "styled-components";
import { useState } from "react";
import Clock from "./Clock";
import StartMenu from "./StartMenu";
import MinimizedApps from "./MinimizedApps";

const Div = styled.div`
  background-color: ${(props) => props.theme.colors.bg};
  color: ${(props) => props.theme.colors.text};
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  padding: 5px 25px;
  height: ${(props) => props.theme.taskbarHeight};
  text-align: center;
  background-color: ${(props) => props.theme.colors.taskbar};
  display: flex;
  justify-content: space-between;
  transition: all 0.3s ease-in;
`;

const breathAnimation = keyframes`
     0% { height: 25px; width: 25px; }
    30% { height: 45px; width: 45px; opacity: 1 }
    40% { height: 50px; width: 50px; opacity: 0.4; }
    100% { height: 25px; width: 25px; opacity: 0.6; }
`;

const Circle = styled.div`
  height: 35px;
  width: 35px;
  border-radius: 50%;
  background: rgb(2, 0, 36);
  background: radial-gradient(
    circle,
    rgba(2, 0, 36, 1) 0%,
    rgba(142, 202, 230, 1) 50%,
    rgba(0, 212, 255, 1) 100%
  );
  cursor: pointer;
  animation-name: ${breathAnimation};
  animation-duration: 8s;
  animation-iteration-count: infinite;
`;

const Taskbar = () => {
  const [showStartMenu, setShowStartMenu] = useState(false);

  const handleClick = () => {
    // setPoints({ x: e.clientX, y: e.clientY });
    // showStartMenu ? setHeight(0) : setHeight(250);
    // showStartMenu ? setMarginTop(250) : setMarginTop(0);
    setShowStartMenu(!showStartMenu);
  };

  return (
    <Div>
      <Circle onClick={handleClick} />
      <MinimizedApps />
      <Clock />

      <StartMenu showStartMenu={showStartMenu} />
    </Div>
  );
};

export default Taskbar;
