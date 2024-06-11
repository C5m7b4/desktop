import Window from "../Window/Window";
import { IBody } from "../../layout";
import BarChart from "../Charta/BarChart/BarChart";
import { lineData } from "../../mockData/lineData";

interface Props {
  parent?: React.ReactNode;
  block: IBody;
}

const BarChartWindow: React.FC<Props> = ({ block }) => {
  const handleClick = (e) => {
    console.log(e);
  };

  return (
    <Window block={block}>
      <BarChart
        data={lineData}
        x_key={"month"}
        y_key={"value"}
        width={600}
        height={300}
        onClick={handleClick}
      />
    </Window>
  );
};

export default BarChartWindow;
