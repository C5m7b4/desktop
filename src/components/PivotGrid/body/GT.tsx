import { grandTotalSum, grandTotalCount } from "../../../utils/arrayUtils";
import { IValue } from "../dropTargets/Values";
import { Tr } from "../../Grid/divs";

interface Props<T> {
  values: IValue[];
  data: T[];
}
function GT<T>(props: Props<T>) {
  const { values, data } = props;
  return (
    <Tr style={{ borderTop: "2px solid black" }}>
      <td></td>
      <td>Grand Total</td>
      {values.map((v, index) => {
        let total = 0;
        switch (v.aggregator) {
          case "Count":
            total = grandTotalCount(data);
            break;
          case "Sum":
            total = grandTotalSum(data, v.label);
            break;
          default:
            total = grandTotalSum(data, v.label);
            break;
        }
        return (
          <td key={`gt-${index}`} style={{ fontWeight: "bold" }}>
            {total}
          </td>
        );
      })}
    </Tr>
  );
}

export default GT;
