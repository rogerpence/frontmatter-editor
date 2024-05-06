<script>
    // @ts-nocheck 

    import { frontmatter, frontmatter_name } from '$scripts/state.js';
    //import {get_blog_data} from '$scripts/utilities.js'
	import { frontmatter_data } from "$data/blog.js";

    let frontmatter_def_name
	frontmatter_name.subscribe((value) => {
         frontmatter_def_name = value;
	});


    //let frontmatter_def_name = 'rp-blog'

    let blog_def = frontmatter_data.filter((fm) => fm.name == frontmatter_def_name)[0].frontmatter_def;
    //let blog_def = get_blog_data()

       
    import TextTag from "$components/TextTag.svelte"
    import TextAreaTag from "$components/TextAreaTag.svelte"
	import SelectMultiLineTag from "$components/SelectMultiLineTag.svelte";
    import DateTag from "$components/DateTag.svelte"
	import BooleanTag from "$components/BooleanTag.svelte";
	import RefreshFrontmatter from "$components/RefreshFrontmatter.svelte";

    //frontmatter.set(get_frontmatter_template());

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
