// @ts-nocheck

import { tags_list } from '$data/tag_object';

export const load = async ({ url, fetch }) => {
	/** @type {string[]} */
	let tags;

	const doc_name = url.searchParams.get('docname') || 'rp-blog';
	let message = 'no message'
	
	try {
		// If doc_name is not in tags_list or if it is but with no 'url' key, return an empty array.
		if (tags_list[doc_name] === undefined || tags_list[doc_name]['url'] === undefined) {
			message = `Tags for ${doc_name} not available`;
			tags = [];
		} else {
			// If url is defined, fetch the tags from the url, otherwise use the tags from the tags_list.
			const fetch_url = tags_list?.[doc_name]['url'];
			message = `Tags for ${doc_name} presented`;
			if (fetch_url) {
				const response = await fetch(fetch_url);
				tags = await response.json();
			} else {
				message  = `Fetch for tags for ${doc_name} failed`;
				console.log('failed');
				tags = [];
			}
		}
	}
	catch (error) {		
		console.error(error);
		message = `ERROR: Fetch for tags for ${doc_name} failed`;
		tags = [];
	}		

	return {
		tags,
		message	
	};
};
