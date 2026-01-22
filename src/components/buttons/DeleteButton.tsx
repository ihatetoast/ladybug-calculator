import React from 'react'

type Props = {
  onDeleteClick: ()=> void;
}

const DeleteButton = ({onDeleteClick}: Props) => {
  return (
    <button aria-label="backspace" onClick={onDeleteClick}>Del</button>
  )
}

export default DeleteButton

/**
 * will delete the last number entered
 * not sure about look. 
 * 
 */