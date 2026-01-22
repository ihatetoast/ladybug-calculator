import React from 'react';

type Props = {
  operator: string;
  ariaLabel: string;
  onOperationClick: () => void;
};

const OperatorButton = ({ operator,ariaLabel, onOperationClick }: Props) => {
  return <button aria-label={ariaLabel} onClick={onOperationClick}>{operator}</button>;
};

export default OperatorButton;

/**
 * operator button will be +, -, x, and ÷
 * clicking indicates what operation will be done.
 * each op will have its own style and will be flowers
 * will pass the operator to fcn later
 *
 * petals will be white but the ones that would make the operation shape
 * will be yellow.
 */
