import { useState, useEffect } from 'react'
import { createStage } from '../helpers'
import { checkCollision, STAGE_HEIGHT } from '../helpers'
export const useStage = (player, resetPlayer, setGhost) => {
  const [stage, setStage] = useState(createStage())
  const [rowsCleared, setRowsCleared] = useState(0)
  const [dropPosition, setDropPosition] = useState(0)

  useEffect(() => {
    setRowsCleared(0)
    const calculateDropPosition = (newStage) => {
      let ghostY = player.pos.y
      while (
        !checkCollision(player, newStage, { x: 0, y: 1 }, ghostY) &&
        ghostY < STAGE_HEIGHT
      ) {
        ghostY += 1
      }
      return ghostY
    }

    const clearRows = (newStage) =>
      newStage.reduce((ack, row) => {
        if (row.findIndex((cell) => cell[0] === 0) === -1) {
          //Current row needs to be cleared
          setRowsCleared((prev) => prev + 1) //Increment rows cleared
          ack.unshift(new Array(newStage[0].length).fill([0, 'clear'])) //Do not append current row, append new empty array to top of stage
          return ack
        }
        // Current row does not need to be cleared
        ack.push(row)
        return ack
      }, [])

    const updateStage = (prevStage) => {
      // First flush the stage
      const newStage = prevStage.map((row) =>
        row.map((cell) => (cell[1] === 'clear' ? [0, 'clear'] : cell))
      )

      //Draw the tetromino
      player.tetromino.forEach((row, y) => {
        row.forEach((value, x) => {
          if (value !== 0) {
            newStage[y + player.pos.y][x + player.pos.x] = [
              value,
              `${player.collided ? 'merged' : 'clear'}`,
            ]
          }
        })
      })
      setDropPosition(calculateDropPosition(newStage))

      // Check if piece collided and then generate new piece
      if (player.collided) {
        resetPlayer()
        return clearRows(newStage)
      }
      return newStage
    }

    setStage((prev) => updateStage(prev))
  }, [
    player,
    player.collided,
    player.pos.x,
    player.pos.y,
    player.tetromino,
    resetPlayer,
  ])

  return [stage, setStage, rowsCleared, dropPosition]
}
