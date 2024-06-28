// @ts-nocheck
import { browser } from '$app/environment';

import { frontmatter_json } from '$data/frontmatter-json.js';

export function format_date(date) {
	return new Date(date).toLocaleDateString('en-CA');
}

export function normalize(name) {
	if (name) return name.toLowerCase().replace(' ', '_');
}

export const copy_to_clipboard_sync = (str) => {
	if (!browser) return;

	if (navigator && navigator.clipboard && navigator.clipboard.writeText)
		return navigator.clipboard.writeText(str);
	return Promise.reject('The Clipboard API is not available.');
};

export const copy_to_clipboard = async (str) => {
	if (!browser) return;

	if (navigator && navigator.clipboard && navigator.clipboard.writeText)
		return await navigator.clipboard.writeText(str);
	return Promise.reject('The Clipboard API is not available.');
};

/**
 *
 *
 * @param {string} frontmatter_def_name - The key of the frontmatter definition in frontmatter-json.js.
 * @returns {any} Frontmatter Json object
 */
export function get_frontmatter_json(frontmatter_def_name) {
	const fm_json = frontmatter_json[frontmatter_def_name]?.frontmatter;
	return fm_json;
}

/**
 *
 * @param {Any[]} fm_json
 * @returns {string} Frontmatter string
 */
export function get_initial_frontmatter(fm_json) {
	const fields = [];
	fields.push(`---`);

	fm_json?.map((field) => {
		if (field.type != 'separator') {
			const field_name = normalize(field.label_text);
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

export function assign_defaults_to_fm(fm, fm_json) {
	fm_json.map((field) => {
		const fm_key = '$' + normalize(field.label_text);

		if (field.type == 'boolean') {
			fm = fm.replace(fm_key, field.value.toString());
		} else if (field.type == 'text') {
			//
		} else if (field.type == 'separator') {
		} else if (field.type == 'singleselect') {
			const first_value = field.value.split('|')[0].trim();
			fm = fm.replace(fm_key, first_value);
		} else if (field.type == 'date' && field.value == '*Today') {
			//
			//fm = fm.replace(fm_key, now.toISOString().slice(0, 16));
			fm = fm.replace(fm_key, field.value);
		} else if (field.value != '') {
			fm = fm.replace(fm_key, field.value);
		} else {
			fm = fm.replace(fm_key, '');
		}
	});

	return fm;
}

export function set_data_value_attr(id, value) {
	const element = document.querySelector(`#${id}`);
	element.setAttribute('data_value', value);
}

export function replace_token_value(json, key, value) {
	for (const f of json) {
		//console.log(f);
		if (f.label_text == key) {
			f.value = value;
		}
	}
}
