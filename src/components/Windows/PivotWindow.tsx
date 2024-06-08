import React from "react";
import Window from "../Window/Window";
import { IBody } from "../../layout";
import PivotGrid from "../PivotGrid/PivotGrid";
import { pivotData } from "../../mockData/pivotData";
import { ColumnAlignment } from "../../interfaces/Grid";
import { Renderers } from "../../utils/renderers";
import SplitPanelExample from "../SplitPanel/SplitPanelExample";

interface Props {
  parent?: React.ReactNode;
  block: IBody;
}

interface IColumn {
  title: string;
  columnName: string;
  width: number;
  align: ColumnAlignment;
  renderer?: null;
}

const columns: IColumn[] = [
  {
    title: "Customer",
    columnName: "Customer",
    width: 25,
    align: ColumnAlignment.center,
  },
  {
    title: "Order ID",
    columnName: "Order ID",
    width: 50,
    align: ColumnAlignment.left,
  },
  {
    title: "Product",
    columnName: "Product",
    width: 50,
    align: ColumnAlignment.left,
  },
  {
    title: "Units Sold",
    columnName: "Units Sold",
    width: 50,
    align: ColumnAlignment.left,
  },
  {
    title: "Date",
    columnName: "Date",
    width: 50,
    align: ColumnAlignment.left,
  },
  {
    title: "Rev",
    columnName: "Rev",
    width: 50,
    align: ColumnAlignment.left,
  },
  {
    title: "Our Cost",
    columnName: "Our Cost",
    width: 50,
    align: ColumnAlignment.left,
  },
];

const PivotWindow: React.FC<Props> = ({ block }) => {
  return (
    <Window block={block}>
      {/* <PivotGrid data={pivotData} columns={columns} /> */}
      <SplitPanelExample />
    </Window>
  );
};

export default PivotWindow;
