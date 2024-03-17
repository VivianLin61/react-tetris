import styled from "styled-components";

export const StyledScore = styled.div`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  margin: 10px 0px 20px 20px;
  padding: 16px;
  min-height: 30px;
  border-radius: 10px;
  width: 260px;
  color: ${(props) => props.theme.textColor};
  background: white;
  font-size: 18px;
  box-shadow:
    /* Outer Shadow */ ${(props) =>
      props.type === "main"
        ? "8px 8px 16px rgba(209, 205, 199, 0.5), -8px -8px 16px rgba(255, 255, 255, 0.5)" /* Reduced opacity of white shadow */
        : "8px 8px 16px rgba(209, 205, 199, 0.5), -8px -8px 16px rgba(255, 255, 255, 0.5)"}
    /* Inner Shadow */
    ${(props) =>
      props.type === "main"
        ? ", inset 4px 4px 8px rgba(203, 203, 203, 0.5), inset -4px -4px 8px rgba(255, 255, 255, 0.5)" /* Reduced opacity of white shadow */
        : ", inset 4px 4px 8px rgba(203, 203, 203, 0.5), inset -4px -4px 8px rgba(255, 255, 255, 0.5)"};
`;
