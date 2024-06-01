import React from "react";
import Window from "../Window/Window";
import { IBody } from "../../layout";
import PivotTable from "../PivotTable/PivotTable";
import { pivotData } from "../../mockData/pivotData";
import { ColumnAlignment } from "../../interfaces/Grid";

interface Props {
  parent?: React.ReactNode;
  block: IBody;
}

const columns = [
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
      <PivotTable data={pivotData} columns={columns} />
    </Window>
  );
};

export default PivotWindow;
