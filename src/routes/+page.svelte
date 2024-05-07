<script>
    // @ts-nocheck 
    import { onMount } from 'svelte';

    import { page } from '$app/stores'
    const doc_name = $page.url.searchParams.get('docname')

    frontmatter_name.set(doc_name)

    import { frontmatter, frontmatter_name } from '$scripts/state.js';
    import {get_blog_data, set_frontmatter} from '$scripts/utilities.js'

    let frontmatter_def_name = $frontmatter_name


    let blog_def = get_blog_data(frontmatter_def_name)
       
    import TextTag from "$components/TextTag.svelte"
    import TextAreaTag from "$components/TextAreaTag.svelte"
	import SelectMultiLineTag from "$components/SelectMultiLineTag.svelte";
    import DateTag from "$components/DateTag.svelte"
	import BooleanTag from "$components/BooleanTag.svelte";

    let template

    onMount( () => {
        frontmatter.subscribe((value) => {
            template = value;
        });       

        set_frontmatter(frontmatter_def_name)
    })
</script>

<div class="form-wrapper">

    <div>
        <h1>Frontmatter: Blog Post</h1>
        <div><a data-sveltekit-reload href="/?docname=rp-blog">rp blog</a>        <a data-sveltekit-reload href="/?docname=asna">ASNA</a></div>
        <form  id="form">
        {#each blog_def as post}
            {#if post.type == "text" && ! post.multiline}
                <TextTag label={post.label_text} value={post.value} show_info={post.show_info} />
            {/if}

            {#if post.type == "text" && post.multiline}
            <TextAreaTag label={post.label_text} value={post.value} caption={post.caption} show_info={post.show_info}/>
            {/if}

            {#if post.type == "list" && post.multiline}
            <SelectMultiLineTag label={post.label_text} value caption={post.caption} show_info={post.show_info} doc_name={frontmatter_def_name}/>
            {/if}
        
            {#if post.type == "date" }
            <DateTag label={post.label_text} value={post.value}/>
            {/if}
        
            {#if post.type == "boolean" }
            <BooleanTag  label={post.label_text} value={post.value}/>
            {/if}

            {/each}
        </form>
    </div>

    <div class="frontmatter-preview">
        {#if template}
        <!-- <code class="frontmatter-wrapper"> -->
            <pre>{template}</pre>
        <!-- </code> -->
        {/if}
    </div>
</div>


