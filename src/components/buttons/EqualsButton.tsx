import classes from './EqualButton.module.css';

type Props = {
  onEqualClick: () => void;
};
// key is index because there's no need for react to keep track.
const EqualsButton = ({ onEqualClick }: Props) => {
  return (
    <button
      className={`${classes.buttonBase} ${classes.equal}`}
      aria-label='equals'
      onClick={() => onEqualClick()}
    >
      <div className={classes.stripes}>
        <span className={classes.end}></span>
        {[...Array(13).keys()].map((_, i) => {
          return (
            <span
              key={i}
              className={i % 2 === 0 ? classes.yellow : classes.green}
            />
          );
        })}
        <span className={classes.end}></span>
        <span className={`${classes.sign} ${classes.top}`}></span>
        <span className={`${classes.sign} ${classes.bottom}`}></span>
      </div>
    </button>
  );
};

export default EqualsButton;
