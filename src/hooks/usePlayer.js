/* eslint-disable no-loop-func */
import { useState, useCallback } from 'react'
import { TETROMINOS, randomTetromino } from '../tetrominos'
import {
  checkCollision,
  calculateDropPosition,
  copyMatrix,
  STAGE_WIDTH,
  STAGE_HEIGHT,
  rotate,
} from '../helpers'

export const usePlayer = (weights) => {
  const [player, setPlayer] = useState({
    pos: { x: 0, y: 0 },
    tetromino: TETROMINOS[0].shape,
    collided: false,
  })

  const [nextPiece, setNextPiece] = useState([TETROMINOS[0].shape])
  const [holdPiece, setHoldPiece] = useState([TETROMINOS[0].shape])

  const decisionFunction = (stage, currPlayer) => {
    let illegalMoves = 0
    let maxScore = Number.NEGATIVE_INFINITY
    let move = {
      rotation: 0,
      translation: 0,
    }

    for (var rotation = 0; rotation < 4; rotation++) {
      for (var translation = 0; translation < 9; translation++) {
        let features = action(currPlayer, stage, rotation, translation)
        let score =
          features.height * weights.a +
          features.holes * weights.b +
          features.linesCleared * weights.c +
          features.bumpiness * weights.d +
          features.vacant * weights.e
        if (score === Number.NEGATIVE_INFINITY) {
          illegalMoves++
        } else if (score > maxScore) {
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
  const action = (currPlayer, stage, rotation, translation) => {
    let clonedPlayer = JSON.parse(JSON.stringify(currPlayer))

    for (let i = 0; i < rotation; i++) {
      clonedPlayer = playerRotate(clonedPlayer, stage, 1)
    }
    clonedPlayer.pos.x = translation
    let clonedStage = copyMatrix(stage)

    if (!checkCollision(clonedPlayer, clonedStage, { x: 0, y: 0 })) {
      //play piece on a cloned board
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
      clonedPlayer.pos.y = clonedDropPosition

      return calculateScore(newClonedStage, clonedPlayer)
    }
    return Number.NEGATIVE_INFINITY
  }
  const calculateScore = (newClonedStage, clonedPlayer) => {
    let height = 0
    let rowsArr = newClonedStage.reduce(
      (a, row) => a.concat(row.filter((col) => col[0] !== 0).length),
      []
    )
    for (var i = rowsArr.length - 1; i >= 0; i--) {
      if (rowsArr[i] === 0) {
        height = STAGE_HEIGHT - i - 1
        break
      }
    }

    //The sum of the absolute differeces between the heights of adjacent columns.
    let colHeights = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    for (let c = 0; c < newClonedStage[0].length; c++) {
      for (let r = 0; r < newClonedStage.length; r++) {
        if (newClonedStage[r][c][0] !== 0) {
          colHeights[c] = STAGE_HEIGHT - r
          break
        }
      }
    }
    let bumpiness = 0
    for (let j = 0; j < colHeights.length - 1; j++) {
      bumpiness += Math.abs(colHeights[j] - colHeights[j + 1])
    }

    let holes = 0
    for (let r = STAGE_HEIGHT - 1; r > 0; r--) {
      newClonedStage[r].forEach((col, c) => {
        if (col[0] === 0 && newClonedStage[r - 1][c][0] !== 0) {
          holes += 1
        }
      })
    }

    holes = holes * 5

    //Number of lines cleared
    let linesCleared = 0
    for (let r = 0; r < STAGE_HEIGHT; r++) {
      let filled = 0
      for (let c = 0; c < STAGE_WIDTH; c++) {
        if (newClonedStage[r][c][0] !== 0) {
          filled++
        }
      }
      if (filled === 10) {
        linesCleared++
      }
    }
    switch (linesCleared) {
      case 1:
        linesCleared = 1
        break
      case 2:
        linesCleared = 3
        break
      case 3:
        linesCleared = 6
        break
      case 4:
        linesCleared = 12
        break
      default:
        linesCleared = 0
    }

    //Calculate number of holes below placed piece.
    var columns = []
    var rows = []
    let vacant = 0

    clonedPlayer.tetromino.forEach((row, i) =>
      row.forEach((col, j) => {
        if (col[0]) {
          // filled in piece square
          if (columns.indexOf(j + clonedPlayer.pos.x) === -1) {
            columns.push(j + clonedPlayer.pos.x)
            rows.push(i + clonedPlayer.pos.y)
          }
        }
      })
    )

    for (var j = 0; j < columns.length; j++) {
      let c = columns[j] //column to look at
      for (var r = rows[j]; r < STAGE_HEIGHT; r++) {
        if (newClonedStage[r][c][0] === 0) {
          vacant++
        }
      }
    }
    let features = {
      height,
      holes,
      linesCleared,
      bumpiness,
      vacant,
    }

    return features
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
    (stage, ai, currPlayer) => {
      const tetromino =
        nextPiece[0].length === 1 ? randomTetromino().shape : nextPiece[0]
      let rotation = 0
      let newPlayer = {
        pos: { x: 0, y: 0 },
        tetromino: tetromino,
        collided: false,
      }

      if (typeof ai !== 'undefined') {
        let move = decisionFunction(stage, newPlayer) //find best move for newplayer
        newPlayer.pos.x = move.translation
        rotation = move.rotation

        //Apply rotation
        for (let i = 0; i < rotation; i++) {
          newPlayer = playerRotate(newPlayer, stage, 1)
        }
      } else {
        newPlayer.pos.x = STAGE_WIDTH / 2 - 1
      }

      setPlayer(newPlayer)
      setNextPiece([randomTetromino().shape])
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
