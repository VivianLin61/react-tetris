import React from 'react'
import { StyledCell, HiddenCell } from './styles/StyledCell'
import { TETROMINOS } from '../tetrominos'

// React.memo makes sure we only re-render the changed cells
const Cell = ({ type, ghost, hidden }) => {
  return (
    <>
      {hidden ? (
        <HiddenCell
          type={type}
          color={TETROMINOS[type].color}
          ghost={ghost}
        ></HiddenCell>
      ) : (
        <StyledCell
          type={type}
          color={TETROMINOS[type].color}
          ghost={ghost}
        ></StyledCell>
      )}
    </>
  )
}

export default React.memo(Cell)
