<script>
    // @ts-nocheck 

    import { frontmatter } from '$scripts/state.js';

	import { blog_def } from "$data/blog.js";
    import TextTag from "$components/TextTag.svelte"
    import TextAreaTag from "$components/TextAreaTag.svelte"
	import SelectMultiLineTag from "$components/SelectMultiLineTag.svelte";
    import DateTag from "$components/DateTag.svelte"
	import BooleanTag from "$components/BooleanTag.svelte";
	import RefreshFrontmatter from "$components/RefreshFrontmatter.svelte";

    let template
	frontmatter.subscribe((value) => {
	 	template = value;
	});
</script>



<div class="form-wrapper">
    <h1>Frontmatter: Blog Post</h1>

    <form  id="form">

    {#each blog_def as post}
        {#if post.type == "text" && ! post.multiline}    
            <TextTag label={post.label_text} value={post.value} show_info={post.show_info} />
        {/if}

        {#if post.type == "text" && post.multiline}    
        <TextAreaTag label={post.label_text} value={post.value} caption={post.caption} show_info={post.show_info}/>
        {/if}

        {#if post.type == "list" && post.multiline}    
        <SelectMultiLineTag label={post.label_text} value caption={post.caption} show_info={post.show_info}/>
        {/if}
        
        {#if post.type == "date" }    
        <DateTag label={post.label_text} value={post.value}/> 
        {/if}  
        
        {#if post.type == "boolean" }    
        <BooleanTag  label={post.label_text} value={post.value}/>
        {/if}      
        {/each}     

        <!-- <RefreshFrontmatter/> -->
    </form>

    <div>
        <pre>{template}</pre>
    </div>
</div>
