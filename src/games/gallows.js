import readlineSync from 'readline-sync'
import { wordsAndHints, gallowsDoll } from '../gallowsData.js'
import { randomNumber } from '../index.js'

function askForLetter() {
  const userAnswear = readlineSync.question('What letter do you choose ?: ')
  const ensureOneChar = userAnswear.slice(0, 1)

  if (!ensureOneChar) {
    console.log(`Looks like you did't choose your letter, try again`)
    return askForLetter()
  }

  return ensureOneChar.trim().toLowerCase()
}

function getWordAndHintForgame(words) {
  const chooseByIndex = words[randomNumber(words.length)]
  return chooseByIndex
}

function getWord(WordAndHint) {
  return WordAndHint.word
}

function getHint(WordAndHint) {
  return WordAndHint.hint
}

function generatePlaceholder(word) {
  return '_'.repeat(word.length)
}

function showLetterInPlaceholder(word, letter, placeholder) {
  let newPlaceholder = placeholder.split('')
  for (let i = 0; i < word.length; i++) {
    if (word[i] === letter) {
      newPlaceholder[i] = letter
    }
  }
  return newPlaceholder.join('')
}

function showGameInfo(dollState, dollStateIndex, hint, placeHolder) {
  console.clear()
  console.log(hint)
  console.log(`${placeHolder} / mistakes: ${dollStateIndex}`)
  console.log(dollState)
}

function play() {
  const wordAndHint = getWordAndHintForgame(wordsAndHints)
  const word = getWord(wordAndHint)
  const hint = getHint(wordAndHint)
  let placeHolder = generatePlaceholder(word)

  return () => {
    for (let i = 0; i < gallowsDoll.length; i++) {
      showGameInfo(gallowsDoll[i], i, hint, placeHolder)

      let continueTurn = true
      do {
        showGameInfo(gallowsDoll[i], i, hint, placeHolder)
        continueTurn = false
        const userLetter = askForLetter()

        if (word.split('').includes(userLetter)) {
          placeHolder = showLetterInPlaceholder(word, userLetter, placeHolder)
          continueTurn = true
        }

        if (placeHolder === word) {
          console.log('You saved the doll!!!')
          return null
        }
      }
      while (continueTurn)
    }
    console.log(`The word was ${word}`)
    return null
  }
}

const playGame = play()

export default () => {
  playGame()
}
