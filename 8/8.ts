import {readFileSync} from "node:fs";

const input = readFileSync("input.txt").toString();

const solvePartOne = (input: string) => {
    let steps = 0;

    let instructions = input.split("\n")[0];
    const map: Record<string, [string, string]> = {};
    let position = "AAA";

    for (const line of input.split("\n")) {
        if (!line.includes("=")) {
            continue;
        }

        const [name, directions] = line.split(" = ");
        const [_, l, r] = directions.match(/\(([A-Z0-9]+), ([A-Z0-9]+)\)/);

        map[name] = [l, r];
    }

    do {
        for (let i = 0; i < instructions.length; i++) {
            steps++;

            if (instructions[i] === "L") {
                position = map[position][0];
            } else {
                position = map[position][1];
            }
        }
    } while (position !== "ZZZ");

    return steps;
};

const gcd = (a: number, b: number) => {
    if (a < 0) a = -a;
    if (b < 0) b = -b;
    if (b > a) {
        const temp = a;
        a = b;
        b = temp;
    }
    while (true) {
        a %= b;
        if (a == 0) return b;
        b %= a;
        if (b == 0) return a;
    }
};

const lcm = (a: number, b: number) => {
    return a * (b / gcd(a, b));
};

const solvePartTwo = (input: string) => {
    let steps = 0;

    let instructions = input.split("\n")[0];
    const map: Record<string, [string, string]> = {};
    const positions: string[] = [];

    for (const line of input.split("\n")) {
        if (!line.includes("=")) {
            continue;
        }

        const [name, directions] = line.split(" = ");
        const [_, l, r] = directions.match(/\(([A-Z0-9]+), ([A-Z0-9]+)\)/);

        map[name] = [l, r];

        if (name[2] === "A") {
            positions.push(name);
        }
    }


    const stepsThatEndWithZ = new Array(positions.length - 1);
    let continueLoop = true;

    /*
        What we want is the Least Common Multiple between the step number when
        positions[0] and positions[1] end with Z, and positions[0] and positions[2] end with Z
        and so on.
     */
    do {
        for (let i = 0; i < instructions.length; i++) {
            steps++;

            for (let j = 0; j < positions.length; j++) {
                if (instructions[i] === "L") {
                    positions[j] = map[positions[j]][0];
                } else {
                    positions[j] = map[positions[j]][1];
                }
            }
        }

        for (let i = 1; i < positions.length; i++) {
            if (positions[0][2] === "Z"
                && positions[i][2] === "Z"
                && stepsThatEndWithZ[i - 1] === undefined) {
                stepsThatEndWithZ[i - 1] = steps;
                console.log(`Step ${steps}, positions is ${positions.join()}`)
            }
        }

        // Stop criteria
        continueLoop = false;
        for (let j = 0; j < stepsThatEndWithZ.length; j++) {
            if (stepsThatEndWithZ[j] === undefined) {
                continueLoop = true;
                break;
            }
        }
    } while (continueLoop);

    console.log(stepsThatEndWithZ)

    return stepsThatEndWithZ.reduce(lcm);
};

console.time("exec")
console.log(`Result is ${solvePartTwo(input)}`);
console.timeEnd("exec")