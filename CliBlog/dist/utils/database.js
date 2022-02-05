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
exports.connectDB = void 0;
const logger_1 = require("./logger");
const mongoose_1 = __importDefault(require("mongoose"));
const appVars_1 = require("./appVars");
/**
 * Starts the application database and connects to it
 * @returns true
 */
function connectDB() {
    return __awaiter(this, void 0, void 0, function* () {
        (0, logger_1.Logger)("Connecting To Database...");
        try {
            const conn = yield mongoose_1.default.connect((0, appVars_1.getEnvs)().DB_URI, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useFindAndModify: false,
            });
            (0, logger_1.Logger)(`MongoDB Connected: ${conn.connection.host}`, 'green');
        }
        catch (err) {
            // console.error(err);
            (0, logger_1.Logger)("Unable To Connect To MongoDB", 'red');
            process.exit(1);
        }
        ;
        return true;
    });
}
exports.connectDB = connectDB;
