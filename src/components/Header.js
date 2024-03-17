import React from "react";
import styled from "styled-components";

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 120px;
  justify-content: center;
  padding: 20px;
  margin: auto;
`;

const Title = styled.h1`
  font-size: 60px;
  color: #776e65;
  margin: 0;
`;

const ScoreContainer = styled.div`
  display: flex;
  gap: 10px;
`;

const ScoreBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 10px;
  background-color: #bbada0;
  border-radius: 5px;
  color: #ffffff;
  min-width: 70px;
  font-size: 18px;
`;

const NewGameButton = styled.div`
  display: flex;
  flex-direction: column;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  padding: 10px;
  background-color: #8f7a66;
  border-radius: 5px;
  color: #ffffff;
  min-width: 70px;
  font-size: 18px;
  :hover {
    background-color: #9f8b77;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 20px;
`;
const Header = ({ score, callback }) => (
  <div className="container">
    <HeaderContainer>
      <Title>TETRIS AI</Title>
      <ButtonGroup>
        <ScoreContainer>
          <ScoreBox>
            <span>SCORE</span>
            <strong>{score}</strong>
          </ScoreBox>
        </ScoreContainer>
        <NewGameButton>
          <span onClick={callback}>PLAY</span>
        </NewGameButton>
      </ButtonGroup>
    </HeaderContainer>
  </div>
);

export default Header;
