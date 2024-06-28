<script>
    // @ts-nocheck 
    import {onMount} from 'svelte'

    import {replace_token_value, get_frontmatter_as_string, convert_to_field_name, set_data_value_attr, copy_to_clipboard} from "$scripts/utilities.js"
    import { fm_current, frontmatter_as_json_object } from '$scripts/state.js';

    export let label
    export let value

    let current_value = ''
        
    const id = convert_to_field_name(label) 
        
    async function keyup_event(e) {
        current_value = e.currentTarget.value  
        set_data_value_attr(id, e.currentTarget.value)
        replace_token_value($frontmatter_as_json_object, label, e.currentTarget.value)
        $fm_current = get_frontmatter_as_string($frontmatter_as_json_object)
    }

</script>

<div class="form-field">
    <label for={convert_to_field_name(label)}>{label}</label>
    <input data-is-field type="datetime-local" 
        on:change={keyup_event}
        name={convert_to_field_name(label)} 
        data_value={current_value}
        id={convert_to_field_name(label)} 
        placeholder="Date added"
        value={value} />
</div>