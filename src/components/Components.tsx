/* eslint-disable react-refresh/only-export-components */

import React from "react";
import Window from "./Window/Window";
import CalculatorWindow from "./Windows/CalculatorWindow";
import Counter from "./Counter/Counter";
import Receiver from "../pubsub/Receiver";
import TreeViewWindow from "./Windows/TreeViewWindow";
import LineWindow from "./Windows/LineWindow";
import BarChartWindow from "./Windows/BarChartWindow";
import PivotWindow from "./Windows/PivotWindow";
import DataGridWindow from "./Windows/DataGridWindow";
import BoxPlotWindow from "./Windows/BoxPlotWindow";
import { IBody } from "../layout";
import CmdWindow from "./Windows/CmdWindow";

type ComponentNames =
  | "window"
  | "calculator"
  | "counter"
  | "receiver"
  | "treeview"
  | "linechart"
  | "pivot"
  | "grid"
  | "barchart"
  | "boxplot"
  | "cmd";

type Components = Record<ComponentNames, any>;
// interface IComponents {
//   [key: string]: Element;
// }

const Components: Components = {
  window: Window,
  calculator: CalculatorWindow,
  counter: Counter,
  receiver: Receiver,
  treeview: TreeViewWindow,
  linechart: LineWindow,
  pivot: PivotWindow,
  grid: DataGridWindow,
  barchart: BarChartWindow,
  boxplot: BoxPlotWindow,
  cmd: CmdWindow,
};

export default (block: IBody) => {
  if (typeof Components[block.component] != "undefined") {
    return React.createElement(Components[block.component], {
      key: block._uid,
      block: block,
    });
  }
  return React.createElement(
    () => <div>The Component {block.component} has not been created yet</div>,
    { key: block._uid }
  );
};
