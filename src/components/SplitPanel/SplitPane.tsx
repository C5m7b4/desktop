import styled from "styled-components";
import {
  useState,
  useContext,
  createContext,
  useEffect,
  createRef,
  useRef,
} from "react";

const splitPaneContext = createContext({});

const SplitPaneDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

const Separator = styled.div`
  border: 5px solid black;
  cursor: row-resize;
`;

const SplitPaneTopDiv = styled.div`
  /* flex: 1; */
  overflow: hidden;
  height: 300px;
`;

const SplitPaneBottomDiv = styled.div`
  flex: 1;
  overflow: hidden;
`;

export default function SplitPane({ children, ...props }) {
  const [topHeight, setTopHeight] = useState(null);
  const separatorYPosition = useRef(null);

  const splitPaneRef = createRef();

  const onMouseDown = (e) => {
    separatorYPosition.current = e.clientY;
  };

  const onMouseMove = (e) => {
    if (!separatorYPosition.current) {
      return;
    }
    const newTopHeight = topHeight + e.clientY - separatorYPosition.current;
    separatorYPosition.current = e.clientY;
    setTopHeight(newTopHeight);
  };

  const onMouseUp = () => {
    separatorYPosition.current = null;
  };

  useEffect(() => {
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };
  });

  return (
    <SplitPaneDiv {...props} className="split-pane" ref={splitPaneRef}>
      <splitPaneContext.Provider value={{ topHeight, setTopHeight }}>
        {children[0]}
        <Separator className="separator" onMouseDown={onMouseDown} />
        {children[1]}
      </splitPaneContext.Provider>
    </SplitPaneDiv>
  );
}

SplitPane.Top = function SplitPanelTop(props) {
  const topRef = createRef();
  const { topHeight, setTopHeight } = useContext(splitPaneContext);

  useEffect(() => {
    if (!topHeight) {
      setTopHeight(topRef.current.clientHeight);
      topRef.current.style.flex = "none";
      return;
    }
    topRef.current.style.height = `${topHeight}px`;
  }, [topHeight]);
  return <SplitPaneTopDiv {...props} ref={topRef} />;
};

SplitPane.Bottom = function SplitPanelBottom(props) {
  return <SplitPaneBottomDiv {...props} />;
};
