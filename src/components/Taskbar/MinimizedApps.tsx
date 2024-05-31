import { RootState } from "../../redux/store";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { MaximizeIcon } from "../../svgs";
import { maximizeApplication } from "../../redux/app";
import { publisher, eventTypes } from "../../pubsub/pubsub";

const Div = styled.div`
  border: 1px solid black;
  height: 35px;
  display: flex;
  width: 150px;
  align-items: center;
  justify-content: space-between;
  padding: 5px 10px;
`;

const MinimizedApps = () => {
  const { minimizedApps } = useSelector((state: RootState) => state.app);
  const dispatch = useDispatch();

  const handleMaximize = (_uid: string) => {
    publisher.publish(eventTypes.maximize, _uid);
    setTimeout(() => {
      dispatch(maximizeApplication(_uid));
    }, 200);
  };
  return (
    <div style={{ display: "flex", width: "100%" }}>
      {minimizedApps.map((app, i) => (
        <Div key={`ma-${i}`}>
          <div>{app.title}</div>
          <MaximizeIcon scale={15} onClick={() => handleMaximize(app._uid)} />
        </Div>
      ))}
    </div>
  );
};

export default MinimizedApps;
