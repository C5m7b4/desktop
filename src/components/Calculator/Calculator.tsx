import React, { useState, useRef } from "react";
import styled from "styled-components";

const Div = styled.div`
  display: flex;
  flex-direction: column;
`;

const Errors = styled.div`
  color: red;
  width: 100%;
  display: flex;
  justify-content: center;
  position: absolute;
  bottom: 0;
  left: 0;
`;

const Calculator = () => {
  const [input, setInput] = useState("");
  const [results, setResults] = useState<string[]>([]);
  const [error, setError] = useState("");

  const inputRef = useRef<HTMLInputElement>(null);

  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.keyCode == 13) {
      const input = (e.target as HTMLInputElement).value;
      if (
        typeof input === "undefined" ||
        input === null ||
        input.length === 0
      ) {
        setError("Please enter an equation");
        return;
      }
      const result = eval(input);
      const output = `${input} = ${result}`;
      setResults([...results, output]);
      setError("");

      if (inputRef.current) {
        setInput("");
        inputRef.current.value = "";
        inputRef.current.focus();
      }
    }
  };

  const handleSelect = (e: string) => {
    const pos = e.indexOf("=");
    const left = e.substring(0, pos);
    setInput(left);
  };
  return (
    <Div>
      <input
        ref={inputRef}
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter an equation"
        onKeyUp={handleKeyUp}
      />
      <div>Results</div>
      <hr />
      <div>
        {results.map((result, i) => (
          <div key={`result-${i}`} onClick={() => handleSelect(result)}>
            {result}
          </div>
        ))}
      </div>
      <Errors>{error}</Errors>
    </Div>
  );
};

export default Calculator;
