// @ts-nocheck
import { browser } from '$app/environment';

import { frontmatter_json } from '$data/frontmatter-json.js';

export function format_date(date) {
	return new Date(date).toLocaleDateString('en-CA');
}

export function normalize(name) {
	return name.toLowerCase().replace(' ', '_');
}

export const copy_to_clipboard = async (str) => {
	if (!browser) return;

	if (navigator && navigator.clipboard && navigator.clipboard.writeText)
		return await navigator.clipboard.writeText(str);
	return Promise.reject('The Clipboard API is not available.');
};

export function get_frontmatter_json(frontmatter_def_name) {
	const fm_json = frontmatter_json[frontmatter_def_name]?.frontmatter;
	return fm_json;
}

export function get_frontmatter_template(fm_json) {
	const fields = [];
	fields.push(`---`);

	fm_json?.map((def) => {
		const field_name = normalize(def.label_text);
		fields.push(`${field_name}: \$${field_name}`);
	});

	fields.push(`---`);
	console.log(fields.join('\n').trimEnd());

	return fields.join('\n').trimEnd();
}

export function assign_defaults_to_fm(fm, fm_json) {
	fm_json.map((field) => {
		const fm_key = '$' + normalize(field.label_text);

		if (field.type == 'boolean') {
			fm = fm.replace(fm_key, field.value.toString());
		} else if (field.value == '*Today') {
			fm = fm.replace(fm_key, format_date(new Date()));
		} else if (field.value != '') {
			console.log(field.value);
			fm = fm.replace(fm_key, field.value);
		} else {
			fm = fm.replace(fm_key, '');
		}
	});

	return fm;
}

export function set_data_value_attr(id, value) {
	const element = document.querySelector(`#${id}`);
	//console.log(element);
	element.setAttribute('data_value', value);
}

export function refresh_frontmatter(id, fm_base, fm_json) {
	let template = fm_base;
	fm_json?.map((field) => {
		const id = `${normalize(field.label_text)}`;
		const element = document.querySelector(`#${id}`);
		const value = element.getAttribute('data_value');
		const replace_token = `\$${id}`;
		template = template.replace(replace_token, value);
	});

	return template;
}
