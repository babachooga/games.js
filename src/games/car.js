import chalk from 'chalk'
import { fieldGenerator, checkIfPlayerInTheArea } from '../index.js'
import readline from 'node:readline'

readline.emitKeypressEvents(process.stdin)
if (process.stdin.isTTY) {
  process.stdin.setRawMode(true)
}

const [field, width, height] = fieldGenerator(6, 10, ' ')

const middle = Math.floor(width / 2)
let player = { x: middle, y: height - 2 }

const play = () => {
  console.clear()

  const enemies = generateEnemis(field, width)
  fieldMovement(field, enemies)

  const fieldWithPlayer = showPlayer(field, player)

  showDeadMassege(isPlayerDead(player, field))
  checkIfPlayerInTheArea(field, player)

  console.log(fieldWithPlayer.map(row => row.join('|')).join('\n'))
}

function generateEnemis(field, width) {
  const newRow = Array(width).fill(' ')
  for (let i = 0; i < width; i++) {
    if (Math.random() > 0.8) {
      newRow[i] = chalk.green(0)
    }
  }
  return newRow
}

function fieldMovement(field, newRow) {
  field.unshift(newRow)
  field.pop()
  return field
}

function showPlayer(field, player) {
  const fieldCopy = field.map(row => [...row])
  fieldCopy[player.y][player.x] = chalk.red('X')
  return fieldCopy
}

function isPlayerDead(player, field) {
  const alive = field[player.y][player.x] === chalk.green(0)
  return alive
}

function showDeadMassege(boolian) {
  if (boolian) {
    console.log('You crashed!')
    process.exit()
  }
}

process.stdin.on('keypress', (_, key) => {
  if (key.ctrl && key.name === 'c') {
    process.exit()
  }
  switch (key.name) {
    case 'left':
      player.x -= 1
      break
    case 'right':
      player.x += 1
      break
  }
})

setInterval(play, 400)

export default () => {
  return play()
}
