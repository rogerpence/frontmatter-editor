export function formatDate(date) {
	return new Date(date).toLocaleDateString('en-CA');
}

export function normalize(name) {
	return name.toLowerCase().replace(' ', '_');
}
