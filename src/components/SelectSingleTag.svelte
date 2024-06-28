<script>
    // @ts-nocheck 

    import {onMount} from 'svelte'

    import {convert_to_field_name, replace_token_value, get_frontmatter_as_string,  set_data_value_attr, copy_to_clipboard} from "$scripts/utilities.js"
    import { fm_current, frontmatter_as_json_object } from '$scripts/state.js';
    import {tags_list} from "$data/tag_object";

    export let label    
    export let value 
        
    // value is a string with the format: tag1|tag2|tag3
    // add error checking if the value is not in the correct format.
    const tags = value.split('|')
    replace_token_value($frontmatter_as_json_object, label, tags[0])
    $fm_current = get_frontmatter_as_string($frontmatter_as_json_object)           

    const id = convert_to_field_name(label)
    const show_values_id = `${id}_list`
   
    function show_values(e) 
    {
        const selected = document.querySelector(`#${id}`);
        let selected_value = selected.options[selected.selectedIndex].text
        set_data_value_attr(id, selected_value)

        replace_token_value($frontmatter_as_json_object, label, selected_value)
        $fm_current = get_frontmatter_as_string($frontmatter_as_json_object)                
    }
</script>                

<div class="form-field">
<label for={convert_to_field_name(label)}>{label}</label>
    <select data-is-field
        name={convert_to_field_name(label)} 
        id={convert_to_field_name(label)} 
        data_value
        on:change={show_values}       
        size="1">        
        {#each tags as tag, index}
            <option class="list_option_element" 
                    value={tag.trim()}>{tag.trim()}                
            </option>
        {/each}
    </select>
</div>    