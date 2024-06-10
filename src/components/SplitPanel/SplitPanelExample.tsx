import SplitPane from "./SplitPane";

// import SplitPanel, {
//   Divider,
//   SplitPanelBottom,
//   SplitPanelLeft,
//   SplitPanelRight,
//   SplitPanelTop,
// } from "./SplitPanel";

// const SplitPanelExample = () => {
//   return (
//     <SplitPanel className="split-panel-row">
//       <SplitPanelLeft>
//         <SplitPanel className="split-panel-col">
//           <SplitPanelTop />
//           <Divider className="separator-row" />
//           <SplitPanelBottom />
//         </SplitPanel>
//       </SplitPanelLeft>
//       <Divider className="separator-col" />

//       <SplitPanelRight />
//     </SplitPanel>
//   );
// };

// export default SplitPanelExample;

export default function SplitPanelExmple() {
  return (
    <SplitPane
      direction={"vertical"}
      separatorWidth={3}
      separatorColor={"limegreen"}
    >
      <SplitPane.Left>
        <SplitPane
          direction={"horizontal"}
          separatorWidth={3}
          separatorColor={"limegreen"}
        >
          <SplitPane.Top>
            <div>top pane</div>
          </SplitPane.Top>
          <SplitPane.Bottom>
            <div>bottom pane</div>
          </SplitPane.Bottom>
        </SplitPane>
      </SplitPane.Left>
      <SplitPane.Right>
        <div> right div</div>
      </SplitPane.Right>
    </SplitPane>
  );
}
