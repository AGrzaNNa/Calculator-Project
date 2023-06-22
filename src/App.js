import logo from './logo.svg';
import './App.css';
import { useState } from "react";

function App() {
  const [result, setResult] = useState("0");
  let [operation, setOperation] = useState("");
  const [isEqualClicked, setIsEqualClicked] = useState(false);
  const [dotUsed, setDotUsed] = useState(true);

  const handleClick = (e) => {
    const lastChar = operation.slice(-1);
    const clickedChar = e.target.name;
    if(operation==="0" && result==="0" || operation==="NaN") {
      return;
    }
    else if(operation==="" && ['*', '-', '+', '/'].includes(clickedChar)){
      return;
    }
    else if (lastChar.match(/[-+*/%]/) && clickedChar.match(/[-+*/%]/)) {
      setOperation(operation.slice(0, -1) + clickedChar);
    }
    else if (clickedChar === "%" && !isNaN(lastChar)) {
      const lastChar = operation;
      setOperation((parseFloat(lastChar) / 100).toString());
    }
    else if (['*', '-', '+', '/'].includes(clickedChar)) {
      setOperation(operation.concat(clickedChar));
      setDotUsed(true);
    }
    else {
      setOperation(operation.concat(clickedChar));
    }
    setIsEqualClicked(false);
  };

  const plusOrMinus = () => {
    const updatedResault = result.replace(/(-?\d+)$/, (match, number) => {
      return parseFloat(number) * -1;});
    setResult(updatedResault);
  };

  const crop = (e) => {
    const clickedChar = e.target.name;
    if(operation==="")
    {
      return;
    }
    else if (dotUsed) {
      setOperation(operation.concat(clickedChar));
      setDotUsed(false);
    }
  }

  const clear = () => {
    setResult("0");
    setOperation("");
    setIsEqualClicked(false);
    setDotUsed(true);
  };

  const calculate = () => {
    const calculatedResult = eval(operation).toString();
    if (isEqualClicked) {
      setOperation(calculatedResult);
      setResult("0");
    } else {
      setResult(calculatedResult);
    }
    setIsEqualClicked(true);
    setDotUsed(true);
  };

  return (
      <>
        <div className="container">
          <div className="output">
            <p className="operation">{operation}</p>
            <p className="result">{result}</p>
          </div>
          <div className="keys">
            <button className="gray" name="%" onClick={handleClick}>%</button>
            <button className="lighter" name="+/-" onClick={plusOrMinus}>+/-</button>
            <button className="lighter" onClick={clear} id="clear">C</button>
            <button className="purple" name="/" onClick={handleClick}>/</button>
            <button className="gray" name="7" onClick={handleClick}>7</button>
            <button className="lighter" name="8" onClick={handleClick}>8</button>
            <button className="white" name="9" onClick={handleClick}>9</button>
            <button className="purple2" name="*" onClick={handleClick}>x</button>
            <button className="gray" name="4" onClick={handleClick}>4</button>
            <button className="lighter" name="5" onClick={handleClick}>5</button>
            <button className="white" name="6" onClick={handleClick}>6</button>
            <button className="purple3" name="-" onClick={handleClick}>-</button>
            <button className="gray" name="1" onClick={handleClick}>1</button>
            <button className="lighter" name="2" onClick={handleClick}>2</button>
            <button className="white" name="3" onClick={handleClick}>3</button>
            <button className="purple4" name="+" onClick={handleClick}>+</button>
            <button className="gray" name="0" onClick={handleClick}>0</button>
            <button className="lighter" name="." onClick={crop}>,</button>
            <button className="white" onClick={calculate} id="result" disabled={operation.endsWith('+') || operation.endsWith('-') || operation.endsWith('*') || operation.endsWith('/') || operation===""||operation.endsWith('%')}>=</button>
          </div>
        </div>
      </>
  );
}

export default App;
