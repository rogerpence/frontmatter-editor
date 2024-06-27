<script>
    // @ts-nocheck 
    import {onMount} from 'svelte'

    import {format_date, replace_token_value, get_initial_frontmatter, normalize, refresh_frontmatter, set_data_value_attr, copy_to_clipboard} from "$scripts/utilities.js"
    import { fm_name, fm_base, fm_current, fm_json } from '$scripts/state.js';

    export let label
    export let value

    let current_value = ''
        
    const id = normalize(label) 
        
    async function keyup_event(e) {
        current_value = e.currentTarget.value  
        console.log('keyup in DateTag component', current_value) 

        console.log(current_value)        

        set_data_value_attr(id, e.currentTarget.value)

        replace_token_value($fm_json, label, e.currentTarget.value)
        $fm_current = get_initial_frontmatter($fm_json)
    }

</script>

<div class="form-field">
    <label for={normalize(label)}>{label}</label>
    <input data-is-field type="datetime-local" 
        on:change={keyup_event}
        name={normalize(label)} 
        data_value={current_value}
        id={normalize(label)} 
        placeholder="Date added"
        value={value} />
</div>