import { createRef, useContext, useEffect, useRef, useState } from "react";

import SplitPanelContext from "./SplitPanelContext";

import "./index.css";

const SplitPanel = ({ children, ...props }) => {
  const [clientHeight, setClientHeight] = useState(null);
  const [clientWidth, setClientWidth] = useState(null);
  const yDividerPos = useRef(null);
  const xDividerPos = useRef(null);

  const onMouseHoldDown = (e) => {
    yDividerPos.current = e.clientY;
    xDividerPos.current = e.clientX;
  };

  const onMouseHoldUp = () => {
    yDividerPos.current = null;
    xDividerPos.current = null;
  };

  const onMouseHoldMove = (e) => {
    if (!yDividerPos.current && !xDividerPos.current) {
      return;
    }
    console.log("mousemove", e.clientY, e.clientX);

    setClientHeight(clientHeight + e.clientY - yDividerPos.current);
    setClientWidth(clientWidth + e.clientX - xDividerPos.current);

    yDividerPos.current = e.clientY;
    xDividerPos.current = e.clientX;
  };

  useEffect(() => {
    document.addEventListener("mouseup", onMouseHoldUp);
    document.addEventListener("mousemove", onMouseHoldMove);

    return () => {
      document.removeEventListener("mouseup", onMouseHoldUp);
      document.removeEventListener("mousemove", onMouseHoldMove);
    };
  }, []);

  return (
    <div {...props}>
      <SplitPanelContext.Provider
        value={{
          clientHeight,
          setClientHeight,
          clientWidth,
          setClientWidth,
          onMouseHoldDown,
        }}
      >
        {children}
      </SplitPanelContext.Provider>
    </div>
  );
};

export const Divider = (props) => {
  const { onMouseHoldDown } = useContext(SplitPanelContext);

  return <div {...props} onMouseDown={onMouseHoldDown} />;
};

export const SplitPanelTop = (props) => {
  const topRef = createRef();
  const { clientHeight, setClientHeight } = useContext(SplitPanelContext);

  useEffect(() => {
    if (!clientHeight) {
      setClientHeight(topRef.current.clientHeiht);
      return;
    }

    topRef.current.style.minHeight = clientHeight + "px";
    topRef.current.style.maxHeight = clientHeight + "px";
  }, [clientHeight]);

  return (
    <div {...props} className="split-panel-top" ref={topRef}>
      <h1>Panel</h1>
    </div>
  );
};

export const SplitPanelBottom = (props) => {
  return <div {...props} className="split-panel-bottom"></div>;
};

export const SplitPanelLeft = (props) => {
  const topRef = createRef();
  const { clientWidth, setClientWidth } = useContext(SplitPanelContext);

  useEffect(() => {
    if (!clientWidth) {
      setClientWidth(topRef.current.clientWidth / 2);
      return;
    }

    topRef.current.style.minWidth = clientWidth + "px";
    topRef.current.style.maxWidth = clientWidth + "px";
  }, [clientWidth]);

  return <div {...props} className="split-panel-left" ref={topRef} />;
};

export const SplitPanelRight = (props) => {
  return (
    <div {...props} className="split-panel-right">
      right panel
    </div>
  );
};

export default SplitPanel;
