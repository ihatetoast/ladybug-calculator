import classes from './DeleteButton.module.css';

type Props = {
  text: string;
  onDeleteClick: () => void;
};

const DeleteButton = ({ text, onDeleteClick }: Props) => {
  return (
    <button
      className={classes.buttonBase}
      aria-label='backspace'
      onClick={onDeleteClick}
    >
      <div className={classes.swatterHandle}></div>
      <div className={classes.swatterGrid}></div>
      <div className={classes.bugGuts}>
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map(i =>  <span key={i} className={classes.goop}></span>)}
  
      </div>
      <div className={classes.swatterText}>{text}</div>
    </button>
  );
};

export default DeleteButton;

