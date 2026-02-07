import { useState } from 'react';

import Display from './Display';
import DeleteButton from './buttons/DeleteButton';
import ToggleSignButton from './buttons/ToggleSignButton';
import OperatorButton from './buttons/OperatorButton';
import NumberButton from './buttons/NumberButton';
import DecimalButton from './buttons/DecimalButton';
import EqualsButton from './buttons/EqualsButton';

import { calculate, evalExpression, hasDecimal } from '../helpers/utils.ts';
import { OPERATORS } from '../helpers/variables.ts';
import classes from './CalculatorBody.module.css';

const CalculatorBody = () => {
  const [display, setDisplay] = useState<string>('0');
  const [expression, setExpression] = useState<(number | string)[]>([]);
  const [currentValue, setCurrentValue] = useState<string>('0');
  const [calculatedAns, setCalculatedAns] = useState<number | null>(null);

  // for double clicking = sign:
  const [lastOperand, setLastOperand] = useState<number | null>(null);
  const [lastOperation, setLastOperation] = useState<string | null>(null);
  const [isError, setIsError] = useState<boolean>(false);

  // deriv from calculatedAns state
  const isEvaluated = calculatedAns !== null;

  /**
   * 
   * when (-45) each del takes one char at a time INSIDE ()s
   * so (-45) to (-4) to (-) to () and ()s stay as i type again.
   *  (-45) to (-4) to (-)  then adding numbers becomes (-5x6) = -30
   * or (-45) to (-4) to (-) to () keeps () when I add more.
   */

  function handleClear(type: string) {
    // if display is 0 and expression is empty. return.

    if (type === 'del') {
      if (isError) return;
      // bug to fix: if the answer is negative, array is nan because of -
      // ? note if neg. slice on the Math.abs and if neg, make neg again.
      if (!isEvaluated) {
        console.log('deleting an unevaluated expression, one char at a time');
      } else {
        console.log(
          'clear history and del one digit at a time of the eval answer',
        );
      }
    }

    if (type === 'a/c') {
      clearAll();
    }
  }

  function handleNumberClick(val: number) {
    const valStr = val.toString();
    // if exp is eval, start anew.
    if (isEvaluated) {
      clearAll();
      setDisplay(valStr);
      setCurrentValue(valStr);
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
    if (hasDecimal(currentValue)) {
      return;
    }
    if (isEvaluated) {
      clearAll();
    }
    // add 0 before . if previous click was operator: so 4+. becomes 4+0.
    const last = display.slice(0 - 1);
    if (OPERATORS.includes(last)) {
      setDisplay((prev) => prev.concat('0.'));
    } else {
      setDisplay((prev) => prev.concat('.'));
    }
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

    // if 6. + convert to 6.0 + in display.
    const lastChar = display.slice(0 - 1);
    if (lastChar === '.') {
      setDisplay((prev) => prev.concat('0'));
    }

    // if current value is empty (not holding a number) and the epxression elem is a string aka oper
    if (
      currentValue === '' &&
      typeof expression[expression.length - 1] === 'string'
    ) {
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
  // katy
  // todo: 4 - 9 + then = should be 4 - 9 with -5 ans. currently that leads to correct ans but 4 - 9 + 0
  // so if last in display is an oper, ignore
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
    const expToEval = [...expression];
    // remove oper to avoid 9 + 4 x =
    if (typeof expToEval[expToEval.length - 1] === 'string') {
      expToEval.pop();
    }

    if (currentValue !== '' && currentValue !== '0') {
      expToEval.push(Number(currentValue));
    }
    if (expToEval.length < 3) return; // not enough to eval

    setExpression((prev) => [...prev, Number(currentValue)]);

    const result = evalExpression(expToEval);
    if (typeof result === 'string') {
      setDisplay(expToEval.join(' '));
      setIsError(true);
      return;
    }

    // remember for when user clicks = after an eval
    const lastOp = expToEval[expToEval.length - 2] as string;
    const lastNum = expToEval[expToEval.length - 1] as number;

    setLastOperand(lastNum);
    setLastOperation(lastOp);
    setCalculatedAns(result);
    setDisplay(expToEval.join(' '));
    setCurrentValue(result.toString());
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
   * desired behaviour
   * 3 toggle (-3)
   * toggle again 3
   * 
   * 4-5 toggle 4+5 because 4 - - 5 is plus
   * toggle again 4+(-5)
   * 
   * if eval and answer was pos becomes neg with ()s
   * ex 3 x 5 = 15 toggle (-15)
   * if pos 4 -6 = -2 toggle 2
   * 
   * 2 toggle (-2) and number becomes mult. (-2)x6
   */
  function handleToggleClick() {
    if (currentValue === '0') {
      return;
    }
    if (typeof calculatedAns === 'number') {
      console.log('calc ans to toggle');
    }
  }

  function clearAll(): void {
    setDisplay('0');
    setCurrentValue('0');
    setCalculatedAns(null);
    setExpression([]);
    setLastOperand(null);
    setLastOperation(null);
    setIsError(false);
  }
  return (
    <div className={classes.calcBody}>
      <div className={classes.screen}>
        <Display
          runningVal={display}
          answer={calculatedAns}
          showError={isError}
        />
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
