<script>
    // @ts-nocheck 
    import {onMount} from 'svelte'

    import {convert_to_field_name, replace_token_value, get_frontmatter_as_string, set_data_value_attr, copy_to_clipboard} from "$scripts/utilities.js"
    import { fm_name, fm_current, fm_json } from '$scripts/state.js';

    export let label
    export let value 
    
    const id = convert_to_field_name(label) 

    const checked = value ? "checked" : ""
    let current_value = value.toString()

    function change_event(e) {
        // value comes in as a Boolean true or false. It needs to be converted to a string.
        current_value = e.currentTarget.checked.toString()
        current_value = current_value === "true" ? "true" : "false"
        set_data_value_attr(id, current_value)
        replace_token_value($fm_json, label, current_value)
        $fm_current = get_frontmatter_as_string($fm_json)
    }
</script>

<div class="form-field">
    <label for={convert_to_field_name(label)}>{label}</label>
    <input data-is-field 
           type="checkbox" 
           checked={checked} 
           data_value={current_value}
           on:change={change_event}
           name={convert_to_field_name(label)} 
           id={convert_to_field_name(label)} />
</div>