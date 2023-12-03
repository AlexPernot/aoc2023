import {readFileSync} from "node:fs";

const input = readFileSync("input.txt").toString();

const arrInput = input.split("\n").map(a => a.split(""));

const touchesSymbol = (input: string[][], y: number, xStart: number, xEnd: number): boolean => {
    const coordsToTest = [
        [y - 1, xStart - 1],
        [y, xStart - 1],
        [y + 1, xStart - 1],
        [y - 1, xEnd],
        [y, xEnd],
        [y + 1, xEnd]
    ];

    // Add the missing coords
    for (let i = xStart; i < xEnd; i++) {
        coordsToTest.push([y - 1, i])
        coordsToTest.push([y + 1, i])
    }

    for (const coords of coordsToTest) {
        if (input[coords[0]] === undefined || input[coords[0]][coords[1]] === undefined) {
            continue;
        }


        if (input[coords[0]][coords[1]].match(/(?=\D)(?=[^\.])/)) {
            return true;
        }
    }

    return false;
}

const getTouchingStarCoords = (input: string[][], y: number, xStart: number, xEnd: number): [number, number] | null => {
    const coordsToTest = [
        [y - 1, xStart - 1],
        [y, xStart - 1],
        [y + 1, xStart - 1],
        [y - 1, xEnd],
        [y, xEnd],
        [y + 1, xEnd]
    ];

    // Add the missing coords
    for (let i = xStart; i < xEnd; i++) {
        coordsToTest.push([y - 1, i])
        coordsToTest.push([y + 1, i])
    }

    for (const coords of coordsToTest) {
        if (input[coords[0]] === undefined || input[coords[0]][coords[1]] === undefined) {
            continue;
        }


        if (input[coords[0]][coords[1]].match(/\*/)) {
            return [coords[0], coords[1]];
        }
    }

    return null;
}

const solvePartOne = (input: string[][]) => {
    let sum = 0;
    let y = 0;

    for (let line of input) {
        const numberRegex = /\d+/g;
        console.log(`line ${y + 1}`)
        let match;
        let parts: string[] = [];
        let partBounds: [number, number][] = []

        while ((match = numberRegex.exec(line.join(""))) !== null) {
            parts.push(match[0]);
            partBounds.push([match.index, match.index + match[0].length])
        }

        for (let i = 0; i < partBounds.length; i++) {
            const [start, end] = partBounds[i];

            console.log(`Testing part ${parts[i]}`)
            if (touchesSymbol(input, y, start, end)) {
                console.log(`Part ${parts[i]} touches!`)
                sum += parseInt(parts[i]);
            }
        }
        y++;
    }

    return sum;
};

const solvePartTwo = (input: string[][]) => {
    let sum = 0;
    let y = 0;
    const starCoordsMap: Record<string, string> = {};

    for (let line of input) {
        // We find the numbers
        const numberRegex = /\d+/g;
        console.log(`line ${y + 1}`)
        let match;
        let parts: string[] = [];
        let partBounds: [number, number][] = []

        while ((match = numberRegex.exec(line.join(""))) !== null) {
            parts.push(match[0]);
            partBounds.push([match.index, match.index + match[0].length])
        }

        // For each number, find a touching star
        for (let i = 0; i < partBounds.length; i++) {
            const [start, end] = partBounds[i];

            console.log(`Testing part ${parts[i]}`)
            const touchingStarCoords = getTouchingStarCoords(input, y, start, end);
            if (touchingStarCoords !== null) {
                console.log(`Part ${parts[i]} touches a star!`)

                // Touching star found! Have we already found it?
                const existingPart = starCoordsMap[`${touchingStarCoords[0]},${touchingStarCoords[1]}`];

                if (existingPart !== undefined) {
                    // Yes, we feed the sum
                    sum += parseInt(parts[i]) * parseInt(existingPart);
                } else {
                    // No, we save it
                    starCoordsMap[`${touchingStarCoords[0]},${touchingStarCoords[1]}`] = parts[i];
                }
            }
        }
        y++;
    }

    return sum;
}

console.log(`Result is ${solvePartTwo(arrInput)}`);