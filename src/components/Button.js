import React from 'react'
import styled from 'styled-components'

export const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: ${(props) => props.position};
`
export const IconButton = styled.div`
  display: flex;
  align-items: center;
  margin: 0 0px 16px 20px;
  padding: 10px;
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
const StyledButton = styled.button`
  box-sizing: border-box;
  margin: 0 10px 16px 10px;
  padding: 14px;
  min-height: 30px;
  width: ${(props) => (props.size === 'large' ? '240px' : '110px')};
  border-radius: 10px;
  border: none;
  color: white;
  font-size: 1rem;
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
