import React from "react";
import Window from "../Window/Window";
import Calculator from "../Calculator/Calculator";
import { IBody } from "../../layout";

interface Props {
  parent?: React.ReactNode;
  block: IBody;
}

const CalculatorWindow: React.FC<Props> = ({ block }) => {
  return (
    <Window block={block}>
      <Calculator />
    </Window>
  );
};

export default CalculatorWindow;
