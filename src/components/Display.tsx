import classes from './Display.module.css';
import { roundResult } from '../helpers/utils.ts';
type Props = {
  runningVal: string;
  answer: number | null;
  showError: boolean;
};

const Display = ({ runningVal, answer, showError }: Props) => {
  // console.log("running val is passed as display", runningVal);
  // console.log("answer is passed as calculated answer ", answer);
  const displayAns = typeof answer === 'number' ? roundResult(answer) : answer;
  return !showError ? (
    <>
      <div className={classes.ledSmall}>{!answer ? null : runningVal}</div>
      <div className={classes.led}>{!answer ? runningVal : displayAns}</div>
    </>
  ) : (
    <>
      <div className={`${classes.ledSmall} ${classes.error}`}>{runningVal}</div>
      <div className={`${classes.led} ${classes.error}`}>Srsly? Only slugs divide by 0!</div>
    </>
  );
};

export default Display;
