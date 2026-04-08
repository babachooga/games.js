import { randomNumber } from "../index.js";

//field
const createField = (symbol = '.') => {
    const field = [];
    return function (width, height) {
        for (let i = 0; i < height; i += 1) {
            const newRow = [];
            for (let j = 0; j < width; j += 1) {
                newRow.push(symbol);
            }
            field.push(newRow);
        }
        return field;
    };
};

const makeField = createField(" ");
const field = makeField(5, 12);
//field

// fish generator
const makeAfish = () => {
    return function (array) {
        for (const block of array) {
            if (Math.random < 0.70) {
                block = 'c=<';
            }
        }
        return array;
    };
};

const generateFish = () => {
    return field.forEach(makeAfish);
};
console.log(field);