import styled from 'styled-components'

export const StyledCell = styled.div`
  width: auto;
  border-radius: 6px;
  background: rgba(${(props) => props.color}, 0.8);
  border: ${(props) => `${props.theme.backgroundColor} 2px solid`};
`
