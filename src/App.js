import React from "react";
import Tetris from "./components/Tetris";
import { ThemeProvider } from "styled-components";

const theme = {
  primaryColor: "white",
  textColor: "#776e65;",
  backgroundColor: "#eeeae9",
  //   primaryColor:"#172E4D",
  //   textColor: "#F5E399",
  //   backgroundColor: "#11181f",
};
function App() {
  return (
    <ThemeProvider theme={theme}>
      <Tetris />
    </ThemeProvider>
  );
}

export default App;
