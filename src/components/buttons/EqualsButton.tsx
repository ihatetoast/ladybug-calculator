import classes from './EqualButton.module.css';

type Props = {
  onEqualClick: () => void;
};

const EqualsButton = ({ onEqualClick }: Props) => {
  return (
    <button
      className={`${classes.buttonBase} ${classes.equal}`}
      aria-label='equals'
      onClick={onEqualClick}
    >
      <div className={classes.stripes}>
        
        <span className={classes.end}></span>
        <span className={classes.white}></span>
        <span className={classes.black}></span>
        <span className={classes.yellow}></span>
        <span className={classes.white}></span>
        <span className={classes.green}></span>
        <span className={classes.white}></span>
        <span className={classes.yellow}></span>
        <span className={classes.black}></span>
        <span className={classes.yellow}></span>
        <span className={classes.white}></span>
        <span className={classes.green}></span>
        <span className={classes.white}></span>
        <span className={classes.yellow}></span>
        <span className={classes.black}></span>
        <span className={classes.yellow}></span>
        <span className={classes.white}></span>
        <span className={classes.green}></span>
        <span className={classes.white}></span>
        <span className={classes.yellow}></span>
        <span className={classes.black}></span>
        <span className={classes.yellow}></span>
        <span className={classes.white}></span>
        <span className={classes.green}></span>
        <span className={classes.white}></span>
        <span className={classes.yellow}></span>
        <span className={classes.black}></span>
        <span className={classes.white}></span>
        <span className={classes.end}></span>

        <span className={`${classes.sign} ${classes.top}`}></span>
        <span className={`${classes.sign} ${classes.bottom}`}></span>
      </div>
    </button>
  );
};

export default EqualsButton;
