import React, { useState } from "react";
import Display from "./component/Display";
import ButtonPanel from "./component/ButtonPanel";
import calculate from "./logic/calculate";
import "./calculator.css";

const Calculator = () => {
  const [state, setState] = useState({
    total: null,
    next: null,
    operation: null,
  })

  const handleClick = buttonName => {
    setState(prevstate => ({ ...prevstate, ...calculate(state, buttonName) }));
  };
  return (
    <div className="component-calculator">
      <Display value={state.next || state.total || "0"} />
      <ButtonPanel clickHandler={handleClick} />
    </div>
  );
}

export default Calculator