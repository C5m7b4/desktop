import { useState } from "react";

const Cmd = () => {
  const [code, setCode] = useState("");
  const [codeResult, setCodeResult] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCode(e.target.value);
  };

  const handleKeyUp = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key == "Enter" && e.shiftKey) {
      execute();
    }
  };

  const execute = () => {
    const result = eval(code);
    setCodeResult(result);
  };
  return (
    <div>
      <textarea
        style={{ width: "100%" }}
        value={code}
        onChange={handleChange}
        onKeyUp={handleKeyUp}
      />
      <div>{codeResult}</div>
    </div>
  );
};

export default Cmd;
