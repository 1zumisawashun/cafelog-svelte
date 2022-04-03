<script lang="ts">
import { onMount } from 'svelte';

import { querySearch } from '../../middleware/algoliaClient';
onMount(async () => {
  const result = await querySearch('渋谷');
  console.log(result, 'result of algolia');
});
</script>

<div>serach bar</div>
