import readline from 'node:readline';
readline.emitKeypressEvents(process.stdin);
if (process.stdin.isTTY) {
    process.stdin.setRawMode(true);
}

let dino =
    [
        { x: 3, y: 0 },
        { x: 3, y: 0 }
    ];

const width = 15;
const height = 5;

const getField = () => {
    const field = [];
    for (let i = 0; i < height; i++) {
        const newRow = [];
        for (let j = 0; j < width; j++) {
            newRow.push(' ');
        }
        field.push(newRow);
    }
};
getField();
