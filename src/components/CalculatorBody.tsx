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
   *
   * just lop off one at a time. the above is stupid.
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
    } else if (currentValue.startsWith('-') && currentValue.length > 1) {
      // implicit mult. if -5 and toggle then 6, expression needs [-5, "x", 6]
      const firstNum = parseFloat(currentValue);
      setDisplay((prev) => `${prev}${valStr}`);
      setExpression((prev) => [...prev, firstNum, 'x']);
      setCurrentValue(valStr);
    } else {
      setDisplay((prev) => prev + valStr);
      setCurrentValue((prev) => prev + valStr);
    }
  }
  // katy
  // test is 3 toggle .5. should become (-3).5 or 0.5 and eval to -3 x .5 -1.5
  function handleDecimalClick() {
    if (hasDecimal(currentValue)) {
      return;
    }
    if (isEvaluated) {
      clearAll();
    }
    // if current is negative, then hitting decimal will trigger implicit mult
    if (currentValue.startsWith('-') && currentValue.length > 1) {
      setExpression(prev => [...prev, parseFloat(currentValue), 'x']);
      setCurrentValue('');
      setDisplay((prev) => prev.concat('0'));
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
      // if 6. + convert to 6.0 + in display.
      const needsZero = display.slice(-1) === '.' ? '0' : '';
      setDisplay((prev) => prev + needsZero + operation);
      setExpression((prev) => [...prev, Number(currentValue), operation]);
    }
    setCurrentValue('');
  }

  // todo: 4 - 9 + then = should be 4 - 9 with -5 ans. currently that leads to correct ans but 4 - 9 + 0
  // so if last in display is an oper, ignore
  function handleEqualClick() {
    const expToEval = [...expression, Number(currentValue)];
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
    if (typeof expToEval[expToEval.length - 1] === 'string') {
      expToEval.pop();
    }

    if (expToEval.length < 3) return; // not enough to eval

    setExpression((prev) => [...prev, Number(currentValue)]);

    const result = evalExpression(expToEval);
    // if string, it's an error, so
    if (typeof result === 'string') {
      setDisplay(expToEval.join(' '));
      setIsError(true);
      return;
    }

    const lastOp = expToEval[expToEval.length - 2] as string;
    const lastNum = expToEval[expToEval.length - 1] as number;
    setLastOperand(lastNum);
    setLastOperation(lastOp);
    setCalculatedAns(result);
    const displayString = expToEval.join(' ');
    setDisplay(displayString);
  }

  function handleToggleClick() {
    if (currentValue === '0') return;

    if (isEvaluated) {
      // start over with prev ans toggled and first operand
      setExpression([]);
      setLastOperand(null);
      setLastOperation(null);
      setCalculatedAns(null);
      const toggled = Number(calculatedAns) * -1;
      setCurrentValue(toggled.toString());
      setDisplay(`(${toggled})`);
      return;
    }

    if (!isEvaluated) {
      const toggled = Number(currentValue) * -1;
      if (expression.length === 0) {
        setDisplay(`(${toggled.toString()})`);
        setCurrentValue(toggled.toString());
      } else {
        setCurrentValue(toggled.toString());
        setDisplay((prev) => {
          const newStr = prev.slice(0, -1) + `(${toggled.toString()})`;
          return newStr;
        });
      }
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
