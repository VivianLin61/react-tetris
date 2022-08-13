import styled from 'styled-components'

export const StyledDisplay = styled.div`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  margin: 20px 0px 20px 20px;
  padding: 16px;
  min-height: 30px;
  width: 240px;
  border-radius: 10px;
  color: ${(props) => (props.gameOver ? 'red' : 'white')};
  background: ${(props) => props.theme.primaryColor};
  font-size: 0.8rem;
`
export const StyledDisplayData = styled.div`
  box-sizing: border-box;
  justify-content: flex-start;
  margin: 20px 20px 20px 20px;
  padding: 16px;
  min-height: 30px;
  border-radius: 10px;
  color: ${(props) => (props.gameOver ? 'red' : 'white')};
  background: ${(props) => props.theme.primaryColor};
  font-size: 0.8rem;
  h2 {
    margin: 5px 0px 5px 0px;
  }
  div {
    padding-bottom: 2px;
  }
`
