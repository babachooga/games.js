import { randomNumber, arrayRandomElement, firstChar } from "../index.js";
import chalk from "chalk";
import readlineSync from "readline-sync";

const words = ["buyer","alert","stand","bases","spend","table","death","dream","basic","taken","field","alive","eight","peace",
    "check","chief","eager","gross","plain","heavy","fraud","block","jimmy","strip","lives","count","slide",
    "print","topic","radio","fiber","ready","again","seven","world","steam","shift","queen","quite","hence","horse",
    "tower","teach","prove","group","strip","ahead","harry","claim","rural","scope","guess","place","enjoy","tight","other",
    "array","given","input","coast","billy","right","cover","clean","again","lying","field","solid","dealt","audit",
    "often","which","grown","known","laser","fresh","began","phone","dozen","abuse","quite","treat","union","solid","frank",
    "avoid","radio","think","shape","alter","table","avoid","enjoy","trust","ratio","quick","allow","prove","bring","chest",
];

const play = () => {
    const word = arrayRandomElement(words);
    const wordAsArray = word.split("");
    const userAnswers = [];
    
    return () => {
        for (let i = 0; i < 5; i++) {
            const newRow = [];
            let answer = ''
            for (let j = 0; j < 5; j++) {
                console.clear()
                console.log(userAnswers.join('\n'))
                console.log('-----')
                console.log(newRow.join(""));

                const RawAnswer = readlineSync.question("What letter do you choose? ",);
                const userLetter = firstChar(RawAnswer)
                
                if (wordAsArray[j] === userLetter) {
                    answer += userLetter
                    const green = chalk.bgGreen(userLetter);
                    newRow.push(green);
                }
                else if (wordAsArray.includes(userLetter)) {
                    answer += userLetter
                    const yellow = chalk.bgYellow(userLetter);
                    newRow.push(yellow);
                }
                else {
                    answer += userLetter
                    const gray = chalk.bgGray(userLetter);
                    newRow.push(gray);
                }

            }
            if (word == answer) {
                console.log( `You guessed the word!`)
                return 
            }
            userAnswers.push(newRow.join(""));
        }
        console.log(`You lose, the correct word was: ${word}`)
        return 
    };
};

const startGame = play();

export default () =>{
    return startGame()
}