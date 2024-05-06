<script>
// @ts-nocheck 

import { onMount } from 'svelte'
import {set_frontmatter} from "$scripts/utilities.js"

let frontmatter = ""

onMount(() => {
    frontmatter = set_frontmatter()
})

</script>

<pre>
    {frontmatter}
</pre>