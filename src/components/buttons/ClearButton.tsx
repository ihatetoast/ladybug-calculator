import React from 'react'

type Props = {
  onClearClick: ()=> void;
}

const ClearButton = ({onClearClick}: Props) => {
  return (
    <button aria-label="clear" onClick={onClearClick}>ClearButton</button>
    )
  }

export default ClearButton

/**
 * clear clears. all.
 * will be a flyswatter. squareish with grid.
 * onclick will clear but also some scale to show swat
 */