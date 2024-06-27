// @ts-nocheck

import { tags_list } from '$data/tag_object';

export const load = async ({ url, fetch }) => {
	let tags;

	const doc_name = url.searchParams.get('docname') || 'rp-blog';

	// If doc_name is not in tags_list or if it is but with no 'url' key, return an empty array.
	if (tags_list[doc_name] === undefined || tags_list[doc_name]['url'] === undefined) {
		tags = [];
	} else {
		// If url is defined, fetch the tags from the url, otherwise use the tags from the tags_list.
		const fetch_url = tags_list?.[doc_name]['url'];
		if (fetch_url) {
			const response = await fetch(fetch_url);
			tags = await response.json();
		} else {
			console.log('failed');
			tags = [];
			//tags = tags_list?.[doc_name]['tags'];
		}
	}

	return {
		tags
	};
};
