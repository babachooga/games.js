import readline from 'node:readline'
import { randomNumber, randomChars, checkIfPlayerInTheArea, fieldGenerator } from '../index.js'
import chalk from 'chalk'

readline.emitKeypressEvents(process.stdin)
if (process.stdin.isTTY) {
  process.stdin.setRawMode(true)
}

// size of the game field, where are: height = quantity of rows in the array, width: length of rows
let width = 9
let height = 9

const snake = [
  { x: 1, y: 1 },
  { x: 2, y: 1 },
  { x: 3, y: 1 },
]

const collectables = {
  apple: generateThing(snake),
  resize: generateThing(snake),
}

// Snake next move direction, using it in the makeAStep funtion.
let direction = { x: 1, y: 0 }

// Generates snake on the field, returns field with snake on it
function generateSnakeOnField(field, snake) {
  for (const { x, y } of snake) {
    field[y][x] = chalk.green(randomChars())
  }
  return field
}

const makeAStep = () => {
  console.clear()

  playerLengthProgress(snake)

  const step = {
    x: snake.at(-1).x + direction.x,
    y: snake.at(-1).y + direction.y,
  }

  const [field] = fieldGenerator(width, height, '.')

  showCollecteables(field, collectables)
  checkIfPlayerInTheArea(field, step)
  havePlayerBitedHimself(snake, step)
  playerEating(step, collectables)

  snake.push(step)
  snake.shift()

  const resultedField = generateSnakeOnField(field, snake)

  console.log(resultedField.map(array => array.join(' ')).join('\n'))
}

// snake controle buttons ←↑↓→
process.stdin.on('keypress', (_, key) => {
  if (key.ctrl && key.name === 'c') process.exit()

  switch (key.name) {
    case 'up':
      direction = { x: 0, y: -1 }
      break
    case 'down':
      direction = { x: 0, y: 1 }
      break
    case 'left':
      direction = { x: -1, y: 0 }
      break
    case 'right':
      direction = { x: 1, y: 0 }
      break
  }
})

// Checking if player next step was made over snakes body
function havePlayerBitedHimself(snake, newStep) {
  for (const { x, y } of snake) {
    if (x === newStep.x && y === newStep.y) {
      console.log(
        'You just bited yourself! I guess apples aren\'t that good ?',
      )
      process.exit()
    }
  }
}

function generateThing(snake) {
  let isCollsion = true
  let thing
  while (isCollsion) {
    thing = {
      x: randomNumber(width),
      y: randomNumber(height),
    }
    isCollsion = snake.some(
      snakePart => snakePart.x === thing.x && snakePart.y === thing.y,
    )
  }
  return thing
}

function showCollecteables(field, collectables) {
  const things = {
    apple: chalk.red('@'),
    resize: chalk.blue('⇆'),
  }
  const entries = Object.entries(collectables)
  for (const [name, coordinates] of entries) {
    field[coordinates.y][coordinates.x] = things[name]
  }
  return field
}

function playerEating(step, collectables) {
  const entries = Object.entries(collectables)
  for (const [name, coords] of entries) {
    if (step.x === coords.x && step.y === coords.y) {
      switch (name) {
        case 'apple':
          snake.push(step)
          collectables.apple = generateThing(snake)
          break
        case 'resize':
          width += 1
          height += 1
          collectables.resize = generateThing(snake)
          break
        default:
          break
      }
    }
  }
}

function playerLengthProgress(snake) {
  const targetScore = 50
  const snakeLength = snake.length - 3
  if (snakeLength % 10 === 0) {
    console.log(`${targetScore - snakeLength} Apples left! Keep going!`)
  }
  else if (snakeLength === targetScore) {
    console.log(`You ate all ${targetScore} apples. Congratulation!`)
  }
  else {
    console.log(`You ate: ${snakeLength} apples.`)
  }
}

setInterval(makeAStep, 350)

export default () => {
  return makeAStep()
}
