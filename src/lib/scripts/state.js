import { writable } from 'svelte/store';
//import { get_frontmatter_template } from '$scripts/utilities.js';

// const post_template = get_frontmatter_template(data_name);

export const frontmatter = writable('');
export const fm_name = writable('');
export const fm_json = writable('');

/**
 * @type {string} - The current frontmat as a string.
 */
export const fm_current = writable('');
