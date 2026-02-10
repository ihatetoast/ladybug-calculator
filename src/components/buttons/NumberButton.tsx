import classes from './NumberButton.module.css';
type Props = {
  value: number;
  onNumberClick: (value: number) => void;
};

const NumberButton = ({ value, onNumberClick }: Props) => {
  const right = Math.floor(value / 2);
  const left = value - right;
  // i for key because there will never be change to this and react can mind its own bidniss
  const leftDots = [...Array(left).keys()].map((_, i) => (
    <span key={i} className={classes.wingDot} />
  ));
  const rightDots = [...Array(right).keys()].map((_, i) => (
    <span key={i} className={classes.wingDot} />
  ));

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

      <span className={`${classes.wing} ${classes.leftWing}`}>{leftDots}</span>
      <span className={`${classes.wing} ${classes.rightWing}`}>
        {rightDots}
      </span>
    </button>
  );
};

export default NumberButton;
