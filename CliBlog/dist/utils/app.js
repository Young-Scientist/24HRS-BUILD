"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startApp = exports.setStaticFolder = exports.setRoutes = void 0;
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const body_parser_1 = require("body-parser");
const cors_1 = __importDefault(require("cors"));
const appRoute = require('../routes/api/appRoutes');
const path_1 = __importDefault(require("path"));
const logger_1 = require("./logger");
// import terminalLink from 'terminal-link'
/**
 * Set up routes and 404
 */
function setRoutes() {
    app.use(express_1.default.json());
    app.use((0, body_parser_1.urlencoded)({ extended: true }));
    app.use((0, cors_1.default)());
    // Mount routes
    app.use('/', appRoute);
    // Handle 404
    app.use('*', (req, res) => {
        res.status(404).json({
            message: "404 | Not Found"
        });
    });
}
exports.setRoutes = setRoutes;
/**
 * Set static folder in compiled code
 */
function setStaticFolder() {
    // Set static files
    app.use(express_1.default.static(path_1.default.join(__dirname, '..', '..', 'dist', 'public')));
}
exports.setStaticFolder = setStaticFolder;
/**
 * Initiate application
 */
function startApp() {
    const PORT = process.env.PORT || 8000;
    // Set Greeting And Start App
    if (process.env.NODE_ENV === "production") {
        const greeting = "Application Started At PORT " + PORT + " in " + process.env.NODE_ENV + " Mode";
        // Start app
        app.listen(PORT, () => {
            (0, logger_1.Logger)(greeting, 'green');
        });
    }
    else {
        const greeting = "Application Started At PORT " + PORT + "\nApplication can be found at "; // + terminalLink(chalk.yellow.bold('http://localhost:' + PORT), 'http://localhost:' + PORT);
        // Start app
        app.listen(PORT, () => {
            (0, logger_1.Logger)(greeting, 'green');
        });
    }
    ;
}
exports.startApp = startApp;
