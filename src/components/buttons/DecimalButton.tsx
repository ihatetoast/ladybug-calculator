import classes from './DecimalButton.module.css'

type Props = {
  onDecimalClick: ()=> void;
}

const DecimalButton = ({onDecimalClick}: Props) => {
  return (
    <button className={classes.buttonBase} aria-label="decimal point" onClick={onDecimalClick}>.</button>
  )
}

export default DecimalButton


/**
 * simple dot. 
 * just red circle with black dot. 
 */