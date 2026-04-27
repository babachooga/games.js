import { randomNumber, arrayRandomElement } from "../index.js";
import chalk from "chalk";
import readlineSync from "readline-sync";

const words = [
    "buyer",
    "alert",
    "stand",
    "bases",
    "spend",
    "table",
    "death",
    "dream",
    "basic",
    "taken",
    "field",
    "alive",
    "eight",
    "peace",
    "check",
    "chief",
    "eager",
    "gross",
    "plain",
    "heavy",
    "fraud",
    "block",
    "jimmy",
    "strip",
    "lives",
    "count",
    "slide",
    "print",
    "topic",
    "radio",
    "fiber",
    "ready",
    "again",
    "seven",
    "world",
    "steam",
    "shift",
    "queen",
    "quite",
    "hence",
    "horse",
    "tower",
    "teach",
    "prove",
    "group",
    "strip",
    "ahead",
    "harry",
    "claim",
    "rural",
    "scope",
    "guess",
    "place",
    "enjoy",
    "tight",
    "other",
    "array",
    "given",
    "input",
    "coast",
    "billy",
    "right",
    "cover",
    "clean",
    "again",
    "lying",
    "field",
    "solid",
    "dealt",
    "audit",
    "often",
    "which",
    "grown",
    "known",
    "laser",
    "fresh",
    "began",
    "phone",
    "dozen",
    "abuse",
    "quite",
    "treat",
    "union",
    "solid",
    "frank",
    "avoid",
    "radio",
    "think",
    "shape",
    "alter",
    "table",
    "avoid",
    "enjoy",
    "trust",
    "ratio",
    "quick",
    "allow",
    "prove",
    "bring",
    "chest",
];

const play = () => {
    const word = arrayRandomElement(words);
    const wordAsArray = word.split("");
    const userAnswers = [];
    
    return () => {
        console.log(word);
        for (let i = 0; i < 5; i++) {
            const newRow = [];
            let answer = ''
            for (let j = 0; j < 5; j++) {
                console.log(newRow.join(""));

                const userLetter = readlineSync.question(
                    "What letter do you choose? ",
                );

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
                return `You guessed the word!`
            }
            userAnswers.push(newRow.join(""));
        }
    };
    return "You lose";
};

const next = play();
next();
