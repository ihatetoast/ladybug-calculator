import React from 'react'

type Props = {
  onEqualClick: ()=> void;
}

const EqualsButton = ({onEqualClick}: Props) => {
  return (
    <button aria-label="equals" onClick={onEqualClick}>EqualsButton</button>
  )
}

export default EqualsButton

/**
 * has only one job, but is still its own button bc 
 * it will have its own style
 * two twigs?
 */