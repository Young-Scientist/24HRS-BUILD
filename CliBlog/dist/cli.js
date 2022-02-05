#!/usr/bin/env node
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const logger_1 = require("./utils/logger");
// import terminalLink from 'terminal-link'
const yargs = __importStar(require("yargs"));
const node_readline_1 = __importDefault(require("node:readline"));
const uuid_1 = require("uuid");
const blogController_ctrl_1 = require("./controllers/blogController.ctrl");
const inputReader = node_readline_1.default.createInterface({
    input: process.stdin,
    output: process.stdout,
});
/**
 *
 * @param question cli question
 * @param rl readline object
 * @returns input as promise
 */
function question(question, rl = inputReader) {
    return new Promise((resolve) => rl.question(question, (inp) => resolve(inp)));
}
/**
 * Converts a specified file to string
 * @param input
 * @returns
 */
function parseFileInput(input) {
    return __awaiter(this, void 0, void 0, function* () {
        let content = '';
        const value = yield input;
        if (value.split('.').pop() === 'txt') {
            try {
                content = require("fs").readFileSync(value, "utf8");
            }
            catch (err) {
                (0, logger_1.Logger)(`unable to parse file: ${value}`, "red");
            }
        }
        else {
            content = value;
        }
        return new Promise((resolve) => resolve(content));
    });
}
yargs
    .command({
    command: "new",
    describe: "create new blog",
    handler: () => __awaiter(void 0, void 0, void 0, function* () {
        const newBlog = {
            slug: (0, uuid_1.v4)(),
            title: yield question("Blog Title: "),
            coverImageUrl: yield question("Cover Image Url: "),
            body: yield parseFileInput(question("Blog Body: ")),
            authorName: yield question("Author Name: "),
            authorLink: yield question("Author Link: "),
        };
        (0, blogController_ctrl_1.createNewBlog)(newBlog);
    }),
});
yargs.command({
    command: "audit",
    describe: "audit blogs",
    handler: () => {
        (0, logger_1.Logger)(`Auditing blogs...`, "yellow");
        (0, logger_1.Logger)(`${(0, blogController_ctrl_1.fetchBlogs)().length} blogs found!`, "green");
    }
});
yargs.command({
    command: "delete",
    describe: "delete blog with slug",
    builder: {
        slug: {
            type: "string",
            demandOption: true,
            describe: "blog slug or id",
        }
    },
    handler: (args) => {
        (0, logger_1.Logger)(`Deleting blog ${args.slug}`, "yellow");
        //   deleteBlog(args[0]);
    },
});
yargs.help();
yargs.parse();
