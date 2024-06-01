import Window from "../Window/Window";
import { IBody } from "../../layout";
import Linechart from "../Charta/LineChart/Linechart";
import { lineData } from "../../mockData/lineData";

interface Props {
  parent?: React.ReactNode;
  block: IBody;
}

const LineWindow: React.FC<Props> = ({ block }) => {
  const handleClick = (e) => {
    console.log(e);
  };

  return (
    <Window block={block}>
      <Linechart
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

export default LineWindow;
