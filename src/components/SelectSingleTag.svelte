<script>
    // @ts-nocheck 

    import {onMount} from 'svelte'

    import {normalize, refresh_frontmatter, set_data_value_attr, copy_to_clipboard} from "$scripts/utilities.js"
    import { fm_name, fm_base, fm_current, fm_json } from '$scripts/state.js';
    import {tags_list} from "$data/tag_object";

    export let label    
    export let value 
    // export let caption 
    
    const tags = value.split('|')

    const id = normalize(label)
    const show_values_id = `${id}_list`
   
    async function show_values(e) 
    {
        const selected = document.querySelector(`#${id}`);
        let selected_value = selected.options[selected.selectedIndex].text
        set_data_value_attr(id, selected_value)
        $fm_current = refresh_frontmatter(id, $fm_base, $fm_json) 
    }

</script>                

<div class="form-field">
<label for={normalize(label)}>Tags</label>
    <select data-is-field
        name={normalize(label)} 
        id={normalize(label)} 
        data_value
        size="1">        
        {#each tags as tag}
        <option on:mouseup={show_values}       
                on:blur={show_values}  
                class="list_option_element" 
                value={tag.trim()}>{tag.trim()}                
        </option>
        {/each}
    </select>
</div>    