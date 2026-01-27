import classes from './EqualButton.module.css'

type Props = {
  onEqualClick: ()=> void;
}

const EqualsButton = ({onEqualClick}: Props) => {
  return (
    <button className={classes.buttonBase} aria-label="equals" onClick={onEqualClick}>=</button>
  )
}

export default EqualsButton

/**
 * has only one job, but is still its own button bc 
 * it will have its own style
 * two twigs?
 */