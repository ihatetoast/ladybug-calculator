import React from 'react'

type Props = {
  onDecimalClick: ()=> void;
}

const DecimalButton = ({onDecimalClick}: Props) => {
  return (
    <button aria-label="decimal point" onClick={onDecimalClick}>dot</button>
  )
}

export default DecimalButton


/**
 * takes numbers before and after (until oper)
 * puts . in there. 1, 2, . , 5, 6]
 * becomes 12.56
 * simple dot. 
 * just red circle with black dot. 
 */