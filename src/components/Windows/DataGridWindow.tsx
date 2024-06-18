import Window from "../Window/Window";
import { IBody } from "../../layout";
import DataGrid from "../Grid/DataGrid";
import { pivotData } from "../../mockData/pivotData";
import { ColumnAlignment } from "../../interfaces/Grid";

interface Props {
  parent?: React.ReactNode;
  block: IBody;
}

const columns = [
  {
    title: "#",
    columnName: "Customer",
    width: 50,
    align: ColumnAlignment.center,
  },
  {
    title: "Order ID",
    columnName: "Order ID",
    width: 85,
    align: ColumnAlignment.left,
  },
  {
    title: "Product",
    columnName: "Product",
    align: ColumnAlignment.left,
  },
  {
    title: "Units Sold",
    columnName: "Units Sold",
    width: 90,
    align: ColumnAlignment.left,
  },
  {
    title: "Date",
    columnName: "Date",
    width: 75,
    align: ColumnAlignment.left,
  },
  {
    title: "Rev",
    columnName: "Rev",
    width: 75,
    align: ColumnAlignment.right,
  },
  {
    title: "Our Cost",
    columnName: "Our Cost",
    width: 100,
    align: ColumnAlignment.right,
  },
];

const PivotWindow: React.FC<Props> = ({ block }) => {
  return (
    <Window block={block}>
      <DataGrid data={pivotData} columns={columns} _uid={block._uid} />
    </Window>
  );
};

export default PivotWindow;
