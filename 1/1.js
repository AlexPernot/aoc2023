const fs = require("node:fs");

const input = fs.readFileSync("input.txt").toString();

const solvePartOne = input => {
    let sum = 0;

    for (const line of input.split("\n")) {
        let number = "";

        for (const char of line) {
            if (!isNaN(parseInt(char))) {
                number += char;
                break;
            }
        }

        for (let i = line.length; i >= 0; i--) {
            if (!isNaN(parseInt(line[i]))) {
                number += line[i];
                break;
            }
        }

        console.log(number);
        sum += parseInt(number);
    }

    return sum;
};

const solvePartTwoRegex = input => {
    const spelledOut = {
        'one': '1',
        'two': '2',
        'three': '3',
        'four': '4',
        'five': '5',
        'six': '6',
        'seven': '7',
        'eight': '8',
        'nine': '9',
    };

    let sum = 0;

    for (let line of input.split("\n")) {
        const matches = line.match(/(one|two|three|four|five|six|seven|eight|nine|\d)/g);

        const firstNumber = parseInt(matches[0].length > 1 ? spelledOut[matches[0]] : matches[0]);
        const secondNumber = parseInt(matches[matches.length-1].length > 1
            ? spelledOut[matches[matches.length-1]]
            : matches[matches.length-1]);

        sum += ((firstNumber*10) + secondNumber);
    }

    return sum;
}

console.log(`Final sum is ${solvePartTwoRegex(input)}`);