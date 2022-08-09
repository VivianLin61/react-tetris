import React from 'react'
import { StyledCell } from './styles/StyledCell'
import { TETROMINOS } from '../tetrominos'

// React.memo makes sure we only re-render the changed cells
const Cell = ({ type, ghost }) => {
  return (
    <StyledCell
      type={type}
      color={TETROMINOS[type].color}
      ghost={ghost}
    ></StyledCell>
  )
}

export default React.memo(Cell)
