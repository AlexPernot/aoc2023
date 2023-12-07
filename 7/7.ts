import {readFileSync} from "node:fs";

const input = readFileSync("input.txt").toString();

type CardType = "high" | "one-pair" | "two-pairs" | "three" | "full" | "four" | "five";

const getCardTypePartOne = (hand: string): CardType => {
    const counting: Record<string, number> = {};

    for (const char of hand) {
        if (!counting[char]) {
            counting[char] = 0
        }

        counting[char]++;
    }

    const countingValues = Object.values(counting);

    if (countingValues.includes(5)) {
        return "five";
    }
    if (countingValues.includes(4)) {
        return "four";
    }
    if (countingValues.includes(3) && countingValues.includes(2)) {
        return "full";
    }
    if (countingValues.includes(3)) {
        return "three";
    }
    if (countingValues.filter(v => v === 2).length === 2) {
        return "two-pairs";
    }
    if (countingValues.includes(2)) {
        return "one-pair";
    }

    return "high";
}

const sortHandsPartOne = (hands: [string, number][]): [string, number][] => {
    const cardStrength = {2: 1, 3: 2, 4: 3, 5: 4, 6: 5, 7: 6, 8: 7, 9: 8, "T": 9, "J": 10, "Q": 11, "K": 12, "A": 13};

    return hands.sort((a, b) => {
        for (let i = 0; i < 5; i++) {
            if (cardStrength[a[0][i]] < cardStrength[b[0][i]]) {
                return -1;
            }

            if (cardStrength[a[0][i]] > cardStrength[b[0][i]]) {
                return 1;
            }
        }
        return 0;
    })
}

const getCardTypePartTwo = (hand: string): CardType => {
    const counting: Record<string, number> = {"J": 0};

    for (const char of hand) {
        if (!counting[char]) {
            counting[char] = 0
        }

        counting[char]++;
    }

    const countingWithJoker: Record<string, number> = {"J": counting["J"]};

    for (const k of Object.keys(counting)) {
        if (k !== "J") {
            countingWithJoker[k] = Math.min(counting[k] + counting["J"], 5);
        }
    }

    const countingWithJokerValues = Object.values(countingWithJoker);

    if (countingWithJokerValues.includes(5)) {
        return "five";
    }
    if (countingWithJokerValues.includes(4)) {
        return "four";
    }

    for (const k of Object.keys(countingWithJoker)) {
        if (countingWithJoker[k] === 3) {
            for (const l of Object.keys(counting)) {
                /*
                 Edge case: if there's a three-of-a-kind thanks to jokers,
                  the matching pair can't be a pair of jokers.
                 */
                if (counting[l] === 2 && l !== k && l !== "J") {
                    return "full";
                }
            }
        }
    }

    if (countingWithJokerValues.includes(3)) {
        return "three";
    }
    if (countingWithJokerValues.filter(v => v === 2).length === 2) {
        return "two-pairs";
    }
    if (countingWithJokerValues.includes(2)) {
        return "one-pair";
    }

    return "high";
}

const sortHandsPartTwo = (hands: [string, number][]): [string, number][] => {
    const cardStrength = {2: 1, 3: 2, 4: 3, 5: 4, 6: 5, 7: 6, 8: 7, 9: 8, "T": 9, "J": 0, "Q": 11, "K": 12, "A": 13};

    return hands.sort((a, b) => {
        for (let i = 0; i < 5; i++) {
            if (cardStrength[a[0][i]] < cardStrength[b[0][i]]) {
                return -1;
            }

            if (cardStrength[a[0][i]] > cardStrength[b[0][i]]) {
                return 1;
            }
        }
        return 0;
    })
}

const solvePartOne = (input: string) => {
    const rankings: Record<CardType, [string, number][]> = {
        high: [],
        "one-pair": [],
        "two-pairs": [],
        three: [],
        full: [],
        four: [],
        five: []
    };
    let rank = 1;
    let result = 0;

    for (const line of input.split("\n")) {
        const [hand, bid] = line.split(" ");
        rankings[getCardTypePartOne(hand)].push([hand, +bid]);
    }

    for (const v of Object.values(rankings)) {
        const sorted = sortHandsPartOne(v);

        for (const [hand, bid] of sorted) {
            result += bid * rank;
            rank++;
        }
    }

    return result;
}

const solvePartTwo = (input: string) => {
    const rankings: Record<CardType, [string, number][]> = {
        high: [],
        "one-pair": [],
        "two-pairs": [],
        three: [],
        full: [],
        four: [],
        five: []
    };
    let rank = 1;
    let result = 0;

    for (const line of input.split("\n")) {
        const [hand, bid] = line.split(" ");
        rankings[getCardTypePartTwo(hand)].push([hand, +bid]);
    }

    for (const v of Object.values(rankings)) {
        const sorted = sortHandsPartTwo(v);

        for (const [hand, bid] of sorted) {
            result += bid * rank;
            rank++;
        }
    }

    return result;
}

console.log(`Result is ${solvePartTwo(input)}`);