import classes from './ToggleSignButton.module.css'

type Props = {
  text: string;
  onToggleClick: () => void;
};

const ToggleSignButton = ({ text, onToggleClick }: Props) => {
  return (
    <button className={classes.buttonBase} aria-label='positive negative toggle' onClick={onToggleClick}>
      {text}
    </button>
  );
};

export default ToggleSignButton;

/**
 * twigs? small
 * keep itsimple. it's charley harper
 */
