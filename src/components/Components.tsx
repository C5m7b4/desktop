/* eslint-disable react-refresh/only-export-components */

import React from "react";
import Window from "./Window/Window";
import CalculatorWindow from "./Windows/CalculatorWindow";
import Counter from "./Counter/Counter";
import Receiver from "../pubsub/Receiver";
import TreeViewWindow from "./Windows/TreeViewWindow";
import LineWindow from "./Windows/LineWindow";
import PivotWindow from "./Windows/PivotWindow";
import DataGridWindow from "./Windows/DataGridWindow";
import { IBody } from "../layout";

interface IComponents {
  [key: string]: Element;
}

const Components: IComponents = {
  window: Window,
  calculator: CalculatorWindow,
  counter: Counter,
  receiver: Receiver,
  treeview: TreeViewWindow,
  linechart: LineWindow,
  pivot: PivotWindow,
  grid: DataGridWindow,
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
