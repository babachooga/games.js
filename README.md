# Console games.js
##### Games.js is a small library of simply games. All of them were written on pure JS and nothing else.

## Features
  * __Coordinate system:__ Games like snake and race were build based on coordinate system, using objects as coordinates `{ x: 2, y: 3 }` and array as a field
#### Peace of code from snake game for preview:
 ```javascript
const snake = [
  { x: 1, y: 1 },
  { x: 2, y: 1 },
  { x: 3, y: 1 },
]

function generateSnakeOnField(field, snake) {
  for (const { x, y } of snake) {
    field[y][x] = chalk.green(arrayRandomElement(chars))
  }
  return field
}
```
* __Reusability and Abstraction:__ Function fieldGenerator / checkIfPlayerInTheArea are universal. They used in two different games that makes code more clean.
* __Reсursion:__ For explamle: function askForLetter will promt user for char, until it's valid.
#### Peace of code from gallows game for preview:
```javascript
function askForLetter() {
  const userAnswear = readlineSync.question('What letter do you choose ?: ')
  const ensureOneChar = userAnswear.slice(0, 1)

  if (!ensureOneChar) {
    console.log(`Looks like you did't choose your letter, try again`)
    return askForLetter()
  }

  return ensureOneChar.trim().toLowerCase()
}
```
## Requirements
1. **Install [NodeJS](https://nodejs.org/en).**
2. **Clone repository into empty foltder `git clone git@github.com:babachooga/games.js.git`.**
3. **Install dependencies `npm  ci` / `make install`.**
4. **How to play?:** Type `hello` to see all avaliable games. Then type one of keywords to start playing.

## Asciinema of all games
* **[snake](https://asciinema.org/a/HUYheFxH3oZXr18P)**
* **[race](https://asciinema.org/a/sNI0qBVG99psd6SM)**
* **[gallows](https://asciinema.org/a/Bn91dcgWNvrurdL5)**
###### This repository was made by [babachooga](https://github.com/babachooga) for educational purposes.
