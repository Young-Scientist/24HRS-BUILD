"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
const chalk_1 = __importDefault(require("chalk"));
/**
 * Displays bold colorful message on the console
 * @param text Text to be logged
 * @param color Yellow, Red, or Green
 * @returns true
 */
function Logger(text, color = 'yellow') {
    const obj = {
        yellow: chalk_1.default.yellow.bold,
        red: chalk_1.default.red.bold,
        green: chalk_1.default.green.bold,
    };
    console.log(Object(obj)[color](text));
    return true;
}
exports.Logger = Logger;
