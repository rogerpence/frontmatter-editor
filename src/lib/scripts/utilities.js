// @ts-nocheck

import { blog_def } from '$data/blog.js';

import { frontmatter } from '$scripts/state.js';

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

// //prettier-ignore
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
	let template = post_template;

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
