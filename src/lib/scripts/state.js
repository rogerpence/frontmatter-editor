import { writable } from 'svelte/store';

/**
 * @type {WritableObjectStore} - The current frontmatter as a JSON object.
 */
export const frontmatter_as_json_object = writable({});

/**
 * @type {WritableStringStore} - The current frontmatter as a string.
 */
export const fm_current = writable('');
