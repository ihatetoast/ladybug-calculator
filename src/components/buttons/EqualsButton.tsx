import classes from './EqualButton.module.css';

type Props = {
  onEqualClick: () => void;
};
// todo: after colored pencil doodling, redo the span. 
// let the spans be y or g depending on nth-of-type odd/even, then let teh black or white come from border colors. y gets b, g gets white borders. OR let left right. play. 
// but just do 12-18 from an array and let nth-of-type odd even every 3rd etc det color
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
