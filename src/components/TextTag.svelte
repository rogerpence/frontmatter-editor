<script>

    // @ts-nocheck    
    import {onMount} from 'svelte'

    import {normalize, refresh_frontmatter, set_data_value_attr, copy_to_clipboard} from "$scripts/utilities.js"
    import { fm_name, fm_base, fm_current, fm_json } from '$scripts/state.js';

    export let label
    export let show_info = false
    export let value = ""

    const id = normalize(label)
	const counter_id = id + '_counter';

    let char_count = 0 

    async function show_chars(e) {        
        char_count = e.currentTarget.value.length
        set_data_value_attr(id, e.currentTarget.value)
        $fm_current = refresh_frontmatter(id, $fm_base, $fm_json) 
        //await copy_to_clipboard($fm_current);
    }
    
    onMount(() => {
        // This ensures default values are present.
        set_data_value_attr(id, value) 
    })
    // on:blur={show_chars} -->


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
    placeholder=""/>
    {#if show_info}
    <p class="counter"><span id={counter_id}>Character count {char_count}</span></p>    
    {/if}
</div>
