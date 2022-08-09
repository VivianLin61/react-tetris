import styled from 'styled-components'

export const StyledCell = styled.div`
  width: auto;
  border-radius: 6px;
  background: rgba(${(props) => (props.ghost ? '53,61,64' : props.color)}, 0.8);
  margin: 2px;
  border: ${(props) => (props.ghost ? '2px solid' : '')};
  border-color: rgba(${(props) => props.color}, 0.8);
`
