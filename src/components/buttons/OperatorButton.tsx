import classes from './OperatorButton.module.css';

type Props = {
  value: string;
  ariaLabel: string;
  onOperationClick: () => void;
};

const OperatorButton = ({ value, ariaLabel, onOperationClick }: Props) => {
  return <button className={classes.buttonBase} aria-label={ariaLabel} onClick={onOperationClick}>{value}</button>;
};

export default OperatorButton;
