<script>
    import {formatDate, normalize} from "$scripts/utilities.js"

    export let label
    export let value 
    
    if (value.toLowerCase()== "*today") {
         value = formatDate(new Date())
    }
</script>

<div class="form-field">
    <label for={normalize(label)}>{label}</label>
    <input data-is-field type="text" 
        name={normalize(label)} 
        id={normalize(label)} 
        placeholder="Date added"
        value={value} />
</div>