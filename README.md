# React Tetris AI

A implementation of the popular tile-matching puzzle game Tetris with a AI bot that uses the genetic algorithm to improve over time . You can access it here: <https://react-tetris-ai.vercel.app/>

### Demo

https://user-images.githubusercontent.com/33815743/184776918-2d60a382-f663-49d6-9857-4f0723918af8.mov

### Tetris

Tetris is a tile- matching puzzle game. The tiles that you match are called Tetrominoes. There are a total of 7 different shapes. The shapes are randomly chosen and fall down a grid. The goal of the game is the manipulate the tetromino by rotating or translating it on the grid into a position where they form a horizontal line with no gaps. Once this happens the line clears and all the blocks above it shift down.

### Decision Function

The AI determines the best possible move by simulating all possible moves given a tetromino and selects the move with the highest score. The score is determined by a linear combination of the features functions and their respective weights.

```
let score = features.height * weights.a +
            features.holes * weights.b +
            features.linesCleared * weights.c +
            features.bumpiness * weights.d +
            features.vacant * weights.e
```
  
### Feature Functions

The AI uses following heuristics to determine the best position to place the next piece.

- **Height**- The AI would want to minimize the height because this means you can place more pieces.
- **Holes**- The AI would also want to minimize the number of holes because a hole makes the line harder to clear.
- **Cleared**- The AI wants to maximize the number of cleared lines.
- **Bumpiness**- The AI wants to minimize bumpiness because a flatter board makes it easier to clear lines.
- **Vacant**- The AI wants to minimize the number of vacant spots under where your piece is placed because it makes it harder to clear the tiles below where your piece is placed.

Since we want to minimize the height, holes, bumpiness and vacant we can expect the corresponding weights to these features to be negative.
  
### Genetic Algorithm

The goal of the AI is to clear as the many lines as possible or survive the longest. To do this the AI uses genetic algorithm to learn how to obtain the highest score by improving the weights of the score function. The genetic algorithm is a search heuristic inspired by Darwin's theory of natural selection.

1. Create a random initial population.
2. Fitness - Compute the fitness of each individual in the population.
3. Selection- Select the fittest individuals to create offspring.
4. Crossover- Produce offspring then replace unfit individuals from the current population with the newly generated population of offspring.
5. Mutation- Some of the new offspring are subject to a random mutation to maintain diversity within the population.
6. Return to step 2 until population has converged

### Results

After running the genetic algorithm it produced the following set of optimal weights

```
let weights = {
    a: -0.06439675044866619,
    b: -0.2301469027281215,
    c: 0.20044015404082952,
    d: -0.1549333036691808,
    e: -0.2602333697359142
}
```

Using these weights with the combination of the feature functions the AI can compute the score of all possible moves and select the move with the highest possible score.

## Useful Links

#### Genetic Algorithm

- Towards Data Science - <https://towardsdatascience.com/introduction-to-genetic-algorithms-including-example-code-e396e98d8bf3>
- Coding Train - <https://github.com/CodingTrain/website/tree/main/CodingChallenges/CC_029_SmartRockets>
- Code My Road - <https://codemyroad.wordpress.com/2013/04/14/tetris-ai-the-near-perfect-player/>

#### Tetris

- weibenfalk - <https://github.com/weibenfalk/react-tetris-starter-files>
