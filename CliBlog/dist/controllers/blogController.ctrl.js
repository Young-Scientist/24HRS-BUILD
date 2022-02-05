"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBlog = exports.fetchBlogs = exports.createNewBlog = void 0;
const logger_1 = require("../utils/logger");
const uuid_1 = require("uuid");
/**
 * Creates a new blog and saves it to the database
 * @param post BlogPost object
 */
function createNewBlog(post) {
    (0, logger_1.Logger)(`blog created!\nBlog slug => ${post.slug || (0, uuid_1.v4)()}`, 'green');
}
exports.createNewBlog = createNewBlog;
/**
 *
 * @returns Array of all blogs
 */
function fetchBlogs() {
    // To-DO => connect to DB and fetch all blogs
    return [];
}
exports.fetchBlogs = fetchBlogs;
/**
 * Deletes a blog from the database
 * @param slug Blug slug
 */
function deleteBlog(slug) {
    // To-DO => connect to DB and delete blog
    (0, logger_1.Logger)(`blog deleted!\nBlog slug => ${slug}`, 'green');
}
exports.deleteBlog = deleteBlog;
