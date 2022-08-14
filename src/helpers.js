export const STAGE_WIDTH = 10
export const STAGE_HEIGHT = 21
export const LEFT = 37
export const RIGHT = 39
export const DOWN = 40
export const UP = 38
export const POPSIZE = 50
export const GAME_DROP_TIME = 500
export const AI_DROP_TIME = 25
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
  // If everything above is false
  return false
}

export const calculateDropPosition = (newStage, currPlayer) => {
  let ghostY = currPlayer.pos.y
  while (
    !checkCollision(currPlayer, newStage, { x: 0, y: 1 }, ghostY) &&
    ghostY < STAGE_HEIGHT
  )
    ghostY += 1
  return ghostY
}

export const copyMatrix = (matrix) => {
  let newArray = []
  for (var i = 0; i < matrix.length; i++) {
    newArray[i] = matrix[i].slice()
  }
  return newArray
}

export const rotate = (matrix, dir) => {
  // Make the rows to become cols (transpose)
  const rotatedTetro = matrix.map((_, index) => matrix.map((col) => col[index]))
  // Reverse each row to get a rotated matrix
  if (dir > 0) return rotatedTetro.map((row) => row.reverse())
  return rotatedTetro.reverse()
}

//Genetic Algorithm Helpers

export const createGames = () => {
  let games = []
  for (var i = 0; i < POPSIZE; i++) {
    let newGame = createGame()
    games[i] = newGame
  }
  return games
}

export const pickOne = (list) => {
  var index = 0
  var r = Math.random() // between 0 and 1

  while (r > 0) {
    if (index === list.length) {
      return list[Math.floor(Math.random() * list.length)]
    }
    r = r - list[index].prob
    index++
  }
  index--

  return list[index]
}

let mutation_rate = 0.05
let mutation_multiplier = 0.4
let alpha_multiplier = 0.7
let beta_multiplier = 0.3
//DNA Functions
export const crossover = (partner, pA, pB) => {
  //  child will have most of the genes from the parent with the better fitness.
  //if A has a larger fitness it's genes will be close to A.
  let alpha = pA.dna
  let beta = partner //dna
  if (pA.fitness < pB.fitness) {
    alpha = partner
    beta = pA.dna
  }
  var newgenes = {
    a: alpha.a * alpha_multiplier + beta.a * beta_multiplier,
    b: alpha.b * alpha_multiplier + beta.b * beta_multiplier,
    c: alpha.c * alpha_multiplier + beta.c * beta_multiplier,
    d: alpha.d * alpha_multiplier + beta.d * beta_multiplier,
    e: alpha.e * alpha_multiplier + beta.e * beta_multiplier,
  }
  return newgenes
}

export const mutation = (child) => {
  if (Math.random() < mutation_rate) {
    child.a = child.a + Math.random() * mutation_multiplier
  }
  if (Math.random() < mutation_rate) {
    child.b = child.b + Math.random() * mutation_multiplier
  }
  if (Math.random() < mutation_rate) {
    child.c = child.c + Math.random() * mutation_multiplier
  }
  if (Math.random() < mutation_rate) {
    child.d = child.d + Math.random() * mutation_multiplier
  }
  if (Math.random() < mutation_rate) {
    child.e = child.e + Math.random() * mutation_multiplier
  }
  return child
}
export const createGame = (dna) => {
  let newGame = {
    lines: 0,
    fitness: 0,
    dna: dna
      ? dna
      : {
          a: Math.random() - 0.5,
          b: Math.random() - 0.5,
          c: Math.random() - 0.5,
          d: Math.random() - 0.5,
          e: Math.random() - 0.5,
        },
    prob: 0,
  }

  return newGame
}
