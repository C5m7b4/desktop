import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import { decrement, increment, incrementByAmount } from "../../redux/counter";
import { IApp } from "../../redux/app";
import { addApplication } from "../../redux/app";
import { publisher, eventTypes } from "../../pubsub/pubsub";
import IMAGES from "../../images/images";

const Counter = () => {
  const { count } = useSelector((state: RootState) => state.counter);

  const dispatch = useDispatch();

  const app: IApp = {
    _uid: "hsdkerer",
    component: "calculator",
    height: 200,
    width: 400,
    title: "Calculator",
    name: "Calculator",
  };

  const handleClick = () => {
    dispatch(addApplication(app));
  };

  return (
    <div>
      <h1>The count is: {count}</h1>
      <button onClick={() => dispatch(increment())}>+</button>
      <button onClick={() => dispatch(decrement())}>-</button>
      <button onClick={() => dispatch(incrementByAmount(10))}>
        Increment by 10
      </button>
      <button onClick={handleClick}>Add App</button>

      <button
        onClick={() => {
          publisher.publish(eventTypes.maximize, "123");
        }}
      >
        Send Msg
      </button>
      {/* <img
        src={IMAGES.chart1}
        style={{ height: "100px" }}
        alt="missing photo"
      /> */}
    </div>
  );
};

export default Counter;
