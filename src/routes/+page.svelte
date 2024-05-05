<script>
	import { blog_def } from "$data/blog.js";
    import TextTag from "$components/TextTag.svelte"
    import TextAreaTag from "$components/TextAreaTag.svelte"
	import SelectMultiLineTag from "$components/SelectMultiLineTag.svelte";
    import DateTag from "$components/DateTag.svelte"
	import BooleanTag from "$components/BooleanTag.svelte";

</script>

<h1>Welcome to SvelteKit</h1>

<div class="form-wrapper">


    <form  id="form">

    {#each blog_def as post}
        {#if post.type == "text" && ! post.multiline}    
            <TextTag label={post.label_text} value={post.value}/>
        {/if}

        {#if post.type == "text" && post.multiline}    
        <TextAreaTag label={post.label_text} value={post.value} caption={post.caption} />
        {/if}

        {#if post.type == "list" && post.multiline}    
        <SelectMultiLineTag label={post.label_text} value caption={post.caption}/>
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
