import { randomNumber } from '../index.js'

import readline from 'node:readline'
readline.emitKeypressEvents(process.stdin)
if (process.stdin.isTTY) {
  process.stdin.setRawMode(true)
}

// FIELD GENERATING FUNCTION
const width = 5
const height = 9

const getField = () => {
  const field = []
  for (let i = 0; i < height; i++) {
    const newRow = []
    for (let j = 0; j < width; j++) {
      newRow.push(' ')
    }
    field.push(newRow)
  }
  return field
}

let field = getField()
// FIELD GENERATING FUNCTION

// car-cords
let car = { x: 2, y: 7 }

// Function for enemies
let direction = { x: 0, y: 0 }

const generateEnemis = () => {
  field.pop()
  const newRow = []
  for (let j = 0; j < width; j++) {
    newRow.push(' ')
  }
  if (Math.random() < 0.75) {
    const enemyIndex = randomNumber(width)
    newRow[enemyIndex] = '0'
  }
  field.unshift(newRow)

  const displayField = field.map(row => [...row])
  displayField[car.y][car.x] = 'X'
  console.log(displayField.map(row => row.join('|')).join('\n'))
}

const driving = () => {
  console.clear()
  car.x += direction.x
  car.y += direction.y
  console.log(car)
  if (car.x < 0 || car.x >= width || car.y < 0 || car.y >= height) {
    console.log('You crashed! Be carefull next time!')
    process.exit()
  }
  if (field[car.y][car.x] === '0') {
    console.log('You got crashed by someones car, try to be more carefull!')
    process.exit()
  }
  generateEnemis()
}

process.stdin.on('keypress', (_, key) => {
  if (key.ctrl && key.name === 'c') {
    process.exit()
  }
  switch (key.name) {
    case 'left':
      direction = { x: -1, y: 0 }
      break
    case 'right':
      direction = { x: 1, y: 0 }
      break
    case 'up':
      direction = { x: 0, y: -1 }
      break
    case 'down':
      direction = { x: 0, y: 1 }
      break
    case 'space':
      direction = { x: 0, y: 0 }
      break
  }
})

export default () => {
  return setInterval(driving, 640)
}
