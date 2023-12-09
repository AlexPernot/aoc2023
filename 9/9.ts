import {readFileSync} from "node:fs";

const input = readFileSync("input.txt").toString();

const first = <T>(arr: Array<T>) => arr[0];
const last = <T>(arr: Array<T>) => arr[arr.length - 1];

const extrapolatePartOne = (numbers: number[]) => {
    const diffs: number[][] = [numbers];

    while (last(diffs).find((v) => v !== 0) !== undefined) {
        const diff = [];
        const lastStep = last(diffs);

        for (let i = 0; i < lastStep.length - 1; i++) {
            const sum = lastStep[i + 1] - lastStep[i];
            diff.push(sum);
        }
        diffs.push(diff);
    }

    last(diffs).push(0);

    for (let i = diffs.length - 1; i > 0; i--) {
        diffs[i - 1].push(last(diffs[i - 1]) + last(diffs[i]));
    }

    return last(diffs[0]);
}

const solvePartOne = (input: string) => {
    let sum = 0;

    for (const line of input.split("\n")) {
        sum += extrapolatePartOne(line.split(" ").map(v => parseInt(v)));
    }

    return sum;
}

const extrapolatePartTwo = (numbers: number[]) => {
    const diffs: number[][] = [numbers];

    while (last(diffs).find((v) => v !== 0) !== undefined) {
        const diff = [];
        const lastStep = last(diffs);

        for (let i = 0; i < lastStep.length - 1; i++) {
            const sum = lastStep[i + 1] - lastStep[i];
            diff.push(sum);
        }
        diffs.push(diff);
    }

    last(diffs).unshift(0);

    for (let i = diffs.length - 1; i > 0; i--) {
        diffs[i - 1].unshift(first(diffs[i - 1]) - first(diffs[i]));
    }

    return first(diffs[0]);
}

const solvePartTwo = (input: string) => {
    let sum = 0;

    for (const line of input.split("\n")) {
        sum += extrapolatePartTwo(line.split(" ").map(v => parseInt(v)));
    }

    return sum;
}

console.time("exec")
console.log(`Result is ${solvePartTwo(input)}`);
console.timeEnd("exec")