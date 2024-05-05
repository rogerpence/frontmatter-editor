<script>
    import {normalize} from "$scripts/utilities.js"

    export let label
    export let value 

    const checked = value ? "checked" : ""
</script>

<div class="form-field">
    <label for={normalize(label)}>{label}</label>
    <input data-is-field 
           type="checkbox" 
           checked={checked} 
           name={normalize(label)} 
           id={normalize(label)} />
</div>