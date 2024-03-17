// Import React and styled-components
import React from "react";
import styled from "styled-components";

// Define a styled component for the container
const StyledNextContainer = styled.div`
  width: 96px;
  height: 96px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0; // Adjust margin as needed
  padding: 0; // Adjust padding as needed
  /* Add additional styling such as background, border, etc. if needed */
`;

// Define a styled component for the SVG if needed
const StyledSvg = styled.img`
  width: auto; // Keeps the aspect ratio of the SVG
  height: auto; // Keeps the aspect ratio of the SVG
  max-width: 100%;
  max-height: 100%;
`;

// React.memo makes sure we only re-render the changed cells
const Next = () => {
  return (
    <StyledNextContainer>
      <StyledSvg src={"/blue.svg"} alt="Next" />
    </StyledNextContainer>
  );
};

export default React.memo(Next);
