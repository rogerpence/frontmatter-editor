<script>
    // @ts-nocheck 
    import { browser } from '$app/environment';
    import { onMount } from 'svelte';
    import { page } from '$app/stores'
    import { frontmatter_as_string, frontmatter_as_json_object } from '$scripts/state.js';
    import { get_frontmatter_as_json, get_frontmatter_as_string, copy_to_clipboard, resolve_schema_tokens } from "$scripts/utilities"

    import TextTag from "$components/TextTag.svelte"
    import TextAreaTag  from "$components/TextAreaTag.svelte"
    import SelectMultiLineTag from '$components/SelectMultiLineTag.svelte';
    import DateTag from '$components/DateTag.svelte';
    import BooleanTag from '$components/BooleanTag.svelte';
	import SelectSingleTag from '$components/SelectSingleTag.svelte';

    /** @type {string}  */
    const doc_name = $page.url.searchParams.get('docname') || 'rp-blog'

    // Tags list for the doc_name is fetched from the load function in +page.js. 
    export let data
    const {tags} = data

    /*
     * Frontmatter schema is fetched from the frontmatter.json file in the root of the project.
     */
    $frontmatter_as_json_object = get_frontmatter_as_json(doc_name)

    resolve_schema_tokens($frontmatter_as_json_object)
   
    /**
     * Assign initial frontmatter values to frontmatter result.
     * @type {string}
     */
    $frontmatter_as_string = get_frontmatter_as_string($frontmatter_as_json_object)
</script>

<div class="form-wrapper">

    <div>
        <h1>Frontmatter:  {doc_name}</h1>
        <div>
            <a data-sveltekit-reload href="/?docname=rp-blog">rp blog</a> 
            <a data-sveltekit-reload href="/?docname=asna">ASNA</a> 
            <a data-sveltekit-reload href="/?docname=asnadocs">ASNA Docs</a> 
        </div>
        <form id="form">
        {#each $frontmatter_as_json_object as field}
            {#if field.type == "separator"}
            <hr>
            {/if}            

            {#if field.type == "text" && !field.multiline}
                <TextTag label={field.label_text} value={field.value} show_info={field.show_info} caption={field.caption}/>
            {/if}

            {#if field.type == "text" && field.multiline}
            <TextAreaTag label={field.label_text} value={field.value} caption={field.caption} show_info={field.show_info}/>
            {/if}            

            {#if field.type == "list" && field.multiline}
            <SelectMultiLineTag label={field.label_text} show_info={field.show_info} {tags}/>
            {/if}

            {#if field.type == "singleselect" }
            <!-- <pre>
                {JSON.stringify(field, null, 4)}
            </pre> -->
            <SelectSingleTag label={field.label_text} value={field.value}/>
            {/if}

            {#if field.type == "date" }
            <DateTag label={field.label_text} value={field.value}/>
            {/if}

            {#if field.type == "boolean" }
            <BooleanTag  label={field.label_text} value={field.value}/>
            {/if}


        {/each}

        </form>
    </div>

    <div class="frontmatter-preview">
        <div><button on:click={copy_to_clipboard($frontmatter_as_string)}>Copy to clipboard</button></div>
        <code>
            <pre>{$frontmatter_as_string.trimEnd()}
            </pre>
        </code>
    </div>
</div>


