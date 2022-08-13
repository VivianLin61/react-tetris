import React from 'react'
import { StyledDisplayData } from './styles/StyledDisplay'
const Display = ({ data }) => {
  return (
    <StyledDisplayData>
      <div>Lines: {data.rows}</div>
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

export default Display
