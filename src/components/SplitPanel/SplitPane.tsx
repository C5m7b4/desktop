import styled from "styled-components";
import React, {
  useState,
  useContext,
  createContext,
  useEffect,
  createRef,
  useRef,
} from "react";
import { LeftChevronIcon } from "../../svgs";

const splitPaneContext = createContext({
  topHeight: null,
  setTopHeight: React.Dispatch<React.SetStateAction<null | number>>,
  rightWidth: null,
  setRightWidth: React.Dispatch<React.SetStateAction<null | number>>,
});

const SplitPaneDiv = styled.div<{ $direction: string; $height: string }>`
  display: flex;
  width: 100%;
  flex-direction: ${(props) =>
    props.$direction === "horizontal" ? "column" : "row"};
  height: ${(props) =>
    props.$direction === "horizontal"
      ? "null"
      : props.$height
      ? `${props.$height}px`
      : "100%"};
`;

const Separator = styled.div<{
  $direction: string;
  $width: number;
  $color: string;
}>`
  border: ${(props) => props.$width}px solid ${(props) => props.$color};
  cursor: ${(props) =>
    props.$direction === "horizontal" ? "row-resize" : "col-resize"};
  height: ${(props) => (props.$direction === "horizontal" ? "null" : "100%")};
`;

const SplitPaneTopDiv = styled.div`
  overflow: hidden;
  height: 300px;
`;

const SplitPaneRightDiv = styled.div`
  overflow: hidden;
  width: 300px;
`;

const SplitPaneBottomDiv = styled.div`
  flex: 1;
  overflow: hidden;
`;

const SplitPanelLeftDiv = styled.div`
  flex: 1;
  overflow: hidden;
`;

type IDirection = "horizontal" | "vertical";

interface Props {
  direction?: IDirection;
  children: React.ReactNode;
  separatorWidth?: number;
  separatorColor?: string;
  props?: any;
  height?: number;
}

export default function SplitPane(props: Props) {
  const [topHeight, setTopHeight] = useState(null);
  const [rightWidth, setRightWidth] = useState(null);
  const separatorYPosition = useRef(null);
  const separatorXPosition = useRef(null);

  const {
    direction = "horizontal",
    children,
    props: remainingProps,
    separatorWidth,
    separatorColor,
    height,
  } = props;
  const splitPaneRef = createRef<HTMLDivElement>();

  const onMouseDown = (e) => {
    if (direction === "horizontal") {
      separatorYPosition.current = e.clientY;
    } else {
      separatorXPosition.current = e.clientX;
    }
  };

  const onMouseMove = (e) => {
    if (direction == "horizontal") {
      if (!separatorYPosition.current) {
        return;
      }
      const newTopHeight = topHeight + e.clientY - separatorYPosition.current;
      separatorYPosition.current = e.clientY;
      setTopHeight(newTopHeight);
    } else {
      if (!separatorXPosition.current) {
        return;
      }
      const newRightWidth = rightWidth - e.clientX + separatorXPosition.current;
      separatorXPosition.current = e.clientX;
      setRightWidth(newRightWidth);
    }
  };

  const onMouseUp = () => {
    separatorYPosition.current = null;
    separatorXPosition.current = null;
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
    <SplitPaneDiv
      {...remainingProps}
      $direction={direction}
      className="split-pane"
      ref={splitPaneRef}
      $height={height}
    >
      <splitPaneContext.Provider
        value={{ topHeight, setTopHeight, rightWidth, setRightWidth }}
      >
        {children && children[0]}
        <Separator
          $direction={direction}
          className="separator"
          onMouseDown={onMouseDown}
          $width={separatorWidth || 5}
          $color={separatorColor}
        ></Separator>
        {children[1]}
      </splitPaneContext.Provider>
    </SplitPaneDiv>
  );
}

SplitPane.Top = function SplitPanelTop(props) {
  const topRef = createRef<HTMLDivElement>(null);
  const { topHeight, setTopHeight } = useContext(splitPaneContext);

  useEffect(() => {
    if (topRef.current) {
      if (!topHeight) {
        setTopHeight(topRef.current.clientHeight);
        topRef.current.style.flex = "none";
        return;
      }
      topRef.current.style.height = `${topHeight}px`;
    }
  }, [topHeight]);
  return <SplitPaneTopDiv {...props} ref={topRef} />;
};

SplitPane.Right = function SplitPanelRight(props) {
  const rightRef = createRef<HTMLDivElement>(null);
  const { rightWidth, setRightWidth } = useContext(splitPaneContext);

  useEffect(() => {
    if (rightRef.current) {
      if (!rightWidth) {
        setRightWidth(rightRef.current.clientWidth);
        rightRef.current.style.flex = "none";
        return;
      }
      rightRef.current.style.width = `${rightWidth}px`;
    }
  }, [rightWidth]);

  return <SplitPaneRightDiv {...props} ref={rightRef} />;
};

SplitPane.Bottom = function SplitPanelBottom(props) {
  return <SplitPaneBottomDiv {...props} />;
};

SplitPane.Left = function SplitPanelBottom(props) {
  return <SplitPanelLeftDiv {...props} />;
};
