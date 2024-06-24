import React, { useState, useEffect } from "react";
import Window from "../Window/Window";
import { IBody } from "../../layout";
import PivotGrid, { IColumn } from "../PivotGrid/PivotGrid";

import { ColumnAlignment } from "../../interfaces/Grid";
import { consume } from "../../api";

const url = "https://localhost:7024/Data";

interface Props {
  parent?: React.ReactNode;
  block: IBody;
}

// interface IColumn {
//   f1032:string;
//   f1056: string;
//   f1057: string;
//   f01: string;
//   f1041: string;
//   f64: string;
//   f65: string;
//   f67: string;
//   f1007: string;
//   f1006: string;
//   f1864: string;
//   f2555: string;
//   f1721: string;
//   f1081: string;
//   f254: string;
//   f1101: number;
//   f30: string;
//   f31: string;
//   f113: string;
//   f1727: string;
//   f1726: string;
// }

const columns: IColumn[] = [
  {
    title: "Transaction",
    columnName: "f1032",
    width: 25,
    align: ColumnAlignment.center,
  },
  {
    title: "Store",
    columnName: "f1056",
    width: 50,
    align: ColumnAlignment.left,
  },
  {
    title: "Terminal",
    columnName: "f1057",
    width: 50,
    align: ColumnAlignment.left,
  },
  {
    title: "UPC",
    columnName: "f01",
    width: 50,
    align: ColumnAlignment.left,
  },
  {
    title: "Description",
    columnName: "f1041",
    width: 50,
    align: ColumnAlignment.left,
  },
  {
    title: "Qty",
    columnName: "f64",
    width: 50,
    align: ColumnAlignment.left,
  },
  {
    title: "Sales",
    columnName: "f65",
    width: 50,
    align: ColumnAlignment.left,
  },
  {
    title: "Weight",
    columnName: "f67",
    width: 50,
    align: ColumnAlignment.left,
  },
  {
    title: "Active Price",
    columnName: "f1007",
    width: 50,
    align: ColumnAlignment.left,
  },
  {
    title: "Active Qty",
    columnName: "f1006",
    width: 50,
    align: ColumnAlignment.left,
  },
  {
    title: "Line #",
    columnName: "f1101",
    width: 50,
    align: ColumnAlignment.left,
  },
  {
    title: "Sale Type",
    columnName: "f113",
    width: 50,
    align: ColumnAlignment.left,
  },
  {
    title: "Vnd Cpn Count",
    columnName: "f1864",
    width: 50,
    align: ColumnAlignment.left,
  },
  {
    title: "Fee",
    columnName: "f2555",
    width: 50,
    align: ColumnAlignment.left,
  },
  {
    title: "Vendor Coupon",
    columnName: "f1721",
    width: 50,
    align: ColumnAlignment.left,
  },
  {
    title: "Info",
    columnName: "f1081",
    width: 50,
    align: ColumnAlignment.left,
  },
  {
    title: "Date",
    columnName: "f254",
    width: 50,
    align: ColumnAlignment.left,
  },
  {
    title: "Retail Price",
    columnName: "f30",
    width: 50,
    align: ColumnAlignment.left,
  },
  {
    title: "Retail Qty",
    columnName: "f31",
    width: 50,
    align: ColumnAlignment.left,
  },
  {
    title: "Item Dsc $",
    columnName: "f1726",
    width: 50,
    align: ColumnAlignment.left,
  },
  {
    title: "Item Dsc %",
    columnName: "f1727",
    width: 50,
    align: ColumnAlignment.left,
  },
];

const PivotWindow: React.FC<Props> = ({ block }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [downloaded, setDownloaded] = useState(0);

  useEffect(() => {
    grabData();
  }, []);

  const grabData = () => {
    consume(setLoading, setDownloaded, url, "pivot")
      .then((resp) => {
        if (resp.error == 0) {
          setData(resp.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <Window block={block}>
      <PivotGrid
        data={data}
        columns={columns}
        loading={loading}
        downloaded={downloaded}
      />
    </Window>
  );
};

export default PivotWindow;
