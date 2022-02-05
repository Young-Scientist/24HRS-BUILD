"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEnvs = exports.getPackagedVars = void 0;
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
/**
 * Get data from package.json file
 * @param key The value name as it is in the package.json file
 */
function getPackagedVars(key = '') {
    // Import package.json
    const env_file = require('../../package.json');
    return Object(env_file);
}
exports.getPackagedVars = getPackagedVars;
/**
 * Get data from .env file
 * @param key The .env value to be fetched
 */
function getEnvs(key = '') {
    // Import env data
    const env_file = process.env.NODE_ENV === 'production' ? (0, fs_1.readFileSync)(path_1.default.join(__dirname, '..', '..', '.env')) : (0, fs_1.readFileSync)(path_1.default.join(__dirname, '..', '..', '.env.dev'));
    const env_vars = dotenv_1.default.parse(env_file);
    // Return requested key
    if (key) {
        Object.keys(Object(env_vars)).forEach((element, i) => {
            if (key === element) {
                return Object.values(Object(env_vars))[i];
            }
        });
    }
    else {
        return Object(env_vars);
    }
    ;
}
exports.getEnvs = getEnvs;
