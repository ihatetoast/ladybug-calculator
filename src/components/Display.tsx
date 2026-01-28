import classes from './Display.module.css'

type Props = {
  runningVal: string;
}

const Display = ({runningVal}: Props) => {
  return (
    <div className={classes.led}>{runningVal}</div>
  )
}

export default Display