import {readFileSync} from "node:fs";

const input = readFileSync("input.txt").toString();

const solvePartOne = (input: string) => {
    const times = input.split("\n")[0].split(/\s+/).filter(v => !isNaN(parseInt(v))).map(v => parseInt(v))
    const records = input.split("\n")[1].split(/\s+/).filter(v => !isNaN(parseInt(v))).map(v => parseInt(v))
    let result = 1;

    for (let i = 0; i < times.length; i++) {
        const time = times[i];
        const record = records[i];
        let recordBrokenCount = 0;
        let maxDistance = 0;

        for (let heldTime = 1; heldTime < time; heldTime++) {
            const newDistance = (heldTime * (time - heldTime));

            // Do we stop ? (skips half the processing time)
            if (newDistance == maxDistance) {
                recordBrokenCount *= 2;
                break;
            } else if (newDistance < maxDistance) {
                recordBrokenCount *= 2;
                recordBrokenCount--;
                break;
            }

            if (newDistance > record) {
                recordBrokenCount++;
            }
            maxDistance = newDistance;
        }

        console.log(`Race ${i + 1}: record is broken ${recordBrokenCount} times`)
        result *= recordBrokenCount;
    }

    return result;
}

const solvePartTwo = (input: string) => {
    const time = +input.split("\n")[0].split(/\s+/).filter(v => !isNaN(+v)).reduce((prev, curr) => prev + curr, "");
    const record = +input.split("\n")[1].split(/\s+/).filter(v => !isNaN(+v)).reduce((prev, curr) => prev + curr, "")

    let recordBrokenCount = 0;
    let maxDistance = 0;

    for (let heldTime = 1; heldTime < time; heldTime++) {
        const newDistance = (heldTime * (time - heldTime));

        // Do we stop ? (skips half the processing time)
        if (newDistance == maxDistance) {
            recordBrokenCount *= 2;
            break;
        } else if (newDistance < maxDistance) {
            recordBrokenCount *= 2;
            recordBrokenCount--;
            break;
        }

        if (newDistance > record) {
            recordBrokenCount++;
        }
        maxDistance = newDistance;
    }

    return recordBrokenCount;
}

console.log(`Result is ${solvePartTwo(input)}`);