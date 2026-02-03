import classes from './Display.module.css';

type Props = {
  runningVal: string;
  answer: number | null;
};

const Display = ({ runningVal, answer }: Props) => {
  // while entering, show the running val. once calculated, show answer in larger and
  // what was calculated above in smaller font
  console.log('running val is ', runningVal);
  console.log('answer is ', answer);
  return (
    <>
      {answer && <div className={classes.ledSmall}>{runningVal}</div>}
      <div className={classes.led}>{!answer ? runningVal : answer}</div>
    </>
  );
};

export default Display;
