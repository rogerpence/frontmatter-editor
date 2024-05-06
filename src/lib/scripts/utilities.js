// @ts-nocheck

//import { frontmatter_def } from '$data/blog.js';
import { frontmatter } from '$scripts/state.js';
import { frontmatter_data } from '$data/blog.js';

// export function get_blog_data(frontmatter_def_name) {
// 	const blog_def = frontmatter_def.filter((fm) => fm.name == frontmatter_def_name)[0];
// }

export function get_blog_def() {
	const frontmatter_def_name = 'rp-blog';
	let blog_def = frontmatter_data.filter((fm) => fm.name == frontmatter_def_name)[0]
		.frontmatter_def;

	return blog_def;
}

export function formatDate(date) {
	return new Date(date).toLocaleDateString('en-CA');
}

const copy_to_clipboard = (str) => {
	if (navigator && navigator.clipboard && navigator.clipboard.writeText)
		return navigator.clipboard.writeText(str);
	return Promise.reject('The Clipboard API is not available.');
};

export function normalize(name) {
	return name.toLowerCase().replace(' ', '_');
}

export function set_data_value_attr(id, value) {
	const element = document.querySelector(`#${id}`);
	element.setAttribute('data_value', value);
}

export function get_frontmatter_template() {
	const fields = [];
	fields.push(`---`);

	const blog_def = get_blog_def();

	blog_def.map((def) => {
		const field_name = normalize(def.label_text);
		fields.push(`${field_name}: \$${field_name}`);
	});

	fields.push(`---`);

	return fields.join('\n');
}

//const post_template = get_frontmatter_template();

// // //prettier-ignore
let post_template = `---
layout: $layout
title: $title
description: $description
tags: $tags
date_added: $date_added
date_updated: $date_updated
date_published: $date_published
pinned: $pinned
---`;

export function set_frontmatter() {
	//let template = post_template;
	let template = get_frontmatter_template();

	const blog_def = get_blog_def();

	blog_def.map((def) => {
		const id = `${normalize(def.label_text)}`;
		const element = document.querySelector(`#${id}`);
		const value = element.getAttribute('data_value');
		const replace_token = `\$${id}`;

		template = template.replace(replace_token, value);

		frontmatter.set(template);
	});

	copy_to_clipboard(template);

	return template;
}
