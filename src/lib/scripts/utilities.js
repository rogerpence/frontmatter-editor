// @ts-nocheck

import { browser } from '$app/environment';

//import { frontmatter_def } from '$data/blog.js';
import { frontmatter } from '$scripts/state.js';
import { frontmatter_data } from '$data/blog.js';

export function get_blog_data(frontmatter_def_name) {
	const blog_def = frontmatter_data[frontmatter_def_name]?.frontmatter;
	return blog_def;
}

export function formatDate(date) {
	return new Date(date).toLocaleDateString('en-CA');
}

export const copy_to_clipboard = async (str) => {
	if (navigator && navigator.clipboard && navigator.clipboard.writeText)
		return await navigator.clipboard.writeText(str);
	return Promise.reject('The Clipboard API is not available.');
};

export function normalize(name) {
	return name.toLowerCase().replace(' ', '_');
}

export function set_data_value_attr(id, value) {
	const element = document.querySelector(`#${id}`);
	element.setAttribute('data_value', value);
}

export function get_frontmatter_template(frontmatter_def_name) {
	const fields = [];
	fields.push(`---`);

	const blog_def = get_blog_data(frontmatter_def_name) || null;

	blog_def?.map((def) => {
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

export async function set_frontmatter(frontmatter_def_name) {
	//let template = post_template;
	let template = get_frontmatter_template(frontmatter_def_name);

	const blog_def = get_blog_data(frontmatter_def_name);

	blog_def?.map((def) => {
		const id = `${normalize(def.label_text)}`;
		const element = document.querySelector(`#${id}`);
		const value = element.getAttribute('data_value');
		const replace_token = `\$${id}`;

		template = template.replace(replace_token, value);

		frontmatter.set(template);
	});

	try {
		if (browser) await copy_to_clipboard(template);
	} catch {}

	return template;
}
