#!/usr/bin/env node

import { Logger } from "./utils/logger";
// import terminalLink from 'terminal-link'

import * as yargs from "yargs";
import readline from "node:readline";
import { v4 as uuid } from "uuid";
import { BlogPost } from "./types";
import { createNewBlog, fetchBlogs, deleteBlog } from './controllers/blogController.ctrl'

 const inputReader = readline.createInterface({
   input: process.stdin,
   output: process.stdout,
 });

/**
 * 
 * @param question cli question
 * @param rl readline object
 * @returns input as promise
 */
function question(question: string, rl: readline.Interface = inputReader): Promise<string> {
  return new Promise((resolve) =>
    rl.question(question, (inp: string) => resolve(inp))
  );
}

/**
 * Converts a specified file to string
 * @param input 
 * @returns 
 */
async function parseFileInput(input: Promise<string>): Promise<string> {
  let content = '';
 
  const value = await input;

  if (value.split('.').pop() === 'txt') {
    try {
      content = require("fs").readFileSync(value, "utf8");
    } catch (err) {
      Logger(`unable to parse file: ${value}`, "red");
    }
  } else {
    content = value;
  }

  return new Promise((resolve) => resolve(content));
}

yargs
  .command({
    command: "new",
    describe: "create new blog",
    handler: async () => {
      const newBlog: BlogPost = {
        slug: uuid(),
        title: await question("Blog Title: "),
        coverImageUrl: await question("Cover Image Url: "),
        body: await parseFileInput(question("Blog Body: ")),
        authorName: await question("Author Name: "),
        authorLink: await question("Author Link: "),
      }
     
      createNewBlog(newBlog);
    },
  })

  yargs.command({
    command: "audit",
    describe: "audit blogs",
    handler: () => {
        Logger(`Auditing blogs...`, "yellow");
        Logger(`${fetchBlogs().length} blogs found!`, "green");
    }
  })

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
      Logger(`Deleting blog ${args.slug}`, "yellow");
      //   deleteBlog(args[0]);
    },
  });

  yargs.help();

  yargs.parse();