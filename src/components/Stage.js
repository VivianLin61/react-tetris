import React from 'react'
import { StyledStage } from './styles/StyledStage'
import { STAGE_HEIGHT } from '../helpers'
import Cell from './Cell'

const Stage = ({ stage, type }) => {
  return (
    <>
      {stage && (
        <StyledStage type={type} width={stage[0].length} height={stage.length}>
          {stage.map((row, y) =>
            row.map((cell, x) => {
              return (
                <Cell
                  key={x}
                  type={cell[0]}
                  ghost={cell[1] === 'ghost'}
                  hidden={stage.length === STAGE_HEIGHT && y < 1}
                />
              )
            })
          )}
        </StyledStage>
      )}
    </>
  )
}

export default Stage
