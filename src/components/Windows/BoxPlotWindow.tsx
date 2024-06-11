import Window from "../Window/Window";
import { IBody } from "../../layout";
import BoxPlot from "../Charta/BoxPlot/BoxPlot";
import { boxPlotData } from "../../mockData/boxPlotData";
import { quartile, IQR } from "../Charta/BoxPlot/math";

interface Props {
  parent?: React.ReactNode;
  block: IBody;
}

interface IData {
  datename: string;
  cashier: number;
  voids: number;
}

interface IResult {
  cashier: number;
  cnt: number;
}

const BoxPlotWindow: React.FC<Props> = ({ block }) => {
  const unique = (d: IData[]) => {
    const x_key = "cashier";
    const newArray: number[] = [];
    d.forEach((r) => {
      if (!newArray.includes(r[x_key])) {
        if (typeof r[x_key] !== "undefined" && r[x_key] != null) {
          newArray.push(r[x_key]);
        }
      }
    });
    return newArray;
  };

  const count = (data: IData[], key: number) =>
    data.filter((c) => c.cashier === key);

  const transactions = (data: IData[]) => {
    const newArray: number[] = [];
    const uniques = unique(data);
    uniques.map((c) => {
      newArray.push(count(data, c).length);
    });
    return newArray;
  };

  const predicate = (data: IData[]) => {
    const uniques = unique(data);
    const transCounts = transactions(data);
    const results: IResult[] = [];
    const q3 = quartile(transCounts, 0.75);
    const iqr = IQR(transCounts);

    uniques.map((c) => {
      const cnt = count(data, c);
      // console.log('cnt', cnt.length);
      if (cnt.length > q3 + 1.5 * iqr) {
        results.push({ cashier: c, cnt: cnt.length });
      }
    });
    // console.log("returning", results);
    return results;
  };

  return (
    <Window block={block}>
      <BoxPlot
        data={boxPlotData}
        x_key={"datename"}
        y_key={"voids"}
        height={300}
        width={600}
        predicate={predicate}
      />
    </Window>
  );
};

export default BoxPlotWindow;
