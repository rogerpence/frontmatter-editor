<script>
    import {normalize} from "$scripts/utilities.js"

    export let label
    export let value 
    export let caption 



</script>

<div class="form-field">
    <label data-title="{caption}" 
           title="{caption}" 
           for={normalize(label)}>{label}</label>

    <textarea data-is-field 
        required
        rows="6" 
        name={normalize(label)} 
        id={normalize(label)} 
        placeholder="{caption}">{value}</textarea>
    <!-- <p class="counter"><span id="description-char-count">Character count 0</span></p> -->
</div>