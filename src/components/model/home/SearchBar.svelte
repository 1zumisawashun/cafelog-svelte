<script lang="ts">
import { querySearch } from '../../../middleware/algoliaClient';
let query: string = '';

const handleInput = async (e: Event) => {
  let target = e.target as HTMLInputElement;
  console.log(target.value);
  const result = await querySearch(target.value);
  console.log(result, 'result of algolia');
};
</script>

<div class="form-field">
  <label class="label" for="query">Stop looking for a shop — find it.</label>
  <input
    class="input"
    type="text"
    id="query"
    placeholder="shopname or station ..."
    bind:value="{query}"
    on:input="{handleInput}" />
</div>
