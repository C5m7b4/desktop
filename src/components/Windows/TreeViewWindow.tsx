import React from "react";
import { treeData } from "../../mockData/tree";
import Tree from "../TreeView/Tree";

const TreeViewWindow = () => {
  return <Tree data={treeData} />;
};

export default TreeViewWindow;
