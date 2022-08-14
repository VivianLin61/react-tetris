import React from 'react'
import { StyledDisplay, StyledDisplayData } from './styles/StyledDisplay'
import {
  AiOutlineArrowDown,
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
  AiOutlineArrowUp,
} from 'react-icons/ai'
export const Display = ({ gameOver, text }) => {
  return <StyledDisplay gameOver={gameOver}>{text}</StyledDisplay>
}

export const DisplayData = ({ data }) => {
  return (
    <StyledDisplayData fontSize='16px'>
      <h2>Statistics</h2>
      <div>Lines: {data.rows}</div>
      <div>Game Score: {data.gameScore}</div>
      <div>Moves: {data.moves}</div>
      {data.gameNum && (
        <>
          <div>Game Number: {data.gameNum}</div>
          <div>Generation: {data.generation}</div>
          <div>Max Fitness: {data.maxFitness}</div>
          <div>Max Lines: {data.maxLines}</div>
        </>
      )}
      {data.bestWeights && (
        <div>
          Best Weights:
          <div>a: {data.bestWeights.a}</div>
          <div>b: {data.bestWeights.b}</div>
          <div>c: {data.bestWeights.c}</div>
          <div>d: {data.bestWeights.d}</div>
          <div>e: {data.bestWeights.e}</div>
        </div>
      )}
      <div>
        Current Weights:
        <div>a: {data.weights.a}</div>
        <div>b: {data.weights.b}</div>
        <div>c: {data.weights.c}</div>
        <div>d: {data.weights.d}</div>
        <div>e: {data.weights.e}</div>
      </div>
    </StyledDisplayData>
  )
}

export const DisplayControls = () => {
  return (
    <StyledDisplayData fontSize='16px' controls={true}>
      <h2>Controls</h2>
      <div>
        move left: <AiOutlineArrowLeft />
      </div>
      <div>
        move right: <AiOutlineArrowRight />
      </div>
      <div>
        rotate right: <AiOutlineArrowUp />
      </div>
      <div>
        rotate left: <span>z</span>
      </div>
      <div>
        hold: <span>c</span>
      </div>
      <div>
        soft drop: <AiOutlineArrowDown />
      </div>
      <div>
        hard drop: <span>space</span>
      </div>
    </StyledDisplayData>
  )
}
