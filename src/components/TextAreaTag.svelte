<script>
    // @ts-nocheck 

    import {onMount} from 'svelte'

    import {convert_to_field_name,  get_frontmatter_as_string, set_data_value_attr, copy_to_clipboard, replace_token_value} from "$scripts/utilities.js"
    import { fm_current, frontmatter_as_json_object } from '$scripts/state.js';

    export let label
    export let value = ""
    export let caption 
    export let show_info
    
    const id = convert_to_field_name(label) 
    const counter_id = id + '_counter';

    let char_count = 0 
    let current_value = ''

    async function show_chars(e) {        
        char_count = e.currentTarget.value.length        
        set_data_value_attr(id, e.currentTarget.value)
        replace_token_value($frontmatter_as_json_object, label, e.currentTarget.value)
        $fm_current = get_frontmatter_as_string($frontmatter_as_json_object)
    }

    onMount(() => {
        // This ensures default values are present.
        set_data_value_attr(id, value) 
    })

    // on:keyup={show_chars}
    //     on:blur={show_chars}


</script>

<div class="form-field">
    <label data-title="{caption}" 
           title="{caption}" 
           for={convert_to_field_name(label)}>{label}</label>

    <textarea data-is-field 
        on:keyup={show_chars}
        required
        rows="6" 
        data_value={current_value}
        name={id} 
        id={id} 
        placeholder="{caption}">{value}</textarea>
        {#if show_info}
            <p class="counter"><span id={counter_id}>Character count {char_count} of {caption}</span></p>    
        {/if}
</div>