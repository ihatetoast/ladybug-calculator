
export const evalExpression = (
  expression: (string | number)[],
): number | string => {
  const tempArr: (number | string)[] = [];

  for (let i = 0; i < expression.length; i++) {
    // first handle mult and divide
    if (expression[i] === 'x') {
      const multiplier = tempArr.pop(); // get last one pushed before x
      const multiplicand = expression[++i];
      const product = calculate(
        multiplier as number,
        multiplicand as number,
        'x',
      );
      tempArr.push(product);
    } else if (expression[i] === '÷') {
      const dividend = tempArr.pop();
      const divisor = expression[++i];
      const quotient = calculate(dividend as number, divisor as number, '÷');
      tempArr.push(quotient);
    } else {
      tempArr.push(expression[i]);
    }
  }

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

  return result;
};

export const calculate = (
  num1: number,
  num2: number,
  operation: string,
): number | string => {
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
};


export function roundResult (num: number): string {
  // round but also remove trailing 00s for display
  return (Math.round(num * 1e10) / 1e10).toString();
};
