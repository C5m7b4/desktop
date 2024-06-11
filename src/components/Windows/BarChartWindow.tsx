import Window from "../Window/Window";
import { IBody } from "../../layout";
import BarChart from "../Charta/BarChart/BarChart";

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
      <BarChart />
    </Window>
  );
};

export default BarChartWindow;
