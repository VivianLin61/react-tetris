import React from 'react'
import { createStage, STAGE_WIDTH, STAGE_HEIGHT } from '../helpers'
import Stage from './Stage'
import Display from './Display'
import Button from './Button'
import { ButtonsWrapper } from './Button'
import {
  StyledTetrisWrapper,
  StyledTetris,
  StyledText,
  StyledTitle,
} from './styles/StyledTetris'

const Tetris = () => {
  return (
    <StyledTetrisWrapper>
      <StyledTitle>TETRIS AI</StyledTitle>
      <StyledTetris>
        <div>
          <StyledText>HOLD</StyledText>
          <Stage stage={createStage(4, 4)} />
        </div>
        <Stage stage={createStage(STAGE_HEIGHT, STAGE_WIDTH)} type={'main'} />
        <div>
          <StyledText>NEXT</StyledText>
          <Stage stage={createStage(4, 4)} />
          <Display text='Lines' />
        </div>
      </StyledTetris>
      <ButtonsWrapper>
        <Button type={'Play'} size={'large'} />
      </ButtonsWrapper>
      <ButtonsWrapper>
        <Button type={'Train AI'} />
        <Button type={'AI Play'} />
      </ButtonsWrapper>
    </StyledTetrisWrapper>
  )
}
export default Tetris
