import classes from './NumberButton.module.css';
type Props = {
  value: number;
  onNumberClick: (value: number) => void;
};

const NumberButton = ({ value, onNumberClick }: Props) => {
  const right = Math.floor(value / 2);
  const left = value % 2 === 0 ? Math.floor(value / 2) : Math.ceil(value / 2);

  console.log(value);
  console.log(right, left);

  return (
    <button
      className={classes.buttonBase}
      aria-label={value.toString()}
      onClick={() => onNumberClick(value)}
    >
      <span className={classes.antennae}></span>

      <span className={`${classes.eye} ${classes.leftEye}`}></span>
      <span className={`${classes.eye} ${classes.rightEye}`}></span>

      <span className={`${classes.shoulder} ${classes.leftShoulder}`}></span>
      <span className={`${classes.shoulder} ${classes.rightShoulder}`}></span>

      <span className={`${classes.leg} ${classes.leftTop}`}></span>
      <span className={`${classes.leg} ${classes.leftMid}`}></span>
      <span className={`${classes.leg} ${classes.leftBottom}`}></span>
      <span className={`${classes.leg} ${classes.rightTop}`}></span>
      <span className={`${classes.leg} ${classes.rightMid}`}></span>
      <span className={`${classes.leg} ${classes.rightBottom}`}></span>

      <span className={classes.number}>{value}</span>

      <span className={`${classes.wing} ${classes.leftWing}`}></span>
      <span className={`${classes.wing} ${classes.rightWing}`}></span>


    </button>
  );
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
