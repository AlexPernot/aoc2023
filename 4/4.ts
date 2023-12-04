import {readFileSync} from "node:fs";

const input = readFileSync("input.txt").toString();

const solvePartOne = (input: string) => {
    let sum = 0;

    for (let line of input.split("\n")) {
        let winningCount = 0;
        line = line.replace(/Card\s+\d+:\s+/, "");
        const [winningString, inPossessionString] = line.split(" | ");
        const winningNumbers = winningString.split(/\s+/).map(c => parseInt(c));
        const inPossessionNumbers = inPossessionString.split(/\s+/).map(c => parseInt(c));

        for (const inPosessionNumber of inPossessionNumbers) {
            if (winningNumbers.includes(inPosessionNumber)) {
                winningCount++;
            }
        }

        if (winningCount > 0) {
            let score = 1;

            for (let i = 0; i < winningCount - 1; i++) {
                score *= 2;
            }

            sum += score;
        }
    }

    return sum;
};

const solvePartTwo = (input: string) => {
    let lineNumber = 0;
    const copyCounters: Record<number, number> = {};

    for (let line of input.split("\n")) {
        lineNumber++;
        let winningCount = 0;
        line = line.replace(/Card\s+\d+:\s+/, "");
        const [winningString, inPossessionString] = line.split(" | ");
        const winningNumbers = winningString.split(/\s+/).map(c => parseInt(c));
        const inPossessionNumbers = inPossessionString.split(/\s+/).map(c => parseInt(c));

        for (const inPosessionNumber of inPossessionNumbers) {
            if (winningNumbers.includes(inPosessionNumber)) {
                winningCount++;
            }
        }

        const copiesOfCurrentLine = copyCounters[lineNumber] || 0;

        // For each copy of this line + the original
        for (let j = 0; j < copiesOfCurrentLine+1; j++) {
            // Create copies winningCount times
            for (let i = 1; i <= winningCount; i++) {
                if (copyCounters[lineNumber + i] === undefined) {
                    copyCounters[lineNumber + i] = 1;
                } else {
                    copyCounters[lineNumber + i]++;
                }
            }
        }
    }

    console.log(copyCounters)

    // Sum all the copy counts + the originals count, which is lineNumber
    return Object.values(copyCounters).reduce((prev, curr) => prev + curr, lineNumber);

}

console.log(`Result is ${solvePartTwo(input)}`);