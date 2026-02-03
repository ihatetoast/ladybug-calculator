import { useState } from 'react';

import Display from './Display';
import DeleteButton from './buttons/DeleteButton';
import ToggleSignButton from './buttons/ToggleSignButton';
import OperatorButton from './buttons/OperatorButton';
import NumberButton from './buttons/NumberButton';
import DecimalButton from './buttons/DecimalButton';
import EqualsButton from './buttons/EqualsButton';

import classes from './CalculatorBody.module.css';

const CalculatorBody = () => {
  const [display, setDisplay] = useState<string>('0');
  const [expression, setExpression] = useState<(number | string)[]>([]);
  const [currentValue, setCurrentValue] = useState<string>('0');
  const [calculatedAns, setCalculatedAns] = useState<number | null>(null);
  const [isEvaluated, setIsEvaluated] = useState<boolean>(false);

  function handleClear(type: string) {
    if (type === 'del') {
      setCurrentValue(prev =>  prev.slice(0,-1));
      setDisplay(prev =>  {
        if(prev.length === 1) setDisplay('0');
        return prev.slice(0,-1)}
      );
    }

    if (type === 'a/c') {
      setDisplay('0');
      setCurrentValue('0');
      setCalculatedAns(0)
      setExpression([]);
      setIsEvaluated(false);
    }
  }


  // on smartphone. if the expression was evaluated, the number clicked starts everything over. 
  // create a clear all function so i can use it here and for a/c.



  function handleNumberClick(val: number) {
    const valStr = val.toString();
    if (display === '0') {
      setDisplay(valStr);
      setCurrentValue(valStr);
    } else {
      setDisplay((prev) => prev.concat(valStr));
      setCurrentValue((prev) => prev.concat(valStr));
    }
  }

  // on smartphone. if expression is evaluated, 
  // clicking an operator button clears history or the displayed expression but not the answer.
  // the previous answer becomes the first entry to the expression array. 
  function handleOperatorClick(operation: string) {
    // add to the display
    setDisplay((prev) => prev.concat(operation));

    // move current value to the expression array
    // add operator to expressions array
    setExpression((prev) => [...prev, parseInt(currentValue), operation]);
    setCurrentValue('');
  }

  function handleDecimalClick() {
    console.log('decimal clicked');
  }

  function calculate(
    num1: number,
    num2: number,
    operation: string,
  ): number | string {
    switch (operation) {
      case '+':
        return num1 + num2;
      case '-':
        return num1 - num2;
      case 'x':
        return num1 * num2;
      case '÷':
        if (num2 === 0) return 'Error';
        return num1 / num2;
      default:
        return num2;
    }
  }

  function handleEqualClick() {
    const expressionToEvaluate = [...expression, Number(currentValue)];
    setExpression((prev) => [...prev, parseInt(currentValue)]);
    if (expressionToEvaluate.length < 3) return;
    
    if (
      expressionToEvaluate.length === 3 &&
      typeof expressionToEvaluate[0] === 'number' &&
      typeof expressionToEvaluate[1] === 'string' &&
      typeof expressionToEvaluate[2] === 'number'
    ) {
      const result = calculate(expressionToEvaluate[0], expressionToEvaluate[2], expressionToEvaluate[1]);
      if (typeof result === 'number') {
        setCalculatedAns(result);
        setDisplay(expressionToEvaluate.join(' '));
      } else {
        // if div by 0, error string appears
        setDisplay(result);
      }
      setIsEvaluated(true);
    }
  }

  function handleToggleClick(){
    console.log("toggle toggled");
    // takes string number and turns to negative string. "23" to "-23" and 
    // immediately moves current to eval
    // display/UI will show "(-23)"
  }
  return (
    <div className={classes.calcBody}>
      <div className={classes.screen}>
        <Display runningVal={display} answer={calculatedAns} />
      </div>
      <div className={classes.buttons}>
        <DeleteButton text='a/c' onDeleteClick={() => handleClear('a/c')} />
        <DeleteButton text='del' onDeleteClick={() => handleClear('del')} />
        <ToggleSignButton
          text='+/-'
          onToggleClick={handleToggleClick}
        />
        <OperatorButton
          value='÷'
          ariaLabel='divide'
          onOperationClick={handleOperatorClick}
        />
        <NumberButton value={7} onNumberClick={handleNumberClick} />
        <NumberButton value={8} onNumberClick={handleNumberClick} />
        <NumberButton value={9} onNumberClick={handleNumberClick} />
        <OperatorButton
          value='x'
          ariaLabel='multiply'
          onOperationClick={handleOperatorClick}
        />
        <NumberButton value={4} onNumberClick={handleNumberClick} />
        <NumberButton value={5} onNumberClick={handleNumberClick} />
        <NumberButton value={6} onNumberClick={handleNumberClick} />
        <OperatorButton
          value='-'
          ariaLabel='subtract'
          onOperationClick={handleOperatorClick}
        />
        <NumberButton value={1} onNumberClick={handleNumberClick} />
        <NumberButton value={2} onNumberClick={handleNumberClick} />
        <NumberButton value={3} onNumberClick={handleNumberClick} />
        <OperatorButton
          value='+'
          ariaLabel='add'
          onOperationClick={handleOperatorClick}
        />
        <DecimalButton onDecimalClick={handleDecimalClick} />
        <NumberButton value={0} onNumberClick={handleNumberClick} />
        <EqualsButton onEqualClick={handleEqualClick} />
      </div>
    </div>
  );
};

export default CalculatorBody;
