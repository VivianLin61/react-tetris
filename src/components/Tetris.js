import React, { useState, useEffect } from 'react'
import {
  checkCollision,
  createStage,
  LEFT,
  RIGHT,
  DOWN,
  UP,
  POPSIZE,
  pickOne,
  createGames,
  GAME_DROP_TIME,
  AI_DROP_TIME,
  crossover,
  mutation,
  createGame,
} from '../helpers'
//Custom Hooks
import { useInterval } from '../hooks/useInterval'
import { usePlayer } from '../hooks/usePlayer'
import { useStage } from '../hooks/useStage'

import Stage from './Stage'
import { Display, DisplayData } from './Display'
import Button from './Button'
import { VscDebugRestart, VscDebugPause } from 'react-icons/vsc'
//Styled Components
import { ButtonsWrapper, IconButton } from './Button'
import {
  StyledTetrisWrapper,
  StyledTetris,
  StyledText,
  StyledTitle,
  SideWrapper,
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
  ] = usePlayer(weights, setGameOver)

  const [gameScore, setGameScore] = useState(0)
  const [stage, setStage, rowsCleared, dropPosition] = useStage(
    player,
    resetPlayer,
    ai,
    setGameScore
  )

  const [nextStage, setNextStage] = useState(createStage(4, 4))
  const [holdStage, setHoldStage] = useState(createStage(4, 4))
  const [spacePressed, setSpacePressed] = useState(false)
  const [paused, setPaused] = useState(false)
  const [aiTrain, setAITrain] = useState(false)
  const [moves, setMoves] = useState(0)
  const [gameNum, setGameNum] = useState(1)
  const [maxLines, setMaxLines] = useState(0)
  const [maxFitness, setMaxFitness] = useState(0)
  const [generation, setGeneration] = useState(1)
  const [bestWeights, setBestWeights] = useState({
    a: 0,
    b: 0,
    c: 0,
    d: 0,
    e: 0,
  })
  const [games, setGames] = useState(createGames())

  const genetic_algorithm = () => {
    if (games !== undefined) {
      const newPopulation = games.map((obj, idx) => {
        if (idx === gameNum - 1) {
          return { ...obj, lines: rows, fitness: gameScore }
        }
        return obj
      })
      setGames(newPopulation)
      if (gameOver === true) {
        setMoves(0)
        setGameNum((prev) => prev + +1)
        startGame(games[gameNum])
      }

      if (gameNum === POPSIZE) {
        //Sort games by fitness
        let gamesCopy = newPopulation.map((a) => {
          return { ...a }
        })
        gamesCopy.sort(function (a, b) {
          return b.fitness - a.fitness
        })
        evaluate(gamesCopy)
        let population = selection(gamesCopy)
        setGames(population)
        setGameNum(1)
        setGeneration((prev) => prev + 1)
        startGame(population[0])
      }
    }
  }
  const selection = function (population) {
    var newGames = []
    for (var i = 0; i < population.length / 2; i++) {
      var parentA = pickOne(population)
      var parentB = pickOne(population)
      // Creates child by using crossover function
      var child = crossover(parentB.dna, parentA, parentB)
      child = mutation(child)
      newGames[i] = createGame(child)
    }
    let gamesCopy = population.map((a) => {
      return { ...a }
    })
    gamesCopy.splice(gamesCopy.length / 2) //Remove weaker half of population
    gamesCopy = gamesCopy.concat(newGames)
    return gamesCopy
  }

  const evaluate = function (population) {
    setMaxFitness(population[0].fitness)
    setMaxLines(population[0].lines)
    setBestWeights(Object.assign({}, population[0].dna))

    let sum_of_scores = 0
    for (let i = 0; i < POPSIZE; i++) {
      sum_of_scores += population[i].fitness
    }

    for (let i = 0; i < POPSIZE; i++) {
      population[i].prob = population[i].fitness / sum_of_scores
    }
  }
  useEffect(() => {
    if (aiTrain) {
      genetic_algorithm()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameOver])

  const trainAI = () => {
    startGame(games[0])
    genetic_algorithm()
    setAITrain(true)
  }

  const setUpGame = () => {
    setStage(createStage())
    setNextStage(createStage(4, 4))
    setGameOver(false)
    setGameScore(0)
    setRows(0)
  }
  const startGame = (game) => {
    if (game === undefined || game.type === 'click') {
      setUpGame()
      setDropTime(GAME_DROP_TIME)
      setAI(false)
      resetPlayer()
    } else {
      setUpGame()
      setAI(true)
      setWeights(Object.assign({}, game.dna))
      setDropTime(AI_DROP_TIME)
      resetPlayer(stage, true)
    }
  }
  const startAI = () => {
    setUpGame()
    setDropTime(AI_DROP_TIME)
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
          if (newStage !== undefined) {
            newStage[y][x] = [value]
          }
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
      let game_score = 0
      switch (rowsCleared) {
        case 1:
          game_score += 1
          break
        case 2:
          game_score += 3
          break
        case 3:
          game_score += 6
          break
        case 4:
          game_score += 12
          break
        default:
          game_score = 0
      }

      setGameScore((prev) => prev + game_score)
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
      } else {
        setMoves((prev) => prev + 1)
        updatePlayerPos({ x: 0, y: 0, collided: true })
      }
    }
  }

  const keyUp = ({ keyCode }) => {
    if (!gameOver) {
      if (keyCode === DOWN) {
        // When user releases DOWN key turn on interval
        setDropTime(GAME_DROP_TIME)
      }
      if (keyCode === 32) {
        setSpacePressed(false)
      }
    }
  }

  const pausePlayer = () => {
    setPaused((prev) => !prev)
    //toggle
  }
  useEffect(() => {
    if (paused) {
      setDropTime(null)
    } else {
      let dropTime = ai ? AI_DROP_TIME : GAME_DROP_TIME
      setDropTime(dropTime)
    }
  }, [ai, paused])
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
        <SideWrapper>
          {!ai ? (
            <>
              <div style={{ float: 'right' }}>
                <StyledText>HOLD</StyledText>
                <Stage stage={holdStage} />
              </div>
            </>
          ) : (
            <>
              <DisplayData
                data={{
                  rows,
                  gameScore,
                  generation,
                  maxFitness,
                  maxLines,
                  gameNum,
                  moves,
                  POPSIZE,
                  bestWeights,
                  weights,
                }}
              ></DisplayData>
            </>
          )}
        </SideWrapper>
        <Stage stage={stage} type={'main'} />
        <SideWrapper>
          <StyledText>NEXT</StyledText>
          <Stage stage={nextStage} />
          {!ai && (
            <>
              <ButtonsWrapper position='left'>
                <IconButton type={'Play'} callback={trainAI}>
                  <VscDebugRestart />
                </IconButton>
                <IconButton type={'AI Play'} callback={startAI}>
                  <VscDebugPause />
                </IconButton>
              </ButtonsWrapper>
            </>
          )}
          <>
            {gameOver && !ai ? (
              <Display gameOver={gameOver} text='Game Over' />
            ) : (
              <div>{!ai ? <Display text={`Lines: ${rows}`} /> : <></>}</div>
            )}
          </>
        </SideWrapper>
      </StyledTetris>
      <ButtonsWrapper position={'center'}>
        <Button type={'Play'} size={'large'} callback={startGame} />
      </ButtonsWrapper>
      <ButtonsWrapper position={'center'}>
        <Button type={'Train AI'} callback={trainAI} />
        <Button type={'AI Play'} callback={startAI} />
      </ButtonsWrapper>
    </StyledTetrisWrapper>
  )
}
export default Tetris
