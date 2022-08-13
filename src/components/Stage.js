import React from 'react'
import { StyledStage, StyledMessage } from './styles/StyledStage'
import { STAGE_HEIGHT } from '../helpers'
import Cell from './Cell'

const Stage = ({ stage, type, paused, gameOver }) => {
  return (
    <>
      {stage && (
        <>
          <StyledStage
            paused={paused}
            gameOver={gameOver}
            type={type}
            width={stage[0].length}
            height={stage.length}
          >
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
          {paused && <StyledMessage>Paused</StyledMessage>}
          {gameOver && (
            <StyledMessage gameOver={gameOver}>Game Over</StyledMessage>
          )}
        </>
      )}
    </>
  )
}

export default Stage
