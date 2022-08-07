export const STAGE_WIDTH = 10
export const STAGE_HEIGHT = 20

export const createStage = (height, width) =>
  Array.from(Array(height), () =>
    new Array(width).fill([0, 'clear'])
  )

