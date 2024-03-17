import styled from "styled-components";

export const StyledTetrisWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  padding-top: 40px;
  background-size: cover;
  background: ${(props) => props.theme.backgroundColor};
  overflow: hidden;
`;

export const StyledTetris = styled.div`
  display: flex;
  justify-content: center;
  padding: 12px 40px;
  margin: 0 auto;
  max-width: 900px;
`;

export const StyledText = styled.div`
  margin-left: 20px;
  margin-bottom: 20px;
  font-size: 1.2em;
  color: ${(props) => props.theme.textColor};
`;

export const StyledTitle = styled.h1`
  text-align: center;
  color: ${(props) => props.theme.textColor};
  margin-top: 16px;
  margin-bottom: 0px;
`;

export const SideWrapper = styled.div`
  width: 300px;
`;
