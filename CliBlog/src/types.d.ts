

/**
 * BlogPost interface
 */

import { SelectionRange } from "typescript";

interface BlogPost {
    slug: string;
    authorName: string;
    authorLink: string;
    title: string;
    coverImageUrl: string;
    body: string
}