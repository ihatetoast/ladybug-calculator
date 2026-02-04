import classes from './Display.module.css';

type Props = {
  runningVal: string;
  answer: number | null;
};

const Display = ({ runningVal, answer }: Props) => {
  // while entering, show the running val. once calculated, show answer in larger and
  // what was calculated above in smaller font
  return (
    <>
      <div className={classes.ledSmall}>{!answer ? null : runningVal}</div>
      <div className={classes.led}>{!answer ? runningVal : answer}</div>
    </>
  );
};

export default Display;
