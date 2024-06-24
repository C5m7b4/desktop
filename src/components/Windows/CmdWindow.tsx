import React from "react";
import Window from "../Window/Window";
import Cmd from "../Cmd/Cmd";
import { IBody } from "../../layout";

interface Props {
  parent?: React.ReactNode;
  block: IBody;
}

const CmdWindow: React.FC<Props> = ({ block }) => {
  return (
    <Window block={block}>
      <Cmd />
    </Window>
  );
};

export default CmdWindow;
