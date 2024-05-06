import { writable } from 'svelte/store';
import { get_frontmatter_template } from '$scripts/utilities.js';

const post_template = get_frontmatter_template();

// const post_template = `---
// layout: $layout
// title: $title
// description: $description
// tags: $tags
// date_added: $date_added
// date_updated: $date_updated
// date_published: $date_published
// pinned: $pinned
// ---`;

const data_name = 'rp-blog';

export const frontmatter = writable(post_template);
export const frontmatter_name = writable(data_name);
