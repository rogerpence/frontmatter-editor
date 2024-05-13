// @ts-nocheck

import { tags_list } from '$data/tag_object';

export const load = async ({ url, fetch }) => {
	const doc_name = url.searchParams.get('docname') || 'rp-blog';

	let tags;

	// If url is defined, fetch the tags from the url, otherwise use the tags from the tags_list.
	const fetch_url = tags_list?.[doc_name]['url'];
	if (fetch_url) {
		const response = await fetch(fetch_url);
		tags = await response.json();
	} else {
		tags = tags_list?.[doc_name]['tags'];
	}

	return {
		tags
	};
};
