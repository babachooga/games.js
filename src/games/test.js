import readline from 'node:readline'
import { randomNumber, chars } from '../index.js'
import chalk from 'chalk'

readline.emitKeypressEvents(process.stdin)
if (process.stdin.isTTY) {
  process.stdin.setRawMode(true)
}

// size of the game field, where are: height = quantity of rows in the array, width: length of rows
let width = 9
let height = 9

const randomChars = () => {
  const symbols = chars
  const randomChar = symbols[randomNumber(symbols.length)]
  return randomChar
}

const snake = [
  { x: 1, y: 1 },
  { x: 2, y: 1 },
  { x: 3, y: 1 },
]

let resizeArea = { x: randomNumber(width), y: randomNumber(height) }
let apple = { x: randomNumber(width), y: randomNumber(height) }

// Snake next move direction, using it in the makeAStep funtion.
let direction = { x: 1, y: 0 }

// Field generation, returns an array of array
function fieldGenerator(width, heigth, background) {
  const field = []
  for (let i = 0; i < heigth; i++) {
    field.push(Array(width).fill(background))
  }
  return [field, width, heigth]
}

// Generates snake on the field, returns field with snake on it
function generateSnakeOnField(field, snake) {
  for (const { x, y } of snake) {
    field[y][x] = chalk.green(randomChars())
  }
  return field
}

const makeAStep = () => {
  console.clear()

  const step = {
    x: snake.at(-1).x + direction.x,
    y: snake.at(-1).y + direction.y,
  }

  havePlayerBitedHimself(snake, step)

  if (step.x === apple.x && step.y === apple.y) {
    snake.push(step)
    apple = generateThing(snake)
  }
  else if (step.x === resizeArea.x && step.y === resizeArea.y) {
    resizeArea = generateThing(snake)
    width += 1
    height += 1
    snake.push(step)
    snake.shift()
  }
  else {
    snake.push(step)
    snake.shift()
  }

  const [field] = fieldGenerator(width, height, '.')
  field[resizeArea.y][resizeArea.x] = chalk.blue('⇄')
  field[apple.y][apple.x] = chalk.red('@')

  checkIfPlayerInTheArea(field, step)
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
        'You just bited yourself! I guess apples aren\'t that good huh ?',
      )
      process.exit()
    }
  }
}
// This function checks if player exist in the playing area
function checkIfPlayerInTheArea(field, step) {
  const { x, y } = step
  if (field[y] === undefined || field[y][x] === undefined) {
    console.log(
      'Looks like you got out of playing area!\nThe game`ll be restarted',
    )
    return process.exit()
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

setInterval(makeAStep, 400)

export default () => {
  return makeAStep()
}
