import { useState } from "react";

const AmeyCounter = () => {
  const [count, setCounter] = useState(0);

  const handlePlus = () => {
    setCounter((prev) => {
      return prev + 1;
    });
  };

  const handleMinus = () => {
    setCounter((prev) => {
      return prev > 0 ? prev - 1 : prev;
    });
  };

  const handleReset = () => {
    setCounter(() => {
      return 0;
    });
  };

  return (
    <div>
      <h2>Amey Counter</h2>

      <h1>{count}</h1>

      <button onClick={handlePlus}>plus</button>
      <button onClick={handleMinus}>minus</button>
      <button onClick={handleReset}>reset</button>
    </div>
  );
};

export default AmeyCounter;
