import { useState } from 'react';

import Display from './Display';
import DeleteButton from './buttons/DeleteButton';
import ToggleSignButton from './buttons/ToggleSignButton';
import OperatorButton from './buttons/OperatorButton';
import NumberButton from './buttons/NumberButton';
import DecimalButton from './buttons/DecimalButton';
import EqualsButton from './buttons/EqualsButton';

import classes from './CalculatorBody.module.css';

const OPERATORS = ['+', '-', 'x', '÷', '/', '*'];
const VALID_KEYS = [
  '0',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '+',
  '-',
  '*',
  'x',
  '/',
  '.',
  'Enter',
  'Backspace',
  'Escape',
];

const CalculatorBody = () => {
  const [display, setDisplay] = useState<string>('0');
  const [expression, setExpression] = useState<(number | string)[]>([]);
  const [currentValue, setCurrentValue] = useState<string>('0');
  const [calculatedAns, setCalculatedAns] = useState<number | null>(null);

  // deriv from calculatedAns state
  const isEvaluated = calculatedAns !== null;

  function handleClear(type: string) {
    // if display is 0 and expression is empty. return.

    // bug to fix: if the answer is negative, array is nan because of -
    // ? note if neg. slice on the Math.abs and if neg, make neg again.
    if (type === 'del') {
      if (!isEvaluated) {
        console.log('deleting an unevaluated expression');
      } else {
        console.log(
          'deleting history and one digit at a time of the eval answer',
        );
      }
    }

    if (type === 'a/c') {
      setDisplay('0');
      setCurrentValue('0');
      setCalculatedAns(null);
      setExpression([]);
    }
  }

  /**
   * BUG: if expression is evaluated, number starts over. 
   * 
   * need to handle that. check iseval
   * 
   */
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

  /**
   * todo: implement after bugs and before del
   */
  function handleDecimalClick() {
    console.log('decimal clicked');
    // console.log("currentValue ", currentValue);
    // const numberDec = currentValue.concat('.');
    // console.log("decimal ", numberDec[numberDec.length-1]);

    // setDisplay((prev) => prev.concat('.'));
    // setCurrentValue(numberDec);
  }


  /**
   * BUG: after evaluated, if user presses a number
   * a new expression start with answer as first expression.
   * test 2 + 5 = 
   * 7
   * x 10 =
   *  70. if 70, we're good. 
   * if 52, it's doing 2 + 5 x 10
   * 
   */
  function handleOperatorClick(operation: string) {
    // bug: if user already typed + and then types x, just swap. currently it adds the oper like 8+x
    // add to the display
    if (typeof expression[expression.length - 1] === 'string') {
      setDisplay((prev) => {
        const newStr = prev.slice(0, -1) + operation;
        return newStr;
      });

      const newExp = [...expression];
      newExp.splice(-1, 1, operation);
      setExpression(newExp);
    } else {
      setDisplay((prev) => {
        return prev.concat(operation);
      });

      setExpression((prev) => [...prev, parseInt(currentValue), operation]);
    }

    setCurrentValue('');
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
    console.log('expressionToEvaluate ', expressionToEvaluate);
    setExpression((prev) => [...prev, parseInt(currentValue)]);
    // not enough to evaluate:
    if (expressionToEvaluate.length < 3) return;
    // otherwise...
    const tempArr: (number | string)[] = [];
    // get m and d first. push product or quotient to temp arr.
    for (let i = 0; i < expressionToEvaluate.length; i++) {
      if (expressionToEvaluate[i] === 'x') {
        const multiplier = tempArr.pop(); // get last one pushed before x
        const multiplicand = expressionToEvaluate[++i];
        const product = calculate(
          multiplier as number,
          multiplicand as number,
          'x',
        );
        tempArr.push(product);
      } else if (expressionToEvaluate[i] === '÷') {
        const dividend = tempArr.pop();
        const divisor = expressionToEvaluate[++i];
        const quotient = calculate(dividend as number, divisor as number, '÷');
        tempArr.push(quotient);
      } else {
        tempArr.push(expressionToEvaluate[i]);
      }
    }
    // now temp arr has only + - left plus the product and quotient

    // start with first elem in arr which is a number (eg [1, "+", 34, "-", ...])
    let result = tempArr[0] as number;

    // start loop at second elem (idx 1), ...
    for (let i = 1; i < tempArr.length; i += 2) {
      // which will be an operator + or -
      const operator = tempArr[i] as string;
      // and hte one after that is another number
      const nextNum = tempArr[i + 1] as number;
      // and i += 2 skips to next oper
      if (operator === '+') result += nextNum;
      if (operator === '-') result -= nextNum;
    }

    if (typeof result === 'number') {
      setCalculatedAns(result);
      setDisplay(expressionToEvaluate.join(' '));
    } else {
      // if div by 0, error string appears
      setDisplay(result);
    }
  }

  // todo: allow user to use keyboard:
  //
  /**
   * useeffect(() =>{
   * const handleKeyPress = (e) => {
   *  const key = e.key;
   *   if validKeys includes key, handleKeyClick(key)
   *  make sure * and 'x' or "X to lower case" are considered for mult.
   *  ignore ÷. no one knows that
   *  note on ui that this is a basic calc, so doesn't include ( or )
   * }
   *
   * window.addEventListener('keydown', handleKeyPress);
   *  and clean up with
   *  return () => {
   *   window.removeEventListener('keydown', handleKeyPress);
   * }
   *
   * }, [])
   *
   */



  /**
   * BUG 1: doesn't move toggled to expression yet. move it and clear current
   * 
   *  BUG 2: on smartphone someting like 3 toggle 4 looks like
   * (-3)x5
   *  so handle implicit mult
   */
  function handleToggleClick() {
    if (currentValue === '0') {
      return;
    }
    const currNumber = Number(currentValue);
    const toggled = (currNumber * -1).toString();
    setCurrentValue(toggled);
    setDisplay(toggled);
  }

  return (
    <div className={classes.calcBody}>
      <div className={classes.screen}>
        <Display runningVal={display} answer={calculatedAns} />
      </div>
      <div className={classes.buttons}>
        <DeleteButton text='a/c' onDeleteClick={() => handleClear('a/c')} />
        <DeleteButton text='del' onDeleteClick={() => handleClear('del')} />
        <ToggleSignButton  onToggleClick={handleToggleClick} />
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
