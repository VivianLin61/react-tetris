import styled from 'styled-components'

export const StyledStage = styled.div`
  opacity: ${(props) => (props.paused || props.gameOver ? '0.6' : '1')};
  padding: 0px 20px 20px 20px;
  border-radius: 20px;
  display: grid;
  grid-template-rows: repeat(
    ${(props) => props.height},
    calc(
      ${(props) => (props.type === 'main' ? '240px' : '96px')} /
        ${(props) => props.width}
    )
  );
  grid-template-columns: repeat(${(props) => props.width}, 1fr);
  grid-gap: 1px;
  width: ${(props) => (props.type === 'main' ? '240px' : '96px')};
  background: ${(props) => props.theme.backgroundColor};
`

export const StyledMessage = styled.div`
  color: ${(props) => (props.gameOver ? '#CF5561' : props.theme.textColor)};
  position: absolute;
  top: 330px;
  padding: 14px 20px;
  border-radius: 10px;
  background: ${(props) => props.theme.primaryColor};
`
