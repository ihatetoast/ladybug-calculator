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
  // value once an operator fcn btn is clicked
  const [previousValue, setPreviousValue] = useState<string | null>(null);
  // building number
  const [currentValue, setCurrentValue] = useState<string | null>(null);

  function handleClear(type: string) {
    if (type === 'del') {
      console.log('del clicked');
    }

    if (type === 'a/c') {
      console.log('all clear clicked');
      setDisplay('0');
      setPreviousValue('0');
      setCurrentValue('0');
    }
  }

  function handleNumberClick(val: number) {
    console.log('val clicked: ', val);
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
        if (num2 === 0) return 'E';
        return num1 / num2;
      default:
        return num2;
    }
  }

  function handleEqualClick() {
    console.log('equal clicked');
    calculate(2, 3, '+');
  }

  return (
    <div className={classes.calcBody}>
      <div className={classes.screen}>
        <Display runningVal={'123456789'} />
      </div>
      <div className={classes.buttons}>
        <DeleteButton text='a/c' onDeleteClick={() => handleClear('a/c')} />
        <DeleteButton text='del' onDeleteClick={() => handleClear('del')} />
        <ToggleSignButton
          text='+/-'
          onToggleClick={() => console.log('toggle sign clicked')}
        />
        <OperatorButton
          value='÷'
          ariaLabel='divide'
          onOperationClick={() => console.log('divide clicked')}
        />
        <NumberButton value={7} onNumberClick={handleNumberClick} />
        <NumberButton value={8} onNumberClick={handleNumberClick} />
        <NumberButton value={9} onNumberClick={handleNumberClick} />
        <OperatorButton
          value='x'
          ariaLabel='multiply'
          onOperationClick={() => console.log('multiply clicked')}
        />
        <NumberButton value={4} onNumberClick={handleNumberClick} />
        <NumberButton value={5} onNumberClick={handleNumberClick} />
        <NumberButton value={6} onNumberClick={handleNumberClick} />
        <OperatorButton
          value='-'
          ariaLabel='subtract'
          onOperationClick={() => console.log('subtract clicked')}
        />
        <NumberButton value={1} onNumberClick={handleNumberClick} />
        <NumberButton value={2} onNumberClick={handleNumberClick} />
        <NumberButton value={3} onNumberClick={handleNumberClick} />
        <OperatorButton
          value='+'
          ariaLabel='add'
          onOperationClick={() => console.log('add clicked')}
        />
        <DecimalButton onDecimalClick={handleDecimalClick} />
        <NumberButton value={0} onNumberClick={handleNumberClick} />
        <EqualsButton  onEqualClick={handleEqualClick} />
      </div>
    </div>
  );
};

export default CalculatorBody;
