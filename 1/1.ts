import {readFileSync} from "node:fs";

const input = readFileSync("input.txt").toString();

const solvePartOne = (input: string) => {
    let sum = 0;

    for (const line of input.split("\n")) {
        let number = "";

        for (const char of line) {
            if (!isNaN(parseInt(char))) {
                number += char;
                break;
            }
        }

        for (let i = line.length; i >= 0; i--) {
            if (!isNaN(parseInt(line[i]))) {
                number += line[i];
                break;
            }
        }

        console.log(number);
        sum += parseInt(number);
    }

    return sum;
};

const solvePartTwoReplace = (input: string) => {
    input = input.replace(/twone/g, "21");
    input = input.replace(/sevenine/g, "79")
    input = input.replace(/oneight/g, "18")
    input = input.replace(/threeight/g, "38")
    input = input.replace(/nineight/g, "98")
    input = input.replace(/fiveight/g, "58")
    input = input.replace(/eighthree/g, "83")
    input = input.replace(/eightwo/g, "82")
    input = input.replace(/one/g, "1")
    input = input.replace(/two/g, "2")
    input = input.replace(/three/g, "3")
    input = input.replace(/four/g, "4")
    input = input.replace(/five/g, "5")
    input = input.replace(/six/g, "6")
    input = input.replace(/seven/g, "7")
    input = input.replace(/eight/g, "8")
    input = input.replace(/nine/g, "9")

    let sum = 0;

    for (let line of input.split("\n")) {
        let numbers = "";

        for (const char of line) {
            if (!isNaN(parseInt(char))) {
                numbers += char;
            }
        }

        sum += parseInt(`${numbers[0]}${numbers[numbers.length - 1]}`);
    }

    return sum;
}

console.log(`Final sum is ${solvePartTwoReplace(input)}`);