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
    <SplitPane>
      <SplitPane.Top>
        <div>top div</div>
      </SplitPane.Top>
      <SplitPane.Bottom>
        <div> bottom div</div>
      </SplitPane.Bottom>
    </SplitPane>
  );
}
