export const randomNumber = (range = 10) => {
  return Math.floor(Math.random() * range)
}

export const randomChars = () => {
  const chars = [
    't', 'V', 'r', '<', '#', 'A', 'H', 'L', '[', 'r', 'e', 'H', 'j', 'q', '{', 'z',
    'c', 'm', 'P', '~', 'W', '<', 'u', '!', '&', '7', 'u', 'L', 'S', 'i', 'E', 'h',
    '#', 'T', 'v', 'y', '!', 'l', '&', 'O', '+', 'Z', 'v', 'Q', 'Q', 'w', '8', '$',
  ]
  return chars[randomNumber(chars.length)]
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
