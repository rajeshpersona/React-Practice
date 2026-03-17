import React, { useState } from "react";

const Counter2 = () => {
  const [counter, setCounter] = useState(0);

  const handleIncrement = () => {
   
    setCounter(prev =>  prev + 1);
    console.log("Prev Incerment  value", counter);
  };

  const handleDecrement = () => {
  
    setCounter((prev) => {
      console.log("Prev Decrement value", prev);
      
      return prev>0 ? prev - 1 : prev;
    });
  };

  const handleReset = () => {
    console.log("Rest");
    setCounter(0);
  };

  console.log("Current state value", counter);
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <h1>Counter2</h1>

            <p>Counter Value: {counter}</p>
            <button className="btn btn-primary" onClick={handleIncrement}>
              Increment
            </button>
            <button className="btn btn-primary m-2" onClick={handleDecrement}>
              Decrement
            </button>
            <button className="btn btn-primary m-2" onClick={handleReset}>
              Reset
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Counter2;
