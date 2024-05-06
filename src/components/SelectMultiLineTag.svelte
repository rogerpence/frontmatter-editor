<script>
    // @ts-nocheck 
    import {normalize} from "$scripts/utilities.js"
    export let label
    export let value 
    export let caption 
    export let show_info

    import {tags_list} from "$data/tag_object";
    import {set_frontmatter} from "$scripts/utilities.js"

    const id = normalize(label)
    const show_values_id = `${id}_list`
    const NO_TAGS_SELECTED = 'No tags selected'

    let tags_selected_list = NO_TAGS_SELECTED

    function get_frontmatter_tag_list(tags_array) {
        const tag_elements = tags_array.map(tag => `'${tag}'`)
        return `[${tag_elements.join(', ')}]`
    }
    
    function show_values() 
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
        const element = document.querySelector(`#${id}`)
        element.setAttribute('data_value', frontmatter_tags_list) 
        
        set_frontmatter()            
    }

</script>                

<div class="form-field">
<label for={normalize(label)}>Tags</label>
    <select data-is-field
        name={normalize(label)} 
        id={normalize(label)} 
        data_value
        multiple size="5">        
        {#each tags_list as tag}
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