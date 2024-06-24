import styled from "styled-components";
import React, {
  useState,
  useContext,
  createContext,
  useEffect,
  createRef,
  useRef,
} from "react";
import {
  LeftChevronIcon,
  RightChevronIcon,
  UpChevronIcon,
  DownChevronIcon,
} from "../../svgs";

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
  transition: all 0.3s ease-in;
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
  /* transition: all 0.3s cubic-bezier(0, -0.25, 0.92, 0.62); */
`;

const SplitPaneBottomDiv = styled.div`
  flex: 1;
  overflow: hidden;
`;

const SplitPanelLeftDiv = styled.div`
  position: relative;
  flex: 1;
  overflow: hidden;
`;

const CollapsePanel = styled.div<{ $right: number }>`
  position: absolute;
  top: 50px;
  right: ${(props) => props.$right}px;
  opacity: 0.8;
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
  const [collapsed, setCollapsed] = useState(false);
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

  const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (direction === "horizontal") {
      separatorYPosition.current = e.clientY;
    } else {
      separatorXPosition.current = e.clientX;
    }
  };

  const onMouseMove = (e: MouseEvent) => {
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

  const handleCollapse = () => {
    if (direction === "vertical") {
      if (collapsed) {
        setCollapsed(false);
        setRightWidth(300);
      } else {
        setCollapsed(true);
        setRightWidth(1);
      }
    } else {
      if (collapsed) {
        setCollapsed(false);
        setTopHeight(300);
      } else {
        setCollapsed(true);
        setTopHeight(1);
      }
    }
  };

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
          $color={separatorColor!}
        >
          <CollapsePanel $right={rightWidth} onClick={handleCollapse}>
            {direction === "vertical" ? (
              collapsed ? (
                <LeftChevronIcon />
              ) : (
                <RightChevronIcon />
              )
            ) : collapsed ? (
              <UpChevronIcon />
            ) : (
              <DownChevronIcon />
            )}
          </CollapsePanel>
        </Separator>
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
  const rightRef = createRef<HTMLDivElement>();
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
  return <SplitPanelLeftDiv {...props}></SplitPanelLeftDiv>;
};
