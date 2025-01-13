<script>
	import { page } from '$app/stores';
	import { frontmatter_as_string, frontmatter_as_json_object } from '$scripts/state.js';
	import { get_frontmatter_as_json, get_frontmatter_as_string, copy_to_clipboard, resolve_schema_tokens } from '$scripts/utilities';

	import BooleanTag from '$components/BooleanTag.svelte';
	import DateTag from '$components/DateTag.svelte';
	import SelectMultiLineTag from '$components/SelectMultiLineTag.svelte';
	import SelectSingleTag from '$components/SelectSingleTag.svelte';
	import TextAreaTag from '$components/TextAreaTag.svelte';
	import TextTag from '$components/TextTag.svelte';

	let newTag = '';
	let tagsSelect;

	function addNewTag() {
		if (newTag == '') return
		tagsSelect?.addTagsToSelect(newTag);
		newTag = '';
	}

	/** @type {string}  */
	const doc_name = $page.url.searchParams.get('docname') || 'rp-blog';

	/** @type {{tags:string[]}} */
	export let data;
	console.log(data);
	const { tags, message } = data; // The tags list for the doc_name. This array could be empty.

	/** @type {WritableObjectStore} */
	$frontmatter_as_json_object = get_frontmatter_as_json(doc_name);

	resolve_schema_tokens($frontmatter_as_json_object);

	/** @type {WritableStringStore}  */
	//$frontmatter_as_string = get_frontmatter_as_string($frontmatter_as_json_object)

	frontmatter_as_string.set(get_frontmatter_as_string($frontmatter_as_json_object));
</script>

<div class="form-wrapper">
	<div>
		{#if message.startsWith('ERROR')}
			<div style="color: red;">{message}</div>
		{/if}
		<h1>Frontmatter: {doc_name}</h1>
		<div>
			<a data-sveltekit-reload href="/?docname=rp-blog">rp blog</a>
			<a data-sveltekit-reload href="/?docname=asna">ASNA</a>
			<a data-sveltekit-reload href="/?docname=asnadocs">ASNA Docs</a>
		</div>
		<form id="form">
			{#each $frontmatter_as_json_object as field}
				{#if field.type == 'separator'}
					<hr />
				{/if}

				{#if field.type == 'text' && !field.multiline}
					<TextTag
						label={field.label_text}
						value={field.value}
						show_info={field.show_info}
						caption={field.caption}
					/>
				{/if}

				{#if field.type == 'text' && field.multiline}
					<TextAreaTag
						label={field.label_text}
						value={field.value}
						caption={field.caption}
						show_info={field.show_info}
					/>
				{/if}

				{#if field.type == 'list' && field.multiline}
					<SelectMultiLineTag label={field.label_text} 
							 bind:this={tagsSelect}
		 					 show_info={field.show_info} {tags} />
				{/if}

				{#if field.type == 'singleselect'}
					<!-- <pre>
                {JSON.stringify(field, null, 4)}
            </pre> -->
					<SelectSingleTag label={field.label_text} value={field.value} />
				{/if}

				{#if field.type == 'date'}
					<DateTag label={field.label_text} value={field.value} />
				{/if}

				{#if field.type == 'boolean'}
					<BooleanTag label={field.label_text} value={field.value} />
				{/if}
			{/each}
		</form>
	</div>

	<div class="frontmatter-preview">
		<div class="add-tag">
			<input type="text" placeholder="Add tag" bind:value={newTag}>
			<button on:click={addNewTag}>Add</button>
		</div>

		<div>
			<button on:click={copy_to_clipboard($frontmatter_as_string)}>Copy fontmatter to clipboard</button>
		</div>
		<code>
			<pre>{$frontmatter_as_string.trimEnd()}
            </pre>
		</code>
	</div>
</div>
