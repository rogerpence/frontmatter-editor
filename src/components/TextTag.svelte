<script lang="ts">
    // @ts-nocheck 
    
    import {normalize, set_data_value_attr, set_frontmatter} from "$scripts/utilities.js"
    import { onMount } from 'svelte';

    export let label
    export let show_info = false
    export let value = ""

    const id = normalize(label) 

	const counter_id = id + '_counter';

    let char_count = 0 
    let current_value = value

    
    function show_chars(e) {        
        char_count = e.currentTarget.value.length
        current_value = e.currentTarget.value
        
        set_data_value_attr(id, current_value) 
        set_frontmatter()            
    }
    
    onMount(() => {
        set_data_value_attr(id, current_value) 
        set_frontmatter()
    })

</script>

<div class="form-field">
    <label for={normalize(label)}>{label}</label>
    <input data-is-field required 
    on:keyup={show_chars}    
    on:blur={show_chars}
    {value}
    type="text" 
    name={normalize(label)} 
    id={normalize(label)} 
    data_value
    placeholder=""/>
    {#if show_info}
    <p class="counter"><span id={counter_id}>Character count {char_count}</span></p>    
    {/if}
</div>
