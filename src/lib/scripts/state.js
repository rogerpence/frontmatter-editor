import { writable } from 'svelte/store';
import { get_frontmatter_template } from '$scripts/utilities.js';

const data_name = 'asna';

const post_template = get_frontmatter_template(data_name);

export const frontmatter = writable(post_template);
export const frontmatter_name = writable(data_name);
