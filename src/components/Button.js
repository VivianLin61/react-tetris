import React from 'react'
import styled from 'styled-components'

export const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: center;
`
const StyledButton = styled.button`
  box-sizing: border-box;
  margin: 0 10px 20px 10px;
  padding: 16px;
  min-height: 30px;
  width: ${(props) => (props.size === 'large' ? '300px' : '150px')};
  border-radius: 10px;
  border: none;
  color: white;
  font-size: 1.2rem;
  background: ${(props) => props.theme.primaryColor};
  outline: none;
  cursor: pointer;
  color: ${(props) => props.theme.textColor};
  font-family: 'Montserrat', sans-serif;
`

const Button = ({ callback, type, size }) => (
  <StyledButton size={size} onClick={callback}>
    {type}
  </StyledButton>
)

export default Button
