type Props = {
  runningVal: string;
}

const Display = ({runningVal}: Props) => {
  return (
    <div className="bg-slate-200">{runningVal}</div>
  )
}

export default Display