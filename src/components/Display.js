import React from "react";
import { StyledDisplay, StyledDisplayData } from "./styles/StyledDisplay";
import {
  AiOutlineArrowDown,
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
  AiOutlineArrowUp,
} from "react-icons/ai";
export const Display = ({ gameOver, text }) => {
  return <StyledDisplay gameOver={gameOver}>{text}</StyledDisplay>;
};

export const DisplayData = ({ data }) => {
  // Helper function to round the weights to 10 decimal places
  const roundToTenDecimals = (num) => {
    return Number.parseFloat(num).toFixed(16);
  };

  return (
    <StyledDisplayData fontSize="16px">
      <h2>Statistics</h2>
      <div>Lines: {data.rows}</div>
      <div>Game Score: {data.gameScore}</div>
      <div>Moves: {data.moves}</div>
      {data.gameNum && (
        <>
          <div>Game Number: {data.gameNum}</div>
          <div>Generation: {data.generation}</div>
          <div>Max Fitness: {roundToTenDecimals(data.maxFitness)}</div>
          <div>Max Lines: {data.maxLines}</div>
        </>
      )}
      {data.bestWeights && (
        <div>
          Best Weights:
          <div>a: {roundToTenDecimals(data.bestWeights.a)}</div>
          <div>b: {roundToTenDecimals(data.bestWeights.b)}</div>
          <div>c: {roundToTenDecimals(data.bestWeights.c)}</div>
          <div>d: {roundToTenDecimals(data.bestWeights.d)}</div>
          <div>e: {roundToTenDecimals(data.bestWeights.e)}</div>
        </div>
      )}
      <div>
        Current Weights:
        <div>a: {roundToTenDecimals(data.weights.a)}</div>
        <div>b: {roundToTenDecimals(data.weights.b)}</div>
        <div>c: {roundToTenDecimals(data.weights.c)}</div>
        <div>d: {roundToTenDecimals(data.weights.d)}</div>
        <div>e: {roundToTenDecimals(data.weights.e)}</div>
      </div>
    </StyledDisplayData>
  );
};

export const DisplayControls = () => {
  return (
    <StyledDisplayData fontSize="16px" controls={true}>
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
  );
};
