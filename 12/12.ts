import {readFileSync} from "node:fs";

const input = readFileSync("input.txt").toString();

const isRecordLegal = (record: string, instructions: number[]) => {
    //console.log(instructions, record)
    const matches = record.match(/(#+)/g);

    if (!matches || matches.length !== instructions.length) {
        return false;
    }

    for (let i = 0; i < instructions.length; i++) {
        if (matches[i].length !== instructions[i]) {
            return false;
        }
    }

    return true;
}

const solvePartOne = (input: string) => {
    let sum = 0;

    for (const line of input.split("\n")) {
        const [record, instructionsStr] = line.split(" ");
        const instructions = instructionsStr.split(',').map(v => +v);
        const unknownCount = record.split("?").length - 1;

        for (let i = 0; i < Math.pow(2, unknownCount); i++) {
            const filling = i.toString(2).padStart(unknownCount, '0')
                .replace(/0/g, '.')
                .replace(/1/g, '#');

            let fillingIndex = 0;
            let filledRecord = "";

            for (const recordChar of record) {
                let char = recordChar;

                if (recordChar === "?") {
                    char = filling[fillingIndex];
                    fillingIndex++;
                }

                filledRecord += char;
            }

            if (isRecordLegal(filledRecord, instructions)) {
                sum++;
            }
        }
    }

    return sum;
};

const solvePartTwo = (input: string) => {
    let sum = 0;

    for (const line of input.split("\n")) {
        const [recordBase, instructionsBase] = line.split(" ");
        const record = (recordBase + "?").repeat(5).slice(0, -1);
        const instructions = (instructionsBase + ",").repeat(5).slice(0, -1).split(',').map(v => +v);
        const unknownCount = record.split("?").length - 1;

        // Brute force method can't work anymore (example line 2 has 536870912 mask possibilities)
        // TODO : find another way
        for (let i = 0; i < Math.pow(2, unknownCount); i++) {
            const filling = i.toString(2).padStart(unknownCount, '0')
                .replace(/0/g, '.')
                .replace(/1/g, '#');

            let fillingIndex = 0;
            let filledRecord = "";

            for (const recordChar of record) {
                let char = recordChar;

                if (recordChar === "?") {
                    char = filling[fillingIndex];
                    fillingIndex++;
                }

                filledRecord += char;
            }

            if (isRecordLegal(filledRecord, instructions)) {
                sum++;
            }
        }
    }

    return sum;
};

console.time("exec")
console.log(`Result is ${solvePartTwo(input)}`);
console.timeEnd("exec")