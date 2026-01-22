import React from 'react';

type Props = {
  val: number;
  onNumberClick: () => void;
};

const BugButton = ({ val, onNumberClick}: Props) => {
  return <button aria-label={val.toString()} onClick={onNumberClick}>{val}</button>;
};

export default BugButton;

/**
 * BugButton will have a value for hte button and be
 * styled to look like a ladybug
 * onclick applies a style (expose number, move wings)
 * and adds its val to number state arr
 */
