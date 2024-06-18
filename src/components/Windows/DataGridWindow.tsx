import Window from "../Window/Window";
import { IBody } from "../../layout";
import DataGrid from "../Grid/DataGrid";
import { pivotData, IPivotData } from "../../mockData/pivotData1";

import {
  ColumnAlignment,
  CustomRenderer,
  TableHeader,
} from "../../interfaces/Grid";
import { MoneyInput, formatMoney, formatNumber } from "../Grid/formatters";

interface Props {
  parent?: React.ReactNode;
  block: IBody;
}

function FormatMoneyRenderer<T>(args: CustomRenderer<T>) {
  const { value } = args;
  return <div>{formatMoney(value as MoneyInput)}</div>;
}

function FormatNumberRenderer<T>(args: CustomRenderer<T>) {
  const { value } = args;
  return <div>{formatNumber(value as MoneyInput)}</div>;
}

const columns: TableHeader<IPivotData>[] = [
  {
    title: "#",
    columnName: "Customer",
    width: 50,
    align: ColumnAlignment.center,
  },
  {
    title: "Order ID",
    columnName: "OrderId",
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
    align: ColumnAlignment.right,
    renderer: (e: CustomRenderer<IPivotData>) => FormatNumberRenderer(e),
  },
  {
    title: "Date",
    columnName: "Date",
    width: 85,
    align: ColumnAlignment.center,
  },
  {
    title: "Rev",
    columnName: "Rev",
    width: 75,
    align: ColumnAlignment.right,
    renderer: (e: CustomRenderer<IPivotData>) => FormatMoneyRenderer(e),
  },
  {
    title: "Our Cost",
    columnName: "Our cost",
    width: 100,
    align: ColumnAlignment.right,
    renderer: (e: CustomRenderer<IPivotData>) => FormatMoneyRenderer(e),
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
