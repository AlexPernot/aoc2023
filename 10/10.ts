import {readFileSync} from "node:fs";

//const input = readFileSync("input.txt").toString();
const input = `...........
.S-------7.
.|F-----7|.
.||.....||.
.||.....||.
.|L-7.F-J|.
.|..|.|..|.
.L--J.L--J.
...........`;

type Direction = 'N' | 'E' | 'S' | 'W';
// y, x, nextY, nextX
type Path = [number, number, number, number];

const charConnects = (char: string, fromDirection: Direction): boolean => {
    switch (char) {
        case '|':
            return fromDirection === 'N' || fromDirection === 'S';
        case '-':
            return fromDirection === 'W' || fromDirection === 'E';
        case 'L':
            return fromDirection === 'N' || fromDirection === 'E';
        case 'J':
            return fromDirection === 'N' || fromDirection === 'W';
        case '7':
            return fromDirection === 'S' || fromDirection === 'W';
        case 'F':
            return fromDirection === 'S' || fromDirection === 'E';
        default:
            return false;
    }
}

const getNextCoords = (lines: string[], path: Path): [number, number] => {
    const fromCoords = [path[0], path[1]];
    const coords = [path[2], path[3]];

    switch (lines[coords[0]][coords[1]]) {
        case '|':
            return fromCoords[0] < coords[0] ? [coords[0] + 1, coords[1]] : [coords[0] - 1, coords[1]];
        case '-':
            return fromCoords[1] < coords[1] ? [coords[0], coords[1] + 1] : [coords[0], coords[1] - 1];
        case 'L':
            return fromCoords[0] < coords[0] ? [coords[0], coords[1] + 1] : [coords[0] - 1, coords[1]];
        case 'J':
            return fromCoords[0] < coords[0] ? [coords[0], coords[1] - 1] : [coords[0] - 1, coords[1]];
        case '7':
            return fromCoords[0] > coords[0] ? [coords[0], coords[1] - 1] : [coords[0] + 1, coords[1]];
        case 'F':
            return fromCoords[0] > coords[0] ? [coords[0], coords[1] + 1] : [coords[0] + 1, coords[1]];
    }
}

const shouldContinueScanning = (paths: Path[]) => paths[0][0] !== paths[1][0] || paths[0][1] !== paths[1][1]

const solvePartOne = (input: string) => {
    let startCoords: [number, number] = [0, 0];
    const lines = input.split("\n")

    for (let i = 0; i < lines.length; i++) {
        for (let j = 0; j < lines[i].length; j++) {
            if (lines[i][j] === "S") {
                startCoords = [i, j];
            }
        }
    }

    // From S, read every direction. If connects, scans from every path until both paths reads same coords
    const toRead: [number, number, Direction][] = [
        [startCoords[0] - 1, startCoords[1], 'S'],
        [startCoords[0], startCoords[1] + 1, 'W'],
        [startCoords[0] + 1, startCoords[1], 'N'],
        [startCoords[0], startCoords[1] - 1, 'E']
    ];

    const paths: Path[] = [];
    let steps = 1;

    // Scan around start to determine paths
    for (const [y, x, from] of toRead) {
        if (charConnects(lines[y][x], from)) {
            const nextCoords = getNextCoords(lines, [startCoords[0], startCoords[1], y, x]);
            paths.push([y, x, nextCoords[0], nextCoords[1]]);
        }
    }

    while (shouldContinueScanning(paths)) {
        for (let i = 0; i < paths.length; i++) {
            const nextCoords = getNextCoords(lines, paths[i]);
            paths[i] = [paths[i][2], paths[i][3], nextCoords[0], nextCoords[1]];
        }

        steps++;
    }

    return steps;
}

const canPassChar = (lines: string[], coords: [number, number], fromDirection: Direction) => {
    const char = lines[coords[0]][coords[1]];

    // TODO : squeeze check
    switch (char) {
        case '|':
            return (fromDirection === 'N' || fromDirection === 'S') ? false : false;
        case '-':
            return (fromDirection === 'W' || fromDirection === 'E') ? false : false;
        case 'L':
            return (fromDirection === 'N' || fromDirection === 'E') ? false : false;
        case 'J':
            return (fromDirection === 'N' || fromDirection === 'W') ? false : false;
        case '7':
            return (fromDirection === 'S' || fromDirection === 'W') ? false : false;
        case 'F':
            return (fromDirection === 'S' || fromDirection === 'E') ? false : false;
        default:
            return true;
    }
}

