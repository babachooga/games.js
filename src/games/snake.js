import readline from 'node:readline'
import { randomNumber, chars } from '../index.js'
import chalk from 'chalk'

readline.emitKeypressEvents(process.stdin)
if (process.stdin.isTTY) {
  process.stdin.setRawMode(true)
}

// size of the game field, where are: height = qantity of row in the main array, and width: length of the rows
let width = 9
let height = 9

const snake = [
  { x: 1, y: 1 },
  { x: 2, y: 1 },
  { x: 3, y: 1 },
]

// generates one of many diffent chars, fieldGenerator uses this fucntion to represent the snake on the field
export const randomChars = () => {
  const symbols = chars
  const randomChar = symbols[randomNumber(symbols.length)]
  return randomChar
}

// game objects
let resizeArea = { x: randomNumber(width), y: randomNumber(height) }
let apple = { x: randomNumber(width), y: randomNumber(height) }
// snake's next move direction, using it in the makeAStep funtion.
let direction = { x: 1, y: 0 }

function fieldGenerator(width, heigth, background) {
  const field = []
  for (let i = 0; i < heigth; i++) {
    field.push(Array(width).fill(background))
  }
  for (const { x, y } of snake) {
    checkIfPlayerInTheArea(field, x, y)
    field[y][x] = chalk.green(randomChars())
  }
  field[resizeArea.y][resizeArea.x] = chalk.blue('⇄')
  field[apple.y][apple.x] = chalk.red('@')
  return [field, width, heigth]
}

const makeAStep = () => {
  console.clear()
  const step = {
    x: snake.at(-1).x + direction.x,
    y: snake.at(-1).y + direction.y,
  }
  isPlayerStillAlive(snake, step)
  if (step.x === apple.x && step.y === apple.y) {
    snake.push(step)
    apple = generateThing(snake)
  }
  else if (step.x === resizeArea.x && step.y === resizeArea.y) {
    width += 1
    height += 1
    resizeArea = generateThing(snake)
  }
  else {
    snake.push(step)
    snake.shift()
  }
  const [field] = fieldGenerator(width, height, '.')
  console.log(field.map(array => array.join(' ')).join('\n'))
}

// snake movement ←↑↓→
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

// Apple generation
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

// This function check is player exist in the playing area
function checkIfPlayerInTheArea(field, x, y) {
  if (field[y] === undefined || field[y][x] === undefined) {
    console.log(
      'Looks like you got out of playing area!\nThe game`ll be restarted',
    )
    return process.exit()
  }
}
// This function checks is snake's head went on top of it's body or it isn't
function isPlayerStillAlive(snake, step) {
  for (const { x, y } of snake) {
    if (x === step.x && y === step.y) {
      console.log('You just bited yourself! I guess apples aren\'t that good huh ?')
      process.exit()
    }
  }
}

setInterval(makeAStep, 400)

export default () => {
  return makeAStep()
}
