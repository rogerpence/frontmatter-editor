<script>
    // @ts-nocheck 

    import {formatDate, normalize, set_frontmatter} from "$scripts/utilities.js"

    export let label
    export let value 
    
    let current_value = ''
        
    const id = normalize(label) 

    if (value.toLowerCase()== "*today") {
        value = formatDate(new Date())
        current_value = value
    }
        
    function keyup_event(e) {
        current_value = e.currentTarget.value     
        const element = document.querySelector(`#${id}`)
        element.setAttribute('data_value', current_value) 
        set_frontmatter()            
    }

</script>

<div class="form-field">
    <label for={normalize(label)}>{label}</label>
    <input data-is-field type="text" 
        on:keyup={keyup_event}
        on:blur={keyup_event}
        name={normalize(label)} 
        data_value={current_value}
        id={normalize(label)} 
        placeholder="Date added"
        value={value} />
</div>