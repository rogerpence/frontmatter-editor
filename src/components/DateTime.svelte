<script>
    // @ts-nocheck 
    import {onMount} from 'svelte'

    import {format_date, normalize, refresh_frontmatter, set_data_value_attr, copy_to_clipboard} from "$scripts/utilities.js"
    import { fm_name, fm_base, fm_current, fm_json } from '$scripts/state.js';

    export let label
    export let value 

    let current_value = ''
        
    const id = normalize(label) 

    if (value.toLowerCase()== "*today") {
        value = format_date(new Date())
        current_value = value
    }
        
    async function keyup_event(e) {
        current_value = e.currentTarget.value  
        //console.log(current_value) 

        set_data_value_attr(id, e.currentTarget.value)
        $fm_current = refresh_frontmatter(id, $fm_base, $fm_json) 
    }
</script>

<div class="form-field">
    <label for={normalize(label)}>{label}</label>
    <input data-is-field type="datetime-local" 
        on:keyup={keyup_event}
        on:blur={keyup_event}
        name={normalize(label)} 
        data_value={current_value}
        id={normalize(label)} 
        placeholder="Date added"
        value={value} />
    <!-- <input data-is-field type="time" 
        on:keyup={keyup_event}
        on:blur={keyup_event}
        name={normalize(label)} 
        data_value={current_value}
        id={normalize(label)} 
        placeholder="Time added"
        value={value} /> -->

</div>