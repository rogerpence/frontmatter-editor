<script>
    // @ts-nocheck 

    import {onMount} from 'svelte'

    import {normalize, refresh_frontmatter, set_data_value_attr, copy_to_clipboard} from "$scripts/utilities.js"
    import { fm_name, fm_base, fm_current, fm_json } from '$scripts/state.js';
    import {tags_list} from "$data/tag_object";

    export let label    
    // export let value 
    // export let doc_name
    export let show_info

    const tags = tags_list?.[$fm_name]['tags']
    
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

        set_data_value_attr(id, frontmatter_tags_list)
        $fm_current = refresh_frontmatter(id, $fm_base, $fm_json) 
        //await copy_to_clipboard($fm_current);
    }

</script>                

<div class="form-field">
<label for={normalize(label)}>Tags</label>
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