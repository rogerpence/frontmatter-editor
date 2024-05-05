<script>
    // @ts-nocheck 
    
    import { onMount} from 'svelte';
    import {normalize} from "$scripts/utilities.js"
    export let label
    export let value 

    const id = normalize(label) 
    const counter_id = id + '_counter'

    onMount(() => {
        const input_field = document.querySelector(`#${id}`)
        const counter_element = document.querySelector(`#${counter_id}`)
    
        input_field.addEventListener("keyup", (e) => {
            const len = e.currentTarget.value.length.toString();

        counter_element.innerHTML = `Character count ${len}`;
  });          
    });    

</script>

<div class="form-field">
    <label for={normalize(label)}>{label}</label>
    <input data-is-field required 
    type="text" 
    name={normalize(label)} 
    id={normalize(label)} 
    placeholder=""/>
    <p class="counter"><span id={counter_id}>Character count 0</span></p>    
</div>
