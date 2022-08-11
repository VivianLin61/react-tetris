import { useState, useCallback } from 'react'
import { TETROMINOS, randomTetromino } from '../tetrominos'
import {
  checkCollision,
  calculateDropPosition,
  copyMatrix,
  getRandomInt,
  STAGE_WIDTH,
  rotate,
} from '../helpers'

export const usePlayer = () => {
  const [player, setPlayer] = useState({
    pos: { x: 0, y: 0 },
    tetromino: TETROMINOS[0].shape,
    collided: false,
  })

  const [nextPiece, setNextPiece] = useState([TETROMINOS[0].shape])
  const [holdPiece, setHoldPiece] = useState([TETROMINOS[0].shape])

  const decisionFunction = (stage, ai) => {
    let illegalMoves = 0
    let maxScore = Number.MAX_VALUE
    let move = {
      rotation: 0,
      translation: 0,
    }

    for (var translation = 0; translation < 9; translation++) {
      for (var rotation = 0; rotation < 4; rotation++) {
        let score = action(player, stage, rotation, translation)
        if (score === Number.NEGATIVE_INFINITY) {
          illegalMoves++
        } else if (score < maxScore) {
          maxScore = score
          move.rotation = rotation
          move.translation = translation
        }
      }
    }

    if (illegalMoves === 36) {
      console.log()
      // endGame()
      return
    }
    //rotation times
    return move
  }
  const action = (player, stage, rotation, translation) => {
    let clonedPlayer = JSON.parse(JSON.stringify(player))

    for (let i = 0; i < rotation; i++) {
      clonedPlayer = playerRotate(clonedPlayer, stage, 1)
    }
    clonedPlayer.pos.x = translation
    let clonedStage = copyMatrix(stage)

    if (!checkCollision(clonedPlayer, clonedStage, { x: 0, y: 0 })) {
      //play piece on a cloned board
      let score = getRandomInt(0, 100)
      const newClonedStage = clonedStage.map((row) =>
        row.map((cell) =>
          cell[1] === 'clear' || cell[1] === 'ghost' ? [0, 'clear'] : cell
        )
      )
      //Draw merged block on cloned stage
      let clonedDropPosition = calculateDropPosition(clonedStage, clonedPlayer)
      const drop = clonedDropPosition - clonedPlayer.pos.y

      clonedPlayer.tetromino.forEach((row, y) => {
        row.forEach((value, x) => {
          if (value !== 0) {
            newClonedStage[y + drop][x + player.pos.x] = [value, 'merged']
          }
        })
      })
      // calculateScore(newClonedStage)
      return score
    }
    return Number.NEGATIVE_INFINITY
  }

  const playerRotate = (currPlayer, stage, dir) => {
    const clonedPlayer = JSON.parse(JSON.stringify(currPlayer))
    clonedPlayer.tetromino = rotate(clonedPlayer.tetromino, dir)
    // Check collision on rotate
    const pos = clonedPlayer.pos.x
    let offset = 1
    while (checkCollision(clonedPlayer, stage, { x: 0, y: 0 })) {
      clonedPlayer.pos.x += offset
      offset = -(offset + (offset > 0 ? 1 : -1))
      if (offset > clonedPlayer.tetromino[0].length) {
        rotate(clonedPlayer.tetromino, -dir)
        clonedPlayer.pos.x = pos
        return clonedPlayer
      }
    }

    return clonedPlayer
  }

  const updatePlayerPos = ({ x, y, collided }) => {
    setPlayer((prev) => ({
      ...prev,
      pos: { x: prev.pos.x + x, y: prev.pos.y + y },
      collided,
    }))
  }

  const updatePlayerPiece = () => {
    const currentTetromino = player.tetromino
    const tetromino = holdPiece[0]
    setHoldPiece([currentTetromino]) //Save to hold stage
    if (tetromino.length !== 1) {
      setPlayer((prev) => ({
        ...prev,
        tetromino: tetromino,
      }))
    } else {
      resetPlayer()
    }
  }

  //Generate new tetromino at the top of the stage
  const resetPlayer = useCallback(
    (stage, ai) => {
      const tetromino =
        nextPiece[0].length === 1 ? randomTetromino().shape : nextPiece[0]
      let xPos = STAGE_WIDTH / 2 - 1
      let rotation = 0
      let newPlayer = {
        pos: { x: xPos, y: 0 },
        tetromino: tetromino,
        collided: false,
      }
      if (typeof ai !== 'undefined') {
        let move = decisionFunction(stage)
        console.log(move)
        newPlayer.pos.x = move.translation
        rotation = move.rotation

        //Apply rotation
        for (let i = 0; i < rotation; i++) {
          newPlayer = playerRotate(newPlayer, stage, 1)
        }
      }

      setPlayer(newPlayer)
      setNextPiece([randomTetromino().shape])
    },
    [nextPiece]
  )

  return [
    player,
    setPlayer,
    updatePlayerPos,
    resetPlayer,
    playerRotate,
    nextPiece,
    holdPiece,
    updatePlayerPiece,
  ]
}
