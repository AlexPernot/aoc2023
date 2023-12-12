import {readFileSync} from "node:fs";

const input = readFileSync("input.txt").toString();

type Cell = { y: number, x: number, dist: number };

const partTwoNewLineExpansionFactor = 1000000;

const sumGalaxiesPaths = (map: string[][], from: [number, number], toFind: [number, number][], emptyLines: boolean[] = [], emptyCols: boolean[] = []) => {
    let sum = 0;
    const visited: boolean[][] = Array.from(new Array(map.length), () => new Array(map[0].length).fill(false));
    const queue: Cell[] = [];
    const [y, x] = from;

    queue.push({y, x, dist: 0});
    visited[y][x] = true;

    while (queue.length > 0) {
        const c = queue[0];
        queue.shift();
        let newDist = c.dist + 1;

        // process cell
        for (const galaxy of toFind) {
            if (c.y === galaxy[0] && c.x === galaxy[1]) {
                sum += c.dist;
            }
        }

        // look north
        if (c.y - 1 >= 0 && visited[c.y - 1][c.x] === false) {
            newDist = emptyLines[c.y - 1] ? c.dist + partTwoNewLineExpansionFactor : c.dist + 1;
            queue.push({y: c.y - 1, x: c.x, dist: newDist});
            visited[c.y - 1][c.x] = true;
        }

        // look east
        if (c.x + 1 < map[c.y].length && visited[c.y][c.x + 1] === false) {
            newDist = emptyCols[c.x + 1] ? c.dist + partTwoNewLineExpansionFactor : c.dist + 1;
            queue.push({y: c.y, x: c.x + 1, dist: newDist});
            visited[c.y][c.x + 1] = true;
        }

        // look south
        if (c.y + 1 < map.length && visited[c.y + 1][c.x] === false) {
            newDist = emptyLines[c.y + 1] ? c.dist + partTwoNewLineExpansionFactor : c.dist + 1;
            queue.push({y: c.y + 1, x: c.x, dist: newDist});
            visited[c.y + 1][c.x] = true;
        }

        // look west
        if (c.x - 1 >= 0 && visited[c.y][c.x - 1] === false) {
            newDist = emptyCols[c.x - 1] ? c.dist + partTwoNewLineExpansionFactor : c.dist + 1;
            queue.push({y: c.y, x: c.x - 1, dist: newDist});
            visited[c.y][c.x - 1] = true;
        }
    }

    return sum;
}

const solvePartOne = (input: string) => {
    let sum = 0;
    let map = input.split("\n").map(v => v.split(""));
    const emptyCols = new Array(map[0].length).fill(true);
    const galaxies: [number, number][] = [];

    for (let i = 0; i < map.length; i++) {
        let isRowEmpty = true;

        for (let j = 0; j < map[i].length; j++) {
            if (map[i][j] === "#") {
                isRowEmpty = false;
                emptyCols[j] = false;
            }
        }

        // add empty row
        if (isRowEmpty) {
            const newLine = [];
            for (let k = 0; k < map[i].length; k++) {
                newLine.push(".");
            }

            map.splice(i, 0, newLine);
            i++;
        }
    }

    // add empty cols
    for (let j = 0; j < emptyCols.length; j++) {
        if (emptyCols[j] === true) {

            for (let i = 0; i < map.length; i++) {
                map[i].splice(j, 0, ".");
            }
            emptyCols.splice(j, 0, false);
            j++;
        }
    }

    // scan galaxies
    for (let i = 0; i < map.length; i++) {
        for (let j = 0; j < map[i].length; j++) {
            if (map[i][j] === "#") {
                galaxies.push([i, j]);
            }
        }
    }

    for (let i = 0; i < galaxies.length - 1; i++) {
        const toFind = [];

        for (let j = i + 1; j < galaxies.length; j++) {
            toFind.push(galaxies[j]);
        }

        const length = sumGalaxiesPaths(map, galaxies[i], toFind);
        sum += length;
    }

    return sum;
}

const solvePartTwo = (input: string) => {
    let sum = 0;
    let map = input.split("\n").map(v => v.split(""));
    const emptyLines = new Array(map.length).fill(true);
    const emptyCols = new Array(map[0].length).fill(true);
    const galaxies: [number, number][] = [];

    for (let i = 0; i < map.length; i++) {
        for (let j = 0; j < map[i].length; j++) {
            if (map[i][j] === "#") {
                emptyLines[i] = false;
                emptyCols[j] = false;
            }
        }
    }

    // scan galaxies
    for (let i = 0; i < map.length; i++) {
        for (let j = 0; j < map[i].length; j++) {
            if (map[i][j] === "#") {
                galaxies.push([i, j]);
            }
        }
    }

    for (let i = 0; i < galaxies.length - 1; i++) {
        const toFind = [];

        for (let j = i + 1; j < galaxies.length; j++) {
            toFind.push(galaxies[j]);
        }

        const length = sumGalaxiesPaths(map, galaxies[i], toFind, emptyLines, emptyCols);
        sum += length;
    }

    return sum;
}

console.time("exec")
console.log(`Result is ${solvePartTwo(input)}`);
console.timeEnd("exec")