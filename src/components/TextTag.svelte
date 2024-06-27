<script>

    // @ts-nocheck    
    import {onMount} from 'svelte'

    import {normalize, refresh_frontmatter, get_initial_frontmatter, set_data_value_attr, copy_to_clipboard, replace_token_value} from "$scripts/utilities.js"
    import { fm_name, fm_base, fm_current, fm_json } from '$scripts/state.js';

    export let label
    export let show_info = false
    export let caption = ""
    export let value = ""

    const id = normalize(label)
	const counter_id = id + '_counter';

    let char_count = 0 

    function show_chars(e) {        
        char_count = e.currentTarget.value.length
        set_data_value_attr(id, e.currentTarget.value)
        replace_token_value($fm_json, label, e.currentTarget.value)
        $fm_current = get_initial_frontmatter($fm_json)
    }
    
    onMount(() => {
        // This ensures default values are present.
        set_data_value_attr(id, value) 
    })

</script>

<div class="form-field">
    <label for={normalize(label)}>{label}</label>
    <input data-is-field required 
    on:keyup={show_chars}    
    {value}
    type="text" 
    name={normalize(label)} 
    id={normalize(label)} 
    data_value
    placeholder={caption}/>
    {#if show_info}
    <p class="counter"><span id={counter_id}>Character count {char_count} of {caption}</span></p>    
    {/if}
</div>
