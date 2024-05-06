<script>
    // @ts-nocheck 
    import { frontmatter, frontmatter_name } from '$scripts/state.js';

    import {normalize, set_frontmatter} from "$scripts/utilities.js"

    export let label
    export let value 
    
    let frontmatter_def_name = $frontmatter_name

    const id = normalize(label) 

    const checked = value ? "checked" : ""
    let current_value = value.toString()

    function change_event(e) {
        current_value = e.currentTarget.checked.toString()
        const element = document.querySelector(`#${id}`)
        element.setAttribute('data_value', current_value) 
        set_frontmatter(frontmatter_def_name)            
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