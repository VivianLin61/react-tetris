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
