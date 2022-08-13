import React from 'react'
import { StyledDisplay, StyledDisplayData } from './styles/StyledDisplay'
export const Display = ({ gameOver, text }) => {
  return <StyledDisplay gameOver={gameOver}>{text}</StyledDisplay>
}

export const DisplayData = ({ data }) => {
  return (
    <StyledDisplayData>
      <h2>Statistics</h2>
      <div>
        Lines: <span>{data.rows}</span>
      </div>
      <div>Game Score: {data.gameScore}</div>
      <div>Game Number: {data.gameNum}</div>
      <div>Generation: {data.generation}</div>
      <div>Max Fitness: {data.maxFitness}</div>
      <div>Max Lines: {data.maxLines}</div>
      <div>Moves: {data.moves}</div>
      <div>
        Best Weights:
        <div>a: {data.bestWeights.a}</div>
        <div>b: {data.bestWeights.b}</div>
        <div>c: {data.bestWeights.c}</div>
        <div>d: {data.bestWeights.d}</div>
        <div>e: {data.bestWeights.e}</div>
      </div>
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

