<script>
    // @ts-nocheck 
    import {normalize, set_frontmatter} from "$scripts/utilities.js"

    export let label
    export let value 
    export let caption 
    export let show_info
    
    const id = normalize(label) 
    const counter_id = id + '_counter';

    let char_count = 0 
    let current_value = ''

    function show_chars(e) {        
        char_count = e.currentTarget.value.length        
        current_value = e.currentTarget.value

        const element = document.querySelector(`#${id}`)
        element.setAttribute('data_value', current_value) 

        set_frontmatter()                
    }


</script>

<div class="form-field">
    <label data-title="{caption}" 
           title="{caption}" 
           for={normalize(label)}>{label}</label>

    <textarea data-is-field 
        on:keyup={show_chars}
        on:blur={show_chars}
        required
        rows="6" 
        data_value={current_value}
        name={id} 
        id={id} 
        placeholder="{caption}">{value}</textarea>
        {#if show_info}
            <p class="counter"><span id={counter_id}>Character count {char_count}</span></p>    
        {/if}
</div>