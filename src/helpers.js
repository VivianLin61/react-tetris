export const STAGE_WIDTH = 10
export const STAGE_HEIGHT = 20
export const LEFT = 37
export const RIGHT = 39
export const DOWN = 40
export const UP = 38
export const createStage = (height, width) =>
  Array.from(Array(height ? height : STAGE_HEIGHT), () =>
    new Array(width ? width : STAGE_WIDTH).fill([0, 'clear'])
  )

export const checkCollision = (
  player,
  stage,
  { x: moveX, y: moveY },
  ghost
) => {
  // Using for loops to be able to return (and break). Not possible with forEach
  let currentX = player.pos.x
  let currentY = ghost ? ghost : player.pos.y

  for (let y = 0; y < player.tetromino.length; y += 1) {
    for (let x = 0; x < player.tetromino[y].length; x += 1) {
      // 1. Check that we're on an actual Tetromino cell
      if (player.tetromino[y][x] === 0) continue
      let nextX = currentX + x + moveX
      let nextY = currentY + y + moveY
      if (nextX < 0 || nextX >= STAGE_WIDTH || nextY >= STAGE_HEIGHT) {
        return true
      }
      if (nextY < 0) continue
      if (
        stage !== undefined &&
        stage[nextY][nextX][1] !== 'clear' &&
        stage[nextY][nextX][1] !== 'ghost'
      )
        return true
    }
  }
  // 5. If everything above is false
  return false
}

export const calculateDropPosition = (newStage, currPlayer) => {
  let ghostY = currPlayer.pos.y
  while (
    !checkCollision(currPlayer, newStage, { x: 0, y: 1 }, ghostY) &&
    ghostY < STAGE_HEIGHT
  ) {
    ghostY += 1
  }
  return ghostY
}

export const copyMatrix = (matrix) => {
  let newArray = []
  for (var i = 0; i < matrix.length; i++) {
    newArray[i] = matrix[i].slice()
  }
  return newArray
}

export const getRandomInt = (min, max) => {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export const rotate = (matrix, dir) => {
  // Make the rows to become cols (transpose)
  const rotatedTetro = matrix.map((_, index) => matrix.map((col) => col[index]))
  // Reverse each row to get a rotated matrix
  if (dir > 0) return rotatedTetro.map((row) => row.reverse())
  return rotatedTetro.reverse()
}
