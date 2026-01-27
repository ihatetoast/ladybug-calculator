import React from 'react';
import classes from './NumberButton.module.css';
type Props = {
  value: number;
  onNumberClick: (value:number) => void;
};

const NumberButton = ({ value, onNumberClick}: Props) => {
  return <button className={classes.buttonBase} aria-label={value.toString()} onClick={() =>onNumberClick(value)}>
    <span className={classes.head}></span>

    {value}
    
    </button>;
};

export default NumberButton;

/**
 * NumberButton will have a value for the button and be
 * styled to look like a ladybug
 * onclick applies a style (expose number, move wings)
 * and adds its val to number state arr
 */

/**
 * base holds
 * head
 * 6 legs squares rotated, two borders
 * body (size of base) has numbers
 * wings
 * left and right
 * div val and put dot in each, rem on left
 */