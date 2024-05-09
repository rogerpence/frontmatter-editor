<script>
    // @ts-nocheck 
    import { browser } from '$app/environment';
    import { onMount } from 'svelte';
    import { page } from '$app/stores'
    import { fm_name, fm_base, fm_current, fm_json } from '$scripts/state.js';
    import {assign_defaults_to_fm, get_frontmatter_json, get_frontmatter_template, copy_to_clipboard, copy_to_clipboard_sync} from "$scripts/utilities"

    import TextTag from "$components/TextTag.svelte"
    import TextAreaTag  from "$components/TextAreaTag.svelte"
    import SelectMultiLineTag from '$components/SelectMultiLineTag.svelte';
    import DateTag from '$components/DateTag.svelte';
    import BooleanTag from '$components/BooleanTag.svelte';
	import SelectSingleTag from '$components/SelectSingleTag.svelte';

    const doc_name = $page.url.searchParams.get('docname') || 'rp-blog'

    $fm_name = doc_name

    $fm_json = get_frontmatter_json(doc_name)
    $fm_base = get_frontmatter_template($fm_json)
    $fm_current = assign_defaults_to_fm($fm_base, $fm_json) 

</script>

<div class="form-wrapper">

    <div>
        <h1>Frontmatter:  {doc_name}</h1>
        <div><a data-sveltekit-reload href="/?docname=rp-blog">rp blog</a>        <a data-sveltekit-reload href="/?docname=asna">ASNA</a></div>
        <form id="form">
        {#each $fm_json as field}
            {#if field.type == "text" && !field.multiline}
                <TextTag label={field.label_text} value={field.value} show_info={field.show_info} />
            {/if}

            {#if field.type == "text" && field.multiline}
            <TextAreaTag label={field.label_text} value={field.value} caption={field.caption} show_info={field.show_info}/>
            {/if}            

            {#if field.type == "list" && field.multiline}
            <SelectMultiLineTag label={field.label_text} show_info={field.show_info} />
            {/if}

            {#if field.type == "singleselect" }
            <pre>
                {JSON.stringify(field, null, 4)}
            </pre>
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
        <div><button on:click={copy_to_clipboard($fm_current)}>Copy to clipboard</button></div>
        <code>
            <pre>{$fm_current.trimEnd()}
            </pre>
        </code>
        <!-- <div>
            <code>
                <pre>
                    {$fm_base}
                </pre>
            </code>    
        </div>

        <div>
            <code>
                <pre>
                    {JSON.stringify($fm_json, null, 4)}
                </pre>
            </code>    
        </div> -->
    </div>
</div>


