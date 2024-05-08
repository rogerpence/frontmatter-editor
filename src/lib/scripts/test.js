import { frontmatter_def } from '../data/frontmatter-json.js';
//import { normalize } from './utilities.js';

export function normalize(name) {
	return name.toLowerCase().replace(' ', '_');
}

let blog_def = frontmatter_def.filter((fm) => fm.name == 'rp-blog')[0].frontmatter_def;
//blog_def = blog_def[0].frontmatter_def;

//console.log('fm', blog_def);

const fields = [];

fields.push(`---`);

blog_def.map((def) => {
	const field_name = normalize(def.label_text);
	fields.push(`${field_name}: \$${field_name}`);
});

fields.push(`---`);

const str = fields.join('\n');

console.log(str);
