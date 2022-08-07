import styled from 'styled-components'

export const StyledTetrisWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background-size: cover;
  background: ${(props) => props.theme.backgroundColor};
  overflow: hidden;
`

export const StyledTetris = styled.div`
  display: flex;
  justify-content: center;
  padding: 40px;
  margin: 0 auto;
  max-width: 900px;
`

export const StyledText = styled.div`
  margin-left: 40px;
  font-size: 20px;
  color: white;
`

export const StyledTitle = styled.h1`
  text-align: center;
  color: ${(props) => props.theme.textColor};
  margin-bottom: 0px;
`
