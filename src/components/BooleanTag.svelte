<script>
    // @ts-nocheck 

    import {normalize, set_frontmatter} from "$scripts/utilities.js"

    export let label
    export let value 

    const id = normalize(label) 

    const checked = value ? "checked" : ""
    let current_value = value.toString()

    function change_event(e) {
        current_value = e.currentTarget.checked.toString()
        const element = document.querySelector(`#${id}`)
        element.setAttribute('data_value', current_value) 
        set_frontmatter()            
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