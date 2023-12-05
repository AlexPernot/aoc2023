import {readFileSync} from "node:fs";

const input = readFileSync("input.txt").toString();

type MapPart = { start: number, end: number, dest: number };

const fillMaps = (lines: string) => {
    const maps: Record<string, MapPart[]> = {};
    let mapKey: string;

    for (const line of lines.split("\n")) {
        if (line.match(/map:$/)) {
            mapKey = line.split(" ")[0];
        }

        if (line.match(/^\d+\s\d+\s\d+$/)) {
            if (!maps[mapKey]) {
                maps[mapKey] = [];
            }

            const [dest, start, length] = line.split(" ");

            maps[mapKey].push({
                start: parseInt(start),
                end: parseInt(start) + parseInt(length) - 1,
                dest: parseInt(dest)
            })
        }
    }

    return maps;
}

const solvePartOne = (input: string) => {
    let lowestLocation: number;
    const seeds: number[] = [];
    const maps: Record<string, MapPart[]> = fillMaps(input);

    for (const line of input.split("\n")) {
        if (line.match(/seeds:.*/)) {
            for (const part of line.split(" ")) {
                if (!isNaN(parseInt(part))) {
                    seeds.push(parseInt(part));
                }
            }
            break;
        }
    }

    for (const seed of seeds) {
        let prevStep = seed;

        for (const map of Object.values(maps)) {
            const mapPart = map.find((v) => (v.start <= prevStep && prevStep <= v.end));

            if (mapPart) {
                prevStep = mapPart.dest + (prevStep - mapPart.start);
            }
        }

        if (!lowestLocation || prevStep < lowestLocation) {
            lowestLocation = prevStep;
        }
    }

    return lowestLocation;
}

const solvePartTwo = (input: string) => {
    let lowestLocation: number;
    const seeds: number[] = [];
    const maps: Record<string, MapPart[]> = fillMaps(input);

    for (const line of input.split("\n")) {
        if (line.match(/seeds:.*/)) {
            for (const part of line.split(" ")) {
                if (!isNaN(parseInt(part))) {
                    seeds.push(parseInt(part));
                }
            }
            break;
        }
    }

    // this brute-force method gives a result in 8m on my machine
    // not great, not terrible
    for (let i = 0; i < seeds.length; i += 2) {
        const rangeStart = seeds[i];
        const rangeLength = seeds[i + 1];

        console.log("processing range from "+rangeStart)
        for (let j = rangeStart; j < rangeStart + rangeLength - 1; j++) {
            let prevStep = j;

            for (const map of Object.values(maps)) {
                const mapPart = map.find((v) => (v.start <= prevStep && prevStep <= v.end));

                if (mapPart) {
                    prevStep = mapPart.dest + (prevStep - mapPart.start);
                }
            }

            if (!lowestLocation || prevStep < lowestLocation) {
                lowestLocation = prevStep;
            }
        }
    }

    return lowestLocation;
}

console.log(`Result is ${solvePartTwo(input)}`);