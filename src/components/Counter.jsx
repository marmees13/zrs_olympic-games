import React, { useState } from 'react';
import './Counter.css';

const Counter = () => {
  const [count, setCount] = useState(0);

  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);
  const reset = () => setCount(0);

  return (
    <div className="counter">
      <div className="counter-display">{count}</div>
      <div className="counter-buttons">
        <button className="counter-btn" onClick={decrement}>-</button>
        <button className="counter-btn reset" onClick={reset}>Reset</button>
        <button className="counter-btn" onClick={increment}>+</button>
      </div>
    </div>
  );
};

export default Counter;
