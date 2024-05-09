// @ts-nocheck

export const frontmatter_json = {
	'rp-blog': {
		frontmatter: [
			{
				type: 'text',
				multiline: false,
				label_text: 'Layout',
				value: '$layouts/SingleBlogPost.astro',
				caption: '',
				show_info: false
			},
			{
				type: 'text',
				multiline: false,
				label_text: 'Title',
				value: '',
				caption: '50-60 characters',
				show_info: true
			},
			{
				type: 'text',
				multiline: true,
				label_text: 'Description',
				value: '',
				caption: '150-200 characters',
				show_info: true
			},
			{
				type: 'list',
				multiline: true,
				label_text: 'Tags',
				value: '',
				caption: '',
				show_info: true
			},
			{
				type: 'date',
				multiline: false,
				label_text: 'Date added',
				value: '*Today',
				caption: '',
				show_info: false
			},
			{
				type: 'date',
				multiline: false,
				label_text: 'Date updated',
				value: '*Today',
				caption: '',
				show_info: false
			},
			{
				type: 'date',
				multiline: false,
				label_text: 'Date published',
				value: '',
				caption: '',
				show_info: false
			},
			{
				type: 'boolean',
				multiline: false,
				label_text: 'Pinned',
				value: false,
				caption: '',
				show_info: false
			}
		]
	},
	asna: {
		frontmatter: [
			{
				type: 'text',
				multiline: false,
				label_text: 'Title',
				value: '',
				caption: '50-60 characters',
				show_info: true
			},
			{
				type: 'text',
				multiline: true,
				label_text: 'Description',
				value: '',
				caption: '150-200 characters',
				show_info: true
			},
			{
				type: 'boolean',
				multiline: false,
				label_text: 'Translated',
				value: false,
				caption: '',
				show_info: false
			},
			{
				type: 'list',
				multiline: true,
				label_text: 'Tags',
				value: '',
				caption: '',
				show_info: true
			},
			{
				type: 'date',
				multiline: false,
				label_text: 'Date added',
				value: '*Today',
				caption: '',
				show_info: false
			},
			{
				type: 'date',
				multiline: false,
				label_text: 'Date updated',
				value: '*Today',
				caption: '',
				show_info: false
			},
			{
				type: 'date',
				multiline: false,
				label_text: 'Date published',
				value: '',
				caption: '',
				show_info: false
			},
			{
				type: 'boolean',
				multiline: false,
				label_text: 'Draft',
				value: false,
				caption: '',
				show_info: false
			},
			{
				type: 'text',
				multiline: false,
				label_text: 'Type',
				value: 'default',
				caption: '',
				show_info: false
			},
			{
				type: 'text',
				multiline: false,
				label_text: 'Series',
				value: '',
				caption: '',
				show_info: false
			},
			{
				type: 'text',
				multiline: false,
				label_text: 'Abstract',
				value: '',
				caption: '',
				show_info: false
			},
			{
				type: 'text',
				multiline: false,
				label_text: 'Url',
				value: '',
				caption: '',
				show_info: false
			},
			{
				type: 'text',
				multiline: false,
				label_text: 'Image',
				value: '',
				caption: '',
				show_info: false
			}
		]
	},
	test: {
		frontmatter: [
			{
				type: 'text',
				multiline: false,
				label_text: 'Title',
				value: '',
				caption: '50-60 characters',
				show_info: true
			},
			{
				type: 'text',
				multiline: true,
				label_text: 'Description',
				value: '',
				caption: '150-200 characters',
				show_info: true
			},
			{
				type: 'singleselect',
				multiline: false,
				label_text: 'Group',
				value: 'crosby|stills|nash',
				caption: '',
				show_info: false
			}
		]
	}
};
