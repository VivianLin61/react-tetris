import React from "react";
import styled from "styled-components";

export const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: ${(props) => props.position};
`;
export const IconButton = styled.button`
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
  font-family: "Montserrat", sans-serif;
  box-shadow:
    /* Outer Shadow */ ${(props) =>
    props.type === "main"
      ? "8px 8px 16px rgba(209, 205, 199, 0.5), -8px -8px 16px rgba(255, 255, 255, 0.5)" /* Reduced opacity of white shadow */
      : "8px 8px 16px rgba(209, 205, 199, 0.5), -8px -8px 16px rgba(255, 255, 255, 0.5)"};
  /* Inner Shadow */
  ${(props) =>
    props.type === "main"
      ? ", inset 4px 4px 8px rgba(203, 203, 203, 0.5), inset -4px -4px 8px rgba(255, 255, 255, 0.5)" /* Reduced opacity of white shadow */
      : ", inset 4px 4px 8px rgba(203, 203, 203, 0.5), inset -4px -4px 8px rgba(255, 255, 255, 0.5)"};
`;
const StyledButton = styled.button`
  box-sizing: border-box;
  margin: 0 10px 16px 10px;
  padding: 14px;
  min-height: 30px;
  width: ${(props) => (props.size === "large" ? "240px" : "110px")};
  border-radius: 10px;
  border: none;
  color: white;
  font-size: 1rem;
  background: ${(props) => props.theme.primaryColor};
  outline: none;
  cursor: pointer;
  color: ${(props) => props.theme.textColor};
  font-family: "Montserrat", sans-serif;
  &:hover {
    background: ${(props) => props.theme.textColor};
    color: ${(props) => props.theme.primaryColor};
  }

  box-shadow:
    /* Outer Shadow */ ${(props) =>
    props.type === "main"
      ? "8px 8px 16px rgba(209, 205, 199, 0.5), -8px -8px 16px rgba(255, 255, 255, 0.5)" /* Reduced opacity of white shadow */
      : "8px 8px 16px rgba(209, 205, 199, 0.5), -8px -8px 16px rgba(255, 255, 255, 0.5)"};
  /* Inner Shadow */
  ${(props) =>
    props.type === "main"
      ? ", inset 4px 4px 8px rgba(203, 203, 203, 0.5), inset -4px -4px 8px rgba(255, 255, 255, 0.5)" /* Reduced opacity of white shadow */
      : ", inset 4px 4px 8px rgba(203, 203, 203, 0.5), inset -4px -4px 8px rgba(255, 255, 255, 0.5)"};
`;

const Button = ({ callback, type, size }) => (
  <StyledButton size={size} onClick={callback}>
    {type}
  </StyledButton>
);

export default Button;
