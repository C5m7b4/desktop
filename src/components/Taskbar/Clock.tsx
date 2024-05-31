import { useState, useEffect } from "react";

const Clock = () => {
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      const today = new Date();

      const h =
        today.getHours() > 12 ? today.getHours() - 12 : today.getHours();
      const m = today.getMinutes();
      const s = today.getSeconds();
      const ampm = today.getHours() > 12 ? "PM" : "AM";
      const month = today.getMonth() + 1;
      const day = today.getDate();
      const year = today.getFullYear();
      const minute = checkTime(m);
      const second = checkTime(s);
      setTime(h + ":" + minute + ":" + second + " " + ampm);
      setDate(month + "/" + day + "/" + year);
    }, 1000);

    const checkTime = (i: number) => {
      let result = i.toString();
      if (i < 10) {
        result = "0" + i;
      }
      return result;
    };

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div>
      <div style={{ fontSize: ".7rem" }}>{time}</div>
      <div style={{ fontSize: ".7rem" }}>{date}</div>
    </div>
  );
};

export default Clock;
