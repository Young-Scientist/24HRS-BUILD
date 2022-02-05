import mongoose from 'mongoose'
import { BlogPost } from '../types'
import { Logger } from '../utils/logger'
import { v4 as uuid } from 'uuid'

/**
 * Creates a new blog and saves it to the database
 * @param post BlogPost object
 */
export function createNewBlog(post: BlogPost): void {
    Logger(`blog created!\nBlog slug => ${post.slug || uuid()}`, 'green');
}

/**
 * 
 * @returns Array of all blogs
 */
export function fetchBlogs(): BlogPost[] {
    // To-DO => connect to DB and fetch all blogs
    return [];
}


/**
 * Deletes a blog from the database
 * @param slug Blug slug
 */
export function deleteBlog(slug: string): void {
    // To-DO => connect to DB and delete blog
    Logger(`blog deleted!\nBlog slug => ${slug}`, 'green');
}