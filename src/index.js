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
