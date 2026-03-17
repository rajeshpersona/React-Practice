import React, { useState } from "react";

const Counter = () => {
  const [counter, setCounter] = useState(0);

  const handleIncrement = () => {
    setCounter((prev) => {
      console.log("incerment Prev", prev);
      let incrementValue = prev + 1;
      return incrementValue;
    });
  };
  const handlDecrement = () => {
    setCounter((prev) => {
      console.log("Decrement Prev", prev);
      return prev > 0 ? prev - 1 : prev;
    });
  };

  const handleReset = () => {
    setCounter((prev) => {
      return (prev = 0);
    });
  };
  console.log("Current State Value", counter);
  return (
    <>
      <h1>Rajesh Counter</h1>
      <p>{counter}</p>
      <button onClick={handleIncrement}>Increment</button>
      <button onClick={handlDecrement}>Decrement</button>
      <button onClick={handleReset}>Reset</button>
    </>
  );
};

export default Counter;
