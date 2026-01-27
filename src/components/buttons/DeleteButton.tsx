import classes from './DeleteButton.module.css';

type Props = {
  text: string;
  onDeleteClick: ()=> void;
}

const DeleteButton = ({text, onDeleteClick}: Props) => {
  return (
    <button className={classes.buttonBase} aria-label="backspace" onClick={onDeleteClick}>{text}</button>
  )
}

export default DeleteButton


// will be a/c and delete dep on the text and function.
// css will have it be a frog https://www.charleyharperartstudio.com/frog-ornament.html
// with text in yellow belly. frogs eat ladybugs