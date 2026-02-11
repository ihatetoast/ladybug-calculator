import classes from './DecimalButton.module.css'

type Props = {
  onDecimalClick: ()=> void;
}

const DecimalButton = ({onDecimalClick}: Props) => {
  return (
    <button className={classes.buttonBase} aria-label="decimal point" onClick={onDecimalClick}>
      <span className={classes.inner}></span>
      <span className={classes.decimal}></span>
    </button>
  )
}

export default DecimalButton
