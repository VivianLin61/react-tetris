import styled from "styled-components";

export const StyledStage = styled.div`
  opacity: ${(props) => (props.paused || props.gameOver ? "0.6" : "1")};
  padding: 0px 10px 15px 15px;
  margin: 20px;
  border-radius: 20px;
  display: grid;
  grid-template-rows: repeat(
    ${(props) => props.height},
    calc(
      ${(props) => (props.type === "main" ? "240px" : "96px")} /
        ${(props) => props.width}
    )
  );
  grid-template-columns: repeat(${(props) => props.width}, 1fr);
  grid-gap: 1px;
  width: ${(props) => (props.type === "main" ? "240px" : "96px")};
  background: ${(props) => props.theme.backgroundColor};
  position: relative;
  overflow: hidden; /* Ensure that the pseudo-element doesn't overflow */

  /* Adjusted Neumorphic inner and outer shadow with a less strong white shadow */
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

export const StyledMessage = styled.div`
  color: white;
  position: absolute;
  top: 330px;
  padding: 14px 20px;
  border-radius: 10px;
  background: ${(props) => props.theme.textColor};
`;
