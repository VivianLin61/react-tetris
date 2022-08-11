import React, { useState, useEffect } from 'react'
import { checkCollision, createStage, LEFT, RIGHT, DOWN, UP } from '../helpers'
//Custom Hooks
import { useInterval } from '../hooks/useInterval'
import { usePlayer } from '../hooks/usePlayer'
import { useStage } from '../hooks/useStage'
//Components
import Stage from './Stage'
import Display from './Display'
import Button from './Button'
//Styled Components
import { ButtonsWrapper } from './Button'
import {
  StyledTetrisWrapper,
  StyledTetris,
  StyledText,
  StyledTitle,
} from './styles/StyledTetris'

const Tetris = () => {
  const [dropTime, setDropTime] = useState(null)
  const [gameOver, setGameOver] = useState(false)
  const [rows, setRows] = useState(0)
  const [ai, setAI] = useState(false)
  const [weights, setWeights] = useState({
    a: 0,
    b: 0,
    c: 0,
    d: 0,
    e: 0,
  })
  const [
    player,
    setPlayer,
    updatePlayerPos,
    resetPlayer,
    playerRotate,
    nextPiece,
    holdPiece,
    updatePlayerPiece,
    bestPlayer,
  ] = usePlayer(weights)

  const [stage, setStage, rowsCleared, dropPosition] = useStage(
    player,
    resetPlayer,
    bestPlayer,
    ai
  )

  const [nextStage, setNextStage] = useState(createStage(4, 4))
  const [holdStage, setHoldStage] = useState(createStage(4, 4))
  const [spacePressed, setSpacePressed] = useState(false)

  const setUpGame = () => {
    setStage(createStage())
    setNextStage(createStage(4, 4))
    setDropTime(1000)
    setGameOver(false)
    setRows(0)
  }
  const startGame = () => {
    setUpGame()
    resetPlayer()
  }
  const startAI = () => {
    setUpGame()
    setAI(true)
    setWeights({
      a: 0.012986105043601821,
      b: -0.33099889329580323,
      c: 0.5446471620000896,
      d: -0.25120763453283845,
      e: -0.13253702980064244,
    })
    resetPlayer(stage, true)
  }

  const updateSideStage = (prevHoldStage, piece) => {
    const newStage = prevHoldStage.map((row) => row.map((cell) => [0, 'clear']))
    piece.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value !== 0) {
          newStage[y][x] = [value]
        }
      })
    })

    return newStage
  }
  useEffect(() => {
    setHoldStage((prev) => updateSideStage(prev, holdPiece[0]))
  }, [holdPiece, setHoldStage])

  useEffect(() => {
    setNextStage((prev) => updateSideStage(prev, nextPiece[0]))
  }, [nextPiece, setNextStage])

  useEffect(() => {
    if (rowsCleared > 0) {
      setRows((prev) => prev + rowsCleared)
    }
  }, [rowsCleared])

  const movePlayer = (dir) => {
    if (!checkCollision(player, stage, { x: dir, y: 0 })) {
      updatePlayerPos({ x: dir, y: 0 })
    }
  }

  const drop = () => {
    if (!checkCollision(player, stage, { x: 0, y: 1 })) {
      updatePlayerPos({ x: 0, y: 1, collided: false })
    } else {
      // Game Over
      if (player.pos.y < 1) {
        console.log('GAME OVER!!!')
        setGameOver(true)
        setDropTime(null)
      }
      updatePlayerPos({ x: 0, y: 0, collided: true })
    }
  }

  const keyUp = ({ keyCode }) => {
    if (!gameOver) {
      if (keyCode === 40) {
        // When user releases DOWN key turn on interval
        setDropTime(1000)
      }
      if (keyCode === 32) {
        setSpacePressed(false)
      }
    }
  }

  const dropPlayer = () => {
    // When user presses DOWN key turn off interval
    setDropTime(null)
    drop()
  }

  const hardDrop = () => {
    const dropHeight = dropPosition - player.pos.y
    updatePlayerPos({ x: 0, y: dropHeight, collided: true })
  }

  const move = (e) => {
    if (!gameOver) {
      if (e.keyCode === LEFT) {
        movePlayer(-1)
      } else if (e.keyCode === RIGHT) {
        movePlayer(1)
      } else if (e.keyCode === DOWN) {
        dropPlayer()
      } else if (e.keyCode === UP) {
        setPlayer(playerRotate(player, stage, 1)) //Rotate the player on the stage clockwise
      } else if (e.keyCode === 32) {
        e.preventDefault()
        if (spacePressed === false) {
          setSpacePressed(true)
          hardDrop()
        }
      } else if (e.keyCode === 67) {
        updatePlayerPiece()
      }
    }
  }

  useInterval(() => {
    if (!gameOver) {
      drop()
    }
  }, dropTime)

  // console.log('re-render')
  return (
    <StyledTetrisWrapper
      role='button'
      tabIndex='0'
      onKeyDown={(e) => move(e)}
      onKeyUp={keyUp}
    >
      <StyledTitle>TETRIS</StyledTitle>
      <StyledTetris>
        <div>
          <StyledText>HOLD</StyledText>
          <Stage stage={holdStage} />
        </div>
        <Stage stage={stage} type={'main'} />
        <div>
          <StyledText>NEXT</StyledText>
          <Stage stage={nextStage} />
          {gameOver ? (
            <Display gameOver={gameOver} text='Game Over' />
          ) : (
            <div>
              <Display text={`Lines: ${rows}`} />
            </div>
          )}
        </div>
      </StyledTetris>
      <ButtonsWrapper>
        <Button type={'Play'} size={'large'} callback={startGame} />
      </ButtonsWrapper>
      <ButtonsWrapper>
        <Button type={'Train AI'} />
        <Button type={'AI Play'} callback={startAI} />
      </ButtonsWrapper>
    </StyledTetrisWrapper>
  )
}
export default Tetris
