<script>
    import {normalize} from "$scripts/utilities.js"
    export let label
    export let value 
    export let caption 

    import {tags_list} from "$data/tag_object";

</script>                

<div class="form-field">
<label for={normalize(label)}>Tags</label>
    <select data-is-field
        name={normalize(label)} 
        id={normalize(label)} 
        multiple size="5">        
        {#each tags_list as tag}
        <option value={tag.name}>{tag.name}</option>
        {/each}
    </select>
    <p class="counter"><span id="tags-list-display"></span></p>
</div>    