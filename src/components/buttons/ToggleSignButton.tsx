import classes from './ToggleSignButton.module.css';

type Props = {
  onToggleClick: () => void;
};

const ToggleSignButton = ({ onToggleClick }: Props) => {
  const dash = "\u2013";
  return (
    <button
      className={classes.buttonBase}
      aria-label='positive negative toggle'
      onClick={onToggleClick}
    >
      <div className={`${classes.buttonSemi} ${classes.black}`}>
        <span className={`${classes.signs} ${classes.pos}`}>+</span>
      </div>

      <div className={`${classes.buttonSemi} ${classes.red}`}>
        <span className={`${classes.signs} ${classes.neg}`}>{dash}</span>
      </div>
    </button>
  );
};

export default ToggleSignButton;

