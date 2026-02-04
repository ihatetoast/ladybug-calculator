import classes from './OperatorButton.module.css';

type OperatorType = '+' | 'x' | '-' | '÷';

type Props = {
  value: OperatorType;
  ariaLabel: string;
  onOperationClick: (value: string) => void;
};

const OperatorButton = ({ value, ariaLabel, onOperationClick }: Props) => {
  const operatorPetals: Record<OperatorType, number[]> = {
    '+': [0, 2, 4, 6], // vert and hoiz
    x: [1, 3, 5, 7], // diags
    '-': [0, 4], // just horiz
    '÷': [0, 4], // just horiz (plus dots on 2, 6)
  };

  return (
    <button
      className={classes.buttonBase}
      aria-label={ariaLabel}
      onClick={() => onOperationClick(value)}
    >
      <div className={classes.bgPetals}>
        <span className={classes.bgPetal} />
        <span className={classes.bgPetal} />
        <span className={classes.bgPetal} />
        <span className={classes.bgPetal} />
        <span className={classes.bgPetal} />
        <span className={classes.bgPetal} />
        <span className={classes.bgPetal} />
        <span className={classes.bgPetal} />
      </div>
      <div className={classes.signPetals}>
        {[0, 1, 2, 3, 4, 5, 6, 7].map((petal) => (
          <span
            key={petal}
            className={`
              ${classes.signPetal} 
              ${operatorPetals[value]?.includes(petal) ? classes.active : ''}`}
          >
            {(value === '÷' && (petal === 2 || petal === 6)) && <span className={classes.divDot}/>  }
        </span>))}
      </div>

      <span className={classes.disk}> {value}</span>
    </button>
  );
};

export default OperatorButton;
