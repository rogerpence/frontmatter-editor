<script>
    // @ts-nocheck 

    import {normalize, replace_token_value, get_initial_frontmatter, refresh_frontmatter, set_data_value_attr, copy_to_clipboard} from "$scripts/utilities.js"
    import { fm_base, fm_current, fm_json } from '$scripts/state.js';

    export let label    
    export let tags
    export let show_info

    const id = normalize(label)
    const show_values_id = `${id}_list`
    const NO_TAGS_SELECTED = 'No tags selected'

    let tags_selected_list = NO_TAGS_SELECTED

    function get_frontmatter_tag_list(tags_array) {
        const tag_elements = tags_array.map(tag => `'${tag}'`)
        return `[${tag_elements.join(', ')}]`
    }
    
    async function show_values(e) 
    {
        let frontmatter_tags_list
        const selectedTags = document.querySelectorAll(`#${id} option:checked`);
        const tags_selected = Array.from(selectedTags).map((el) => el.value);
        if (tags_selected.length == 0) {            
            tags_selected_list = NO_TAGS_SELECTED
            frontmatter_tags_list = '[]'
        }
        else {
            tags_selected_list = tags_selected 
            frontmatter_tags_list = get_frontmatter_tag_list(tags_selected)
        }            

        replace_token_value($fm_json, label, frontmatter_tags_list)
        $fm_current = get_initial_frontmatter($fm_json)
    }

</script>                

<div class="form-field">
<label for={normalize(label)}>{label}</label>
    <select data-is-field
        name={normalize(label)} 
        id={normalize(label)} 
        data_value
        multiple size="5">        
        {#each tags as tag}
        <option on:mouseup={show_values}       
                on:blur={show_values}  
                class="list_option_element" 
                value={tag.name}>{tag.name}                
        </option>
        {/each}
    </select>
    {#if show_info}
        <div id={show_values_id} class="list_values">{tags_selected_list.toString().replaceAll(',', ' ')}</div>
    {/if}
</div>    