const isEnclosed = (lines: string[], coords: [number, number], otherEnclosed: [number, number][]) => {
    // check north
    for (let i = coords[0]; i >= 0; i--) {
        const toCheck: [number, number] = [i, coords[1]];

        for (const [y, x] of otherEnclosed) {
            if (toCheck[0] === y && toCheck[1] === x) {
                return true;
            }
        }

        const canPass = canPassChar(lines, toCheck, 'S');

        if (!canPass) {
            break;
        } else if (canPass && i === 0) {
            return false;
        }
    }

    // check east
    for (let i = coords[1]; i < lines[coords[0]].length; i++) {
        const toCheck: [number, number] = [coords[0], i];

        for (const [y, x] of otherEnclosed) {
            if (toCheck[0] === y && toCheck[1] === x) {
                return true;
            }
        }

        const canPass = canPassChar(lines, toCheck, 'W');

        if (!canPass) {
            break;
        } else if (canPass && i === lines[coords[0]].length - 1) {
            return false;
        }
    }

    // check south
    for (let i = coords[0]; i < lines.length; i++) {
        const toCheck: [number, number] = [i, coords[1]];

        for (const [y, x] of otherEnclosed) {
            if (toCheck[0] === y && toCheck[1] === x) {
                return true;
            }
        }

        const canPass = canPassChar(lines, toCheck, 'N');

        if (!canPass) {
            break;
        } else if (canPass && i === lines.length - 1) {
            return false;
        }
    }

    // check west
    for (let i = coords[1]; i >= 0; i--) {
        const toCheck: [number, number] = [coords[0], i];

        for (const [y, x] of otherEnclosed) {
            if (toCheck[0] === y && toCheck[1] === x) {
                return true;
            }
        }

        const canPass = canPassChar(lines, toCheck, 'E');

        if (!canPass) {
            break;
        } else if (canPass && i === 0) {
            return false;
        }
    }

    return true;
}

const printLines = (lines: string[], enclosedCoords: [number, number][]) => {
    for (let i = 0; i < lines.length; i++) {
        let line = "";

        for (let j = 0; j < lines[i].length; j++) {
            let isEnclosed = false;
            for (const [y, x] of enclosedCoords) {
                if (y === i && x === j) {
                    isEnclosed = true;
                    break;
                }
            }

            if (isEnclosed) {
                line += "I";
            } else if (lines[i][j] === ".") {
                line += "O";
            } else {
                line += lines[i][j];
            }
        }

        console.log(line);
    }
}

const solvePartTwo = (input: string) => {
    const lines = input.split("\n");

    let dotsCoords: [number, number][] = [];
    let tmpEnclosedCoords: [number, number][] = [];

    for (let i = 0; i < lines.length; i++) {
        for (let j = 0; j < lines[i].length; j++) {
            if (lines[i][j] === ".") {
                dotsCoords.push([i, j]);
            }
        }
    }

    console.log(`${dotsCoords.length} total dots`);

    /*
    TODO : feel free to debug/complete if you want
    do {
        // For each dot, find out if he can touch a line edge. If he can, he's not enclosed.
        for (const coords of dotsCoords) {
            if (isEnclosed(lines, coords, dotsCoords)) {
                tmpEnclosedCoords.push(coords);
            }
        }

        console.log(tmpEnclosedCoords.length, dotsCoords.length)

        dotsCoords = tmpEnclosedCoords;
        tmpEnclosedCoords = [];
    } while (tmpEnclosedCoords.length !== dotsCoords.length)*/

    printLines(lines, tmpEnclosedCoords);

    return tmpEnclosedCoords.length;
}

console.time("exec")
console.log(`Result is ${solvePartTwo(input)}`);
console.timeEnd("exec")