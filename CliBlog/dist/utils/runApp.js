"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.runApp = void 0;
const listr_1 = __importDefault(require("listr"));
const app_1 = require("./app");
const database_1 = require("./database");
/**
 * Runs all the tasks to start application
 * @returns true
 */
function runApp() {
    return __awaiter(this, void 0, void 0, function* () {
        // Set Tasks
        const tasks = new listr_1.default([
            {
                title: 'Starting Application...',
                task: () => {
                    return true;
                },
            },
            {
                title: 'Setting Up Routes...',
                task: () => (0, app_1.setRoutes)(),
            },
            {
                title: 'Setting Static Files...',
                task: () => (0, app_1.setStaticFolder)(),
            },
            {
                title: 'Connecting To Database...',
                task: () => (0, database_1.connectDB)(),
            },
            {
                title: 'Starting Application...',
                task: () => (0, app_1.startApp)(),
            },
        ]);
        yield tasks.run();
        return true;
    });
}
exports.runApp = runApp;
