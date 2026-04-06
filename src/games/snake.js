#!/usr/bin/env node
import { randomNumber } from '../index.js';
import readline from 'node:readline';
readline.emitKeypressEvents(process.stdin);
if (process.stdin.isTTY) {
    process.stdin.setRawMode(true);
}

let snake
    = [
        { x: 2, y: 0 },
        { x: 1, y: 0 },
        { x: 0, y: 0 },
    ];

// apple
let apple = { x: 5, y: 5 };

// field
const width = 10;
const height = 10;

const drawField = (width = 10, height = 10) => {
    const field = [];
    for (let i = 0; i <= height; i++) {
        const newRow = [];
        for (let i = 0; i <= width; i++) {
            newRow.push('.');
        }
        field.push(newRow);
    }
    field[apple.y][apple.x] = '@';
    for (const { x, y } of snake) {
        field[y][x] = '#';
    }
    return console.log(`___________________\n${field.map(row => row.join(' ')).join('\n')}\n___________________`);
};

// movement
let direction = { x: 0, y: 1 };

const oneStep = () => {
    console.clear();
    let newHead = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };
    console.log(newHead);
    if ((newHead.x > width || newHead.x < 0) || (newHead.y > height || newHead.y < 0)) {
        return console.log('You lost');
    }
    for (const { x, y } of snake) {
        if (newHead.x === x && newHead.y === y) {
            return console.log('You lost');
        }
    }
    if ((newHead.x === apple.x && newHead.y === apple.y)) {
        snake.unshift(newHead);
        apple = { x: randomNumber(), y: randomNumber() };
    }
    else {
        snake.unshift(newHead);
        snake.pop();
    }

    drawField();
};

process.stdin.on('keypress', (_, key) => {
    if (key.ctrl && key.name === 'c' || key.name === 'space') {
        process.exit();
    }
    switch (key.name) {
        case 'up':
            direction = { x: 0, y: -1 };
            break;
        case 'down':
            direction = { x: 0, y: 1 };
            break;
        case 'left':
            direction = { x: -1, y: 0 };
            break;
        case 'right':
            direction = { x: 1, y: 0 };
            break;
    }
});

setInterval(oneStep, 700);
