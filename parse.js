"use strict";
function parse(data) {
    let result = new Map;
    split(data, result, 1);
    return outputResult(result);
}
function split(data, result, value = 1.0) {
    if (isValidItem(data)) {
        result.set(data, value);
        return;
    }
    // split based on &
    let partsOnAnd = splitHelper1(data);
    if (partsOnAnd.length <= 1) {
        // split base on /
        let partsOnOr = splitHelper2(data);
        partsOnOr.forEach(part => {
            split(part, result, value / partsOnOr.length);
        });
    }
    else {
        partsOnAnd.forEach(part => {
            if (part.length == 1) {
                result.set(part, value);
            }
            else {
                split(part, result, value);
            }
        });
    }
    return;
}
// split based on &
// if no &, return data
function splitHelper1(data) {
    let result = [];
    let temp = "";
    let pair = 0;
    //for (const c of data)
    for (var x = 0; x < data.length; x++) {
        var c = data.charAt(x);
        if (c == "(") {
            if (pair != 0) {
                temp = temp + c;
            }
            pair++;
        }
        else if (c == ")") {
            pair--;
            if (pair != 0) {
                temp = temp + c;
            }
        }
        else if (c == "&") {
            if (pair === 0) {
                result.push(temp);
                temp = "";
            }
            else {
                temp = temp + c;
            }
        }
        else {
            temp = temp + c;
        }
    }
    if (temp !== "") {
        result.push(temp);
        temp = "";
    }
    return result;
}
// split based on  /
function splitHelper2(data) {
    let result = [];
    let temp = "";
    let pair = 0;
    //for (const c of data)
    for (var x = 0; x < data.length; x++) {
        var c = data.charAt(x);
        if (c == "(") {
            if (pair != 0) {
                temp = temp + c;
            }
            pair++;
        }
        else if (c == ")") {
            pair--;
            if (pair != 0) {
                temp = temp + c;
            }
        }
        else if (c == "/") {
            if (pair === 0) {
                result.push(temp);
                temp = "";
            }
            else {
                temp = temp + c;
            }
        }
        else {
            temp = temp + c;
        }
    }
    if (temp !== "") {
        result.push(temp);
        temp = "";
    }
    return result;
}
function isValidItem(data) {
    for (const c of data) {
        if (c == "&" || c == "/" || c == "(" || c == ")") {
            return false;
        }
    }
    return true;
}
function outputResult(result) {
    let output = "";
    result.forEach((value, key, map) => {
        output = output + `${key}: ${value}; `;
    });
    return output;
}


//const exampel = "D&E";
//const exampel2 = "((((AD1 xcv3&EE2 yt7)/F)&G&H)/I)&J";
//const exampel2 = "C/D";
// const exampel = "((B&C&D)/(E&F&G))&((J&K&L)/(M&N&O))&Q";
// let result = parse(exampel);
// console.log(result);

var fs = require("fs");
const { stdout } = require("process");
var readline = require("readline");

(async function processData() {
    try {
        var ws = fs.createWriteStream("output.txt");

        const rl = readline.createInterface({
            input: fs.createReadStream("input.txt"),
            output: stdout
        });

        rl.on('line', (line) => {
            const parseResult = parse(line);
            ws.write(parseResult + '\n');
        });

        rl.on('close', () => {
            ws.end();
        });
    } catch (err) {
        console.log(err);
    }
})();

