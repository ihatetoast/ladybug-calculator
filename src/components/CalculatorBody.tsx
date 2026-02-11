import { useEffect, useState, useCallback } from 'react';

import Display from './Display';
import DeleteButton from './buttons/DeleteButton';
import ToggleSignButton from './buttons/ToggleSignButton';
import OperatorButton from './buttons/OperatorButton';
import NumberButton from './buttons/NumberButton';
import DecimalButton from './buttons/DecimalButton';
import EqualsButton from './buttons/EqualsButton';

import { calculate, evalExpression } from '../helpers/utils.ts';
import { OPERATORS, VALID_KEYS } from '../helpers/variables.ts';
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

  // derive from calculatedAns state
  const isEvaluated = calculatedAns !== null;

  const handleClear = useCallback(
    (type: string) => {
      if (type === 'a/c') {
        setDisplay('0');
        setCurrentValue('0');
        setCalculatedAns(null);
        setExpression([]);
        setLastOperand(null);
        setLastOperation(null);
        setIsError(false);
        return;
      }

      if (type === 'del') {
        if (isError) return; // only ac clears errors

        if (isEvaluated && calculatedAns !== null) {
          // clear running val / history / equation as a string
          setExpression([]);
          if (calculatedAns !== null) {
            const answerStr = calculatedAns.toString();
            const newValue = answerStr.slice(0, -1) || '0';
            setDisplay(newValue);
            setCurrentValue(newValue);
            setCalculatedAns(null);
            return;
          }
        }

        // handle ()s to clear cur val. ()s are a pain.
        if (currentValue.includes('(') || currentValue.includes(')')) {
          setCurrentValue('0');
          setDisplay(expression.join(' '));
          return;
        }
        // one at a time
        if (currentValue && currentValue !== '0') {
          const newValue = currentValue.slice(0, -1) || '0';
          setCurrentValue(newValue);
          setDisplay((prev) => prev.slice(0, -1) || '0');
          return;
        }

        // now after curval being deleted, so delete last value of exp arr
        if (expression.length > 0) {
          const newExp = [...expression];
          newExp.pop(); // Remove last item
          setExpression(newExp);
          setDisplay(newExp.join(' '));
          setCurrentValue('0');
          return;
        }

        setDisplay('0');
        setCurrentValue('0');
        setCalculatedAns(null);
        setExpression([]);
        setLastOperand(null);
        setLastOperation(null);
        setIsError(false);
      }
    },
    [calculatedAns, currentValue, expression, isError, isEvaluated],
  );

  const handleNumberClick = useCallback(
    (val: number) => {
      const valStr = val.toString();
      // if exp is eval, start anew.
      if (isEvaluated) {
        setDisplay(valStr);
        setCurrentValue(valStr);
        setCalculatedAns(null);
        setExpression([]);
        setLastOperand(null);
        setLastOperation(null);
        setIsError(false);
        setDisplay(valStr);
        setCurrentValue(valStr);
        return;
      }
      if (display === '0') {
        setDisplay(valStr);
        setCurrentValue(valStr);
      } else if (currentValue.startsWith('-') && currentValue.length > 1) {
        // implicit mult. if -5 and toggle then 6, expression needs [-5, "x", 6]
        const firstNum = Number(currentValue);
        setDisplay((prev) => `${prev}${valStr}`);
        setExpression((prev) => [...prev, firstNum, 'x']);
        setCurrentValue(valStr);
      } else {
        setDisplay((prev) => prev + valStr);
        setCurrentValue((prev) => prev + valStr);
      }
    },
    [currentValue, display, isEvaluated],
  );

  const handleDecimalClick = useCallback(() => {
    if (currentValue.split('.').length - 1 >= 1) {
      return;
    }
    if (isEvaluated) {
      setDisplay('0');
      setCurrentValue('0');
      setCalculatedAns(null);
      setExpression([]);
      setLastOperand(null);
      setLastOperation(null);
      setIsError(false);
      return;
    }
    // if current is negative, then hitting decimal will trigger implicit mult
    if (currentValue.startsWith('-') && currentValue.length > 1) {
      setExpression((prev) => [...prev, Number(currentValue), 'x']);
      setCurrentValue('');
      setDisplay((prev) => prev.concat('0'));
      return;
    }
    // add 0 before . if previous click was operator: so 4+. becomes 4+0.
    const last = display.slice(0 - 1);
    if (OPERATORS.includes(last)) {
      setDisplay((prev) => prev.concat('0.'));
    } else {
      setDisplay((prev) => prev.concat('.'));
    }
    setCurrentValue((prev) => prev.concat('.'));
  }, [currentValue, display, isEvaluated]);

  const handleOperatorClick = useCallback((operation: string) => {
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
  }, [calculatedAns, currentValue, display, expression, isEvaluated]);

  const handleEqualClick = useCallback(() => {
    const expToEval = [...expression, Number(currentValue)];
    // clicking = again after eval (= = = ...)
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

    // clicking = to evaluate "new" expression:
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
  }, [calculatedAns, currentValue, expression, isEvaluated, lastOperand, lastOperation]);

  const handleToggleClick = useCallback(() => {
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
        const sliceAmt = currentValue.length * -1;
        setCurrentValue(toggled.toString());
        setDisplay((prev) => {
          const newStr = prev.slice(0, sliceAmt) + `(${toggled.toString()})`;
          return newStr;
        });
      }
    }
  }, [calculatedAns, currentValue, expression, isEvaluated]);

  // handle the keyboard:
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      const key = e.key;

      // ignore other keys not part of a calc:
      if (!VALID_KEYS.includes(key)) return;
      // numbers:
      if (key >= '0' && key <= '9') {
        handleNumberClick(Number(key));
        return;
      }

      // operators: all for mult and / for div as ÷ is an option + / combo
      if (key === '+') {
        handleOperatorClick('+');
        return;
      }
      if (key === '-') {
        handleOperatorClick('-');
        return;
      }
      if (key === '*' || key === 'x' || key === 'X') {
        handleOperatorClick('x');
        return;
      }
      if (key === '/') {
        handleOperatorClick('÷');
        return;
      }

      // dec
      if (key === '.') {
        handleDecimalClick();
        return;
      }

      // enter for equals as well as =
      if (key === 'Enter' || key === '=') {
        handleEqualClick();
        return;
      }

      // backspace or del dep on keyboard. both are "Backspace"
      if (key === 'Backspace') {
        handleClear('del');
        return;
      }

      // Escape = all clear
      if (key === 'Escape') {
        handleClear('a/c');
        return;
      }
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [
    handleClear,
    handleDecimalClick,
    handleEqualClick,
    handleNumberClick,
    handleOperatorClick,
    handleToggleClick,
  ]);

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
