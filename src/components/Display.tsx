import classes from './Display.module.css';
import {roundResult } from '../helpers/utils.ts';
type Props = {
  runningVal: string;
  answer: number | null;
  showError: boolean;
};

const Display = ({ runningVal, answer, showError }: Props) => {
 const displayAns = typeof answer === "number" ? roundResult(answer) : answer;
  return (!showError ?
    <>
      <div className={classes.ledSmall}>{!answer ? null : runningVal}</div>
      <div className={classes.led}>{!answer ? runningVal : displayAns}</div>
    </> :
    <>
      <div className={`${classes.ledSmall} ${classes.error}`}>{runningVal}</div>
      <div className={classes.led}>Error</div>
    </>
  );
};

export default Display;
