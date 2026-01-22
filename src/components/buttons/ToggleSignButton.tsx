import React from 'react'

type Props = {
  onToggle: () => void;
}

const ToggleSignButton = ({onToggle}: Props) => {
  return (
    <button aria-label="positive negative toggle" onClick={onToggle}>ToggleSignButton</button>
  )
}

export default ToggleSignButton

/**
 * twigs? small
 * keep itsimple. it's charley harper
 */