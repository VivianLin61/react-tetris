import styled from "styled-components";

export const StyledDisplay = styled.div`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  margin: 10px 0px 20px 20px;
  padding: 16px;
  min-height: 30px;
  border-radius: 10px;
  width: 260px;
  color: ${(props) => props.theme.textColor};
  background: ${(props) => props.theme.primaryColor};
  font-size: 18px;
`;

export const StyledDisplayData = styled.div`
  margin: 0px 0px 0px 10px;
  padding: 16px;
  min-height: 30px;
  border-radius: 10px;
  color: ${(props) => props.theme.textColor};
  font-size: ${(props) => props.fontSize};

  h2 {
    margin: 5px 0px 5px 0px;
  }
  div {
    padding-bottom: 2px;
    display: ${(props) => (props.controls ? "flex" : "block")};
    align-items: center;
    svg,
    span {
      margin-left: 10px;
    }
  }
`;
