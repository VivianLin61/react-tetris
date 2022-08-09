import React from 'react'
import Tetris from './components/Tetris'
import { ThemeProvider } from 'styled-components'

const theme = {
  primaryColor: '#172E4D',
  textColor: '#F5E399',
}
function App() {
  return (
    <ThemeProvider theme={theme}>
      <Tetris />
    </ThemeProvider>
  )
}

export default App
