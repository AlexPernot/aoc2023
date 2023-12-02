import {readFileSync} from "node:fs";

const input = readFileSync("input.txt").toString();

const solvePartOne = (input: string) => {
    const maxRedCubes = 12;
    const maxGreenCubes = 13;
    const maxBlueCubes = 14;
    let sum = 0;
    let lineNumber = 1;

    for (let line of input.split("\n")) {
        line = line.replace(/Game \d+: /, '');
        const sets = line.split("; ");
        let isPossible = true;

        for (const set of sets) {
            const r = set.match(/(\d+) red/);

            if (r !== null && parseInt(r[1]) > maxRedCubes) {
                isPossible = false;
                break;
            }

            const g = set.match(/(\d+) green/);
            if (g !== null && parseInt(g[1]) > maxGreenCubes) {
                isPossible = false;
                break;
            }

            const b = set.match(/(\d+) blue/);
            if (b !== null && parseInt(b[1]) > maxBlueCubes) {
                isPossible = false;
                break;
            }
        }

        if (isPossible) {
            console.log(`Game ${lineNumber} is possible`)
            sum += lineNumber;
        }

        lineNumber++;
    }

    return sum;
};

const solvePartTwo = (input: string) => {
    let sum = 0;

    for (let line of input.split("\n")) {
        let maxRedCubes = 0;
        let maxGreenCubes = 0;
        let maxBlueCubes = 0;

        line = line.replace(/Game \d+: /, '');
        const sets = line.split("; ");

        for (const set of sets) {
            const r = set.match(/(\d+) red/);

            if (r !== null && parseInt(r[1]) > maxRedCubes) {
                maxRedCubes = parseInt(r[1]);
            }

            const g = set.match(/(\d+) green/);
            if (g !== null && parseInt(g[1]) > maxGreenCubes) {
                maxGreenCubes = parseInt(g[1]);
            }

            const b = set.match(/(\d+) blue/);
            if (b !== null && parseInt(b[1]) > maxBlueCubes) {
                maxBlueCubes = parseInt(b[1])
            }
        }

        console.log(`max: ${maxRedCubes}, ${maxGreenCubes}, ${maxBlueCubes}, power is ${maxRedCubes * maxGreenCubes * maxBlueCubes}`)
        sum += maxRedCubes * maxGreenCubes * maxBlueCubes;
    }

    return sum;
}

console.log(`Result is ${solvePartTwo(input)}`);