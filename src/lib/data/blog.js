export const blog_def = [
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
];
