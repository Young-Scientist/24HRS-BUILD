"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const morgan_1 = __importDefault(require("morgan"));
const rotating_file_stream_1 = require("rotating-file-stream");
const fs_1 = require("fs");
const logger_1 = require("./utils/logger");
const runApp_1 = require("./utils/runApp");
const app = (0, express_1.default)();
// Set Up Daily Logging
const accessDailyLogStream = (0, rotating_file_stream_1.createStream)("access.log", {
    interval: "1d",
    path: path_1.default.join(__dirname, "log"),
});
// Single Logging For Development
var accessDevLogStream = (0, fs_1.createWriteStream)(path_1.default.join(__dirname, "log", "dev", "access.log"), { flags: "a" });
// Using morgan to log
(0, logger_1.Logger)("Starting Logger...");
if (process.env.NODE_ENV === "production") {
    app.use((0, morgan_1.default)("combined", { stream: accessDailyLogStream }));
    (0, logger_1.Logger)("Now Writing Logs To log/access.log", "green");
}
else {
    app.use((0, morgan_1.default)("dev", { stream: accessDevLogStream }));
    (0, logger_1.Logger)("Now Writing Logs To log/dev/access.log", "green");
}
(0, runApp_1.runApp)();
