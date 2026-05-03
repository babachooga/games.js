import chalk from 'chalk'

export default () => {
  console.log('Wellcome to games.js\nThere are several games you can play:')
  console.log(`* ${chalk.green('snake')}`)
  console.log(`* ${chalk.green('race')}`)
  console.log(`* ${chalk.green('gallows')}`)
  console.log('Type in one on those in the terminal to start playing')
}

export const randomNumber = (range = 10) => {
  return Math.floor(Math.random() * range)
}

export function arrayRandomElement(array) {
  const length = array.length
  const element = array[randomNumber(length)]
  return element
}

export function fieldGenerator(width, heigth, background) {
  const field = []
  for (let i = 0; i < heigth; i++) {
    field.push(Array(width).fill(background))
  }
  return [field, width, heigth]
}

export function checkIfPlayerInTheArea(field, step) {
  const { x, y } = step
  if (field[y] === undefined || field[y][x] === undefined) {
    console.log(
      'Looks like you got out of playing area!\nThe game`ll be restarted',
    )
    return process.exit()
  }
}
