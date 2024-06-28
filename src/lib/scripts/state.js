import { writable } from 'svelte/store';

//export const fm_name = writable('');
export const frontmatter_as_json_object = writable('');

/**
 * @type {string} - The current frontmatter as a string.
 */
export const fm_current = writable('');
