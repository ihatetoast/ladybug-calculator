import { useState } from 'react';

import Display from './Display';
import DeleteButton from './buttons/DeleteButton';
import ToggleSignButton from './buttons/ToggleSignButton';
import OperatorButton from './buttons/OperatorButton';
import NumberButton from './buttons/NumberButton';
import DecimalButton from './buttons/DecimalButton';
import EqualsButton from './buttons/EqualsButton';

import { calculate, evalExpression } from '../helpers/utils.ts';

import classes from './CalculatorBody.module.css';

const CalculatorBody = () => {
  const [display, setDisplay] = useState<string>('0');
  const [expression, setExpression] = useState<(number | string)[]>([]);
  const [currentValue, setCurrentValue] = useState<string>('0');
  const [calculatedAns, setCalculatedAns] = useState<number | null>(null);

  // for double clicking = sign:
  const [lastOperand, setLastOperand] = useState<number | null>(null);
  const [lastOperation, setLastOperation] = useState<string | null>(null);

  // todo: add isError state to manage. only AC works if there's an error (div by 0 )

  // deriv from calculatedAns state
  const isEvaluated = calculatedAns !== null;

  function handleClear(type: string) {
    // if display is 0 and expression is empty. return.

    // bug to fix: if the answer is negative, array is nan because of -
    // ? note if neg. slice on the Math.abs and if neg, make neg again.
    if (type === 'del') {
      if (!isEvaluated) {
        console.log('deleting an unevaluated expression, one char at a time');
      } else {
        console.log(
          'clear history and del one digit at a time of the eval answer',
        );
      }
    }

    if (type === 'a/c') {
      setDisplay('0');
      setCurrentValue('0');
      setCalculatedAns(null);
      setExpression([]);
      setLastOperand(null);
      setLastOperation(null);
    }
  }

  function handleNumberClick(val: number) {
    const valStr = val.toString();
    // if exp is eval, start anew.
    if (isEvaluated) {
      setExpression([]);
      setCalculatedAns(null);
      setDisplay(valStr);
      setCurrentValue(valStr);
      setLastOperation(null);
      setLastOperand(null);
      return;
    }
    if (display === '0') {
      setDisplay(valStr);
      setCurrentValue(valStr);
    } else {
      setDisplay((prev) => prev.concat(valStr));
      setCurrentValue((prev) => prev.concat(valStr));
    }
  }

  function handleDecimalClick() {
    console.log('currentValue ', currentValue);

    setDisplay((prev) => prev.concat('.'));
    setCurrentValue((prev) => prev.concat('.'));
  }

  function handleOperatorClick(operation: string) {
    // previous answer. user clicks oper, prev ans becomes first in expression
    if (isEvaluated && calculatedAns !== null) {
      setExpression([calculatedAns, operation]);
      setDisplay(`${calculatedAns}${operation}`);
      setCurrentValue('0');
      setCalculatedAns(null);
      return;
    }
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

      setExpression((prev) => [...prev, Number(currentValue), operation]);
    }

    setCurrentValue('');
  }

  function handleEqualClick() {
    // CASE 1:  clicking = again after eval (= = = ...)
    if (
      isEvaluated &&
      lastOperation !== null &&
      calculatedAns !== null &&
      lastOperand !== null
    ) {
      const newResult = calculate(calculatedAns, lastOperand, lastOperation);
      setCalculatedAns(newResult as number);
      setDisplay(`${calculatedAns} ${lastOperation} ${lastOperand}`);
      return;
    }

    // CASE 2: clicking = to evaluate "new" expression:
    // CASE 2b: if no number after last operation, just add 0
    const expToEval = [...expression, Number(currentValue)];
    if (expToEval.length < 3) return; // not enough to eval
    setExpression((prev) => [...prev, Number(currentValue)]);

    const result = evalExpression(expToEval);
    if (typeof result === 'string') {
      // todo: needs to show bad equation above error msg
      setDisplay(result);
      return;
    }

    // remember for when user clicks = after an eval
    const lastOp = expToEval[expToEval.length - 2] as string;
    const lastNum = expToEval[expToEval.length - 1] as number;

    setLastOperand(lastNum);
    setLastOperation(lastOp);
    setCalculatedAns(result);
    setDisplay(expToEval.join(' '));
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
   * and dealing with the ()s makes it buggier. hold on this.
   *
   *  BUG 2: on smartphone someting like 3 toggle 4 looks like
   * (-3)x5
   *  so handle implicit mult
   */
  function handleToggleClick() {
    if (currentValue === '0') {
      return;
    }
    if (typeof calculatedAns === 'number') {
      console.log('calc ans to toggle');
    }
  }

  return (
    <div className={classes.calcBody}>
      <div className={classes.screen}>
        <Display runningVal={display} answer={calculatedAns} />
      </div>
      <div className={classes.buttons}>
        <DeleteButton text='a/c' onDeleteClick={() => handleClear('a/c')} />
        <DeleteButton text='del' onDeleteClick={() => handleClear('del')} />
        <ToggleSignButton onToggleClick={handleToggleClick} />
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
