// @ts-nocheck
import { browser } from '$app/environment';

import { frontmatter_json } from '$data/frontmatter-json.js';

/**
 * Format a JS data object to a yyyy-mm-dd string.
 *
 * @param {datetime} date
 * @returns {string} - A formatted yyyy-dd-mm date string.
 */
export function format_date(date) {
	return new Date(date).toLocaleDateString('en-CA');
}

/**
 * Translate a string value to a valid field name.
 * Swap a space for an underscore and convert to lowercase.
 *
 * @param {string} name
 * @returns {string}
 */
export function convert_to_field_name(name) {
	if (name) return name.toLowerCase().replace(/ /g, '_');
}

/**
 *
 * @param {string} str
 * @returns {void}
 */
export const copy_to_clipboard = async (str) => {
	if (!browser) return;

	if (navigator && navigator.clipboard && navigator.clipboard.writeText)
		return await navigator.clipboard.writeText(str);
	return Promise.reject('The Clipboard API is not available.');
};

/**
 * Get the specified frontmatter object from frontmatter-json.js.
 * Return the frontmatter object is available in the app with the fm_json store
 *
 * @param {string} frontmatter_key - The key of the frontmatter definition in frontmatter-json.js.
 * @returns {any} Frontmatter Json object
 */
export function get_frontmatter_as_json(frontmatter_key) {
	const fm_json = frontmatter_json[frontmatter_key]?.frontmatter;
	return fm_json;
}

/**
 * Convert the frontmatter json object to a frontmatter string.
 * The frontmatter string is a string representation of the frontmatter object.
 *
 * @param {any[]} fm_json
 * @returns {string} Frontmatter string
 */
export function get_frontmatter_as_string(fm_json) {
	const fields = [];
	fields.push(`---`);

	fm_json?.map((field) => {
		if (field.type != 'separator') {
			const field_name = convert_to_field_name(field.label_text);
			//console.log('value', field.value);
			if (field.type == 'text' && field.value != '') {
				fields.push(`${field_name}: "${field.value}"`);
			} else {
				fields.push(`${field_name}: ${field.value}`);
			}
		}
	});

	fields.push(`---`);

	return fields.join('\n').trimEnd();
}

export function set_data_value_attr(id, value) {
	const element = document.querySelector(`#${id}`);
	element.setAttribute('data_value', value);
}

export function replace_token_value(json, key, value) {
	for (const f of json) {
		if (f.label_text == key) {
			f.value = value;
		}
	}
}

/**
 * Resolve placeholder tokens in the frontmatter json object.
 * For example, replace *Today with the current date.
 *
 * @param {any} json
 * @returns {void}
 */
export function resolve_schema_tokens(json) {
	for (const f of json) {
		if (f.type == 'text') {
			//f.value = `${f.value}`
		} else if (f.value == '*Today') {
			f.value = new Date().toISOString().slice(0, 16);
		}
	}
}
