<script>
    // @ts-nocheck 
    import {onMount} from 'svelte'

    import {normalize, replace_token_value, get_initial_frontmatter, refresh_frontmatter, set_data_value_attr, copy_to_clipboard} from "$scripts/utilities.js"
    import { fm_name, fm_base, fm_current, fm_json } from '$scripts/state.js';

    export let label
    export let value 
    
    const id = normalize(label) 

    const checked = value ? "checked" : ""
    let current_value = value.toString()

    async function change_event(e) {
        // value comes in as a Boolean true or false. It needs to be converted to a string.
        current_value = e.currentTarget.checked.toString()
        current_value = current_value === "true" ? "true" : "false"
        set_data_value_attr(id, current_value)
        replace_token_value($fm_json, label, current_value)
        $fm_current = get_initial_frontmatter($fm_json)
    }
</script>

<div class="form-field">
    <label for={normalize(label)}>{label}</label>
    <input data-is-field 
           type="checkbox" 
           checked={checked} 
           data_value={current_value}
           on:change={change_event}
           name={normalize(label)} 
           id={normalize(label)} />
</div>