// this is just an example file showing how to subscribe to an event

import { useEffect, useState } from "react";

import { SubEvent, eventTypes } from "./pubsub";

const Receiver = () => {
  const [msg, setMsg] = useState<string>("");

  useEffect(() => {
    SubEvent.on(eventTypes.maximize, (e: string) => {
      setMsg(`eventType: maximize sent: ${e}`);
    });
  }, []);

  return (
    <div>
      <h3>Hello</h3>
      <div>Broadcasted:{msg}</div>
    </div>
  );
};

export default Receiver;
