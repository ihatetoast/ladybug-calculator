import classes from './OperatorButton.module.css';

type Props = {
  value: string;
  ariaLabel: string;
  onOperationClick: (value: string) => void;
};

const OperatorButton = ({ value, ariaLabel, onOperationClick }: Props) => {
  return <button className={classes.buttonBase} aria-label={ariaLabel} onClick={() =>onOperationClick(value)}>{value}</button>;
};

export default OperatorButton;